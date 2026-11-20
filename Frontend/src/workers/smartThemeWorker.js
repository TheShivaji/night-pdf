import { processSmartCanvas } from '../utils/smartPreservationEngine.js';

self.onmessage = async ({ data: { buffer, width, height, theme, settings } }) => {
  try {
    const image = new ImageData(new Uint8ClampedArray(buffer), width, height);
    const result = processSmartCanvas(image, theme, settings);
    self.postMessage({ buffer: result.data.buffer }, [result.data.buffer]);
  } catch (error) {
    self.postMessage({ error: error.message || 'Could not process the page colors.' });
  }
};
