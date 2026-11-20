import { ThemeProcessor } from '../processors/ThemeProcessor.js';
import { globalWorkerPool } from '../processors/WorkerManager.js';

export { THEME_PRESETS } from '../processors/ThemeProcessor.js';

// Both callers supply a PDF.js raster at their target resolution. Different
// resolutions can change antialiasing and the samples used for paper detection.
export async function applyThemeToCanvas(canvas, themeId, options) {
  if (themeId === 'normal' || options.mode === 'original') return;
  const theme = ThemeProcessor.getPreset(themeId, options.customTheme);
  const ctx = canvas.getContext('2d');
  const result = await globalWorkerPool.processCanvas(canvas, theme, options);
  options.signal?.throwIfAborted();
  ctx.putImageData(result, 0, 0);
}
