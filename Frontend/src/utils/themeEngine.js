// Theme Engine for processing PDF page canvas pixels
// Synchronous main thread fallback delegating to unified V2 Engine

import { THEME_PRESETS as ENTERPRISE_PRESETS } from '../processors/ThemeProcessor';
import { processSmartCanvas } from './smartPreservationEngine';

export const THEME_PRESETS = ENTERPRISE_PRESETS;

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

export function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function applyThemeToImageData(imageData, themeId, options = {}) {
  const mode = options.mode || 'smart';
  const theme = themeId === 'custom' ? options.customTheme : THEME_PRESETS[themeId];

  if (!theme || themeId === 'normal' || mode === 'original') {
    return imageData;
  }

  // Delegate directly to unified V2 CV engine (synchronous execution on main thread)
  // Note: processSmartCanvas returns a promise, but in fallback mode we execute synchronous buffer math if workers fail
  const data = imageData.data;
  const len = data.length;
  const bg = theme.bg || { r: 0, g: 0, b: 0 };
  const fg = theme.fg || { r: 255, g: 255, b: 255 };
  const factorStr = (options.strength !== undefined ? options.strength : 100) / 100;

  for (let i = 0; i < len; i += 4) {
    if (data[i + 3] === 0) continue;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);

    let rNew = r, gNew = g, bNew = b;

    if (lum > 210 && chroma < 25) {
      rNew = r * (1 - factorStr) + bg.r * factorStr;
      gNew = g * (1 - factorStr) + bg.g * factorStr;
      bNew = b * (1 - factorStr) + bg.b * factorStr;
    } else if (chroma > 85) {
      const [h, s] = rgbToHsl(r, g, b);
      const [tR, tG, tB] = hslToRgb(h, Math.min(1, s * 1.15), 0.78);
      rNew = tR * factorStr + r * (1 - factorStr);
      gNew = tG * factorStr + g * (1 - factorStr);
      bNew = tB * factorStr + b * (1 - factorStr);
    } else {
      const norm = Math.min(1, lum / 210);
      rNew = fg.r * (1 - norm) + bg.r * norm;
      gNew = fg.g * (1 - norm) + bg.g * norm;
      bNew = fg.b * (1 - norm) + bg.b * norm;
    }

    data[i] = Math.max(0, Math.min(255, Math.round(rNew)));
    data[i + 1] = Math.max(0, Math.min(255, Math.round(gNew)));
    data[i + 2] = Math.max(0, Math.min(255, Math.round(bNew)));
  }

  return imageData;
}
