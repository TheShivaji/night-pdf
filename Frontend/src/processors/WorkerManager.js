// WorkerManager: pools Web Workers V2 Enterprise Engine (v3 cache invalidate)
import { applyThemeToImageData } from '../utils/themeEngine';

class WorkerPool {
  constructor(workerPath, poolSize = Math.min(navigator.hardwareConcurrency || 2, 4)) {
    this.workerPath = workerPath;
    this.poolSize = poolSize;
    this.workers = [];
    this.queue = [];
    this.init();
  }

  init() {
    if (typeof window === 'undefined' || !window.Worker) return;
    try {
      for (let i = 0; i < this.poolSize; i++) {
        const worker = new Worker(new URL('../workers/smartThemeWorker.js', import.meta.url), { type: 'module' });
        this.workers.push({ worker, busy: false });
      }
    } catch (e) {
      console.warn('Web Workers unavailable or blocked. Using synchronous fallback.', e);
      this.workers = [];
    }
  }

  async processCanvas(imageData, theme, options = {}) {
    if (this.workers.length === 0) {
      // Synchronous fallback on main thread
      return applyThemeToImageData(imageData, theme.id, {
        mode: options.mode || 'smart',
        brightness: options.brightness || 0,
        contrast: options.contrast || 0,
        customTheme: theme
      });
    }

    // Find available worker
    let freeWorker = this.workers.find(w => !w.busy);
    if (!freeWorker) {
      // Wait for queue
      await new Promise(resolve => this.queue.push(resolve));
      freeWorker = this.workers.find(w => !w.busy) || this.workers[0];
    }

    freeWorker.busy = true;
    const worker = freeWorker.worker;

    return new Promise((resolve, reject) => {
      const handleMessage = (e) => {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        freeWorker.busy = false;

        // Process next in queue
        if (this.queue.length > 0) {
          const next = this.queue.shift();
          next();
        }

        const newArr = new Uint8ClampedArray(e.data.buffer);
        const newImgData = new ImageData(newArr, imageData.width, imageData.height);
        resolve(newImgData);
      };

      const handleError = (err) => {
        worker.removeEventListener('message', handleMessage);
        worker.removeEventListener('error', handleError);
        freeWorker.busy = false;
        if (this.queue.length > 0) this.queue.shift()();
        reject(err);
      };

      worker.addEventListener('message', handleMessage);
      worker.addEventListener('error', handleError);

      // Post buffer via transferable arraybuffer
      worker.postMessage({
        buffer: imageData.data.buffer,
        width: imageData.width,
        height: imageData.height,
        theme: theme,
        mode: options.mode || 'smart',
        strength: options.strength !== undefined ? options.strength : 100,
        threshold: options.threshold !== undefined ? options.threshold : 50,
        brightness: options.brightness || 0,
        contrast: options.contrast || 0
      }, [imageData.data.buffer]);
    });
  }
}

export const globalWorkerPool = new WorkerPool('../workers/smartThemeWorker.js');
