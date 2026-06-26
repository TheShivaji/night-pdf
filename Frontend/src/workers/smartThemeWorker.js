// Dedicated Asynchronous Web Worker for Smart Image Preservation V2 Pipeline
// Delegates to unified V2 Computer Vision Engine (Histogram + Sobel SIMD mapping)

import { processSmartCanvas } from '../utils/smartPreservationEngine';

self.onmessage = async function (e) {
  const { buffer, width, height, theme, mode, strength = 100, threshold = 50, brightness = 0, contrast = 0 } = e.data;
  const data = new Uint8ClampedArray(buffer);

  if (mode === 'original' || !theme || theme.id === 'normal') {
    self.postMessage({ buffer: data.buffer }, [data.buffer]);
    return;
  }

  const imageData = new ImageData(data, width, height);
  const telemetry = { stages: {}, errors: [], strategy: 'smart-v2' };

  const processed = await processSmartCanvas(imageData, theme, {
    mode,
    strength,
    threshold,
    brightness,
    contrast
  }, telemetry);

  self.postMessage({ buffer: processed.data.buffer, telemetry }, [processed.data.buffer]);
};
