import { processSmartCanvas } from '../utils/smartPreservationEngine.js';

class WorkerPool {
  constructor() {
    this.workers = [];
    this.queue = [];
    this.started = false;
  }

  start() {
    if (this.started) return;
    this.started = true;
    if (typeof window === 'undefined' || !window.Worker) return;
    const size = Math.min(navigator.hardwareConcurrency || 2, 2);
    try {
      for (let i = 0; i < size; i++) {
        const worker = new Worker(new URL('../workers/smartThemeWorker.js', import.meta.url), { type: 'module' });
        const slot = { worker, job: null };
        worker.onmessage = ({ data }) => {
          const job = slot.job;
          if (!job) return;
          try {
            if (data.error) throw new Error(data.error);
            job.resolve(new ImageData(new Uint8ClampedArray(data.buffer), job.width, job.height));
          } catch (error) {
            job.reject(error);
          } finally {
            slot.job = null;
            this.queue.shift()?.();
          }
        };
        worker.onerror = worker.onmessageerror = event => {
          worker.terminate();
          this.workers = this.workers.filter(other => other !== slot);
          slot.job?.reject(new Error(event.message || 'The page color worker stopped.'));
          slot.job = null;
          // If the final worker died, every waiting caller must reach fallback.
          this.queue.splice(0).forEach(wake => wake());
        };
        this.workers.push(slot);
      }
    } catch (error) {
      console.warn('Could not start all page color workers.', error);
    }
  }

  async processCanvas(canvas, theme, options) {
    this.start();
    const { signal } = options;
    signal?.throwIfAborted();
    const settings = {
      mode: options.mode ?? 'smart',
      strength: options.strength ?? 100,
      brightness: options.brightness ?? 0,
      contrast: options.contrast ?? 0
    };
    let slot;
    while (this.workers.length && !(slot = this.workers.find(entry => !entry.job))) {
      await new Promise((resolve, reject) => {
        const wake = () => {
          signal?.removeEventListener('abort', abort);
          resolve();
        };
        const abort = () => {
          this.queue = this.queue.filter(item => item !== wake);
          reject(signal.reason);
        };
        this.queue.push(wake);
        signal?.addEventListener('abort', abort, { once: true });
      });
      signal?.throwIfAborted();
    }
    const image = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    if (!slot) return processSmartCanvas(image, theme, settings);

    return new Promise((resolve, reject) => {
      const { width, height } = image;
      slot.job = { resolve, reject, width, height };
      try {
        const buffer = image.data.buffer;
        slot.worker.postMessage({ buffer, width, height, theme, settings }, [buffer]);
      } catch (error) {
        slot.job = null;
        this.queue.shift()?.();
        reject(error);
      }
    });
  }
}

export const globalWorkerPool = new WorkerPool();
