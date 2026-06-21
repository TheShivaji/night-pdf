// Theme Engine for processing PDF page canvas pixels

export const THEME_PRESETS = {
  normal: {
    id: 'normal',
    name: 'Normal (Original)',
    bg: { r: 255, g: 255, b: 255 },
    fg: { r: 0, g: 0, b: 0 },
    bgHex: '#ffffff',
    fgHex: '#000000',
    description: 'Original document colors'
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    bg: { r: 26, g: 26, b: 26 },
    fg: { r: 243, g: 244, b: 246 },
    bgHex: '#1a1a1a',
    fgHex: '#f3f4f6',
    description: 'Soothing dark gray background'
  },
  amoled: {
    id: 'amoled',
    name: 'Amoled Black',
    bg: { r: 0, g: 0, b: 0 },
    fg: { r: 255, g: 255, b: 255 },
    bgHex: '#000000',
    fgHex: '#ffffff',
    description: 'Pure black for OLED screens'
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia Reader',
    bg: { r: 244, g: 236, b: 216 },
    fg: { r: 91, g: 70, b: 54 },
    bgHex: '#f4ecd8',
    fgHex: '#5b4636',
    description: 'Warm, paper-like sepia tone'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Blue',
    bg: { r: 15, g: 23, b: 42 },
    fg: { r: 226, g: 232, b: 240 },
    bgHex: '#0f172a',
    fgHex: '#e2e8f0',
    description: 'Deep midnight blue hue'
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula Purple',
    bg: { r: 40, g: 42, b: 54 },
    fg: { r: 248, g: 248, b: 242 },
    bgHex: '#282a36',
    fgHex: '#f8f8f2',
    description: 'Popular purple hacker theme'
  },
  forest: {
    id: 'forest',
    name: 'Forest Green',
    bg: { r: 20, g: 35, b: 25 },
    fg: { r: 209, g: 250, b: 229 },
    bgHex: '#142319',
    fgHex: '#d1fae5',
    description: 'Nature-inspired dark green'
  },
  cool: {
    id: 'cool',
    name: 'Cool Slate',
    bg: { r: 52, g: 53, b: 65 },
    fg: { r: 243, g: 244, b: 246 },
    bgHex: '#343541',
    fgHex: '#f3f4f6',
    description: 'Modern slate-gray theme'
  }
};

// RGB to HSL conversion helper
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
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

// HSL to RGB conversion helper
function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
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

/**
 * Apply selected theme to canvas ImageData in-place.
 * @param {ImageData} imageData - Canvas image data to process
 * @param {string} themeId - Theme preset key
 * @param {object} options - Processing options { mode: 'smart' | 'duotone' | 'original', brightness: number, contrast: number }
 */
export function applyThemeToImageData(imageData, themeId, options = {}) {
  const data = imageData.data;
  const len = data.length;
  const mode = options.mode || 'smart'; // 'smart', 'duotone', or 'original'
  const theme = themeId === 'custom' ? options.customTheme : THEME_PRESETS[themeId];

  // Adjustments variables
  const brightness = options.brightness !== undefined ? parseInt(options.brightness) : 0;
  const contrast = options.contrast !== undefined ? parseInt(options.contrast) : 0;
  const contrastFactor = 1 + contrast / 100;

  const bg = theme ? theme.bg : { r: 255, g: 255, b: 255 };
  const fg = theme ? theme.fg : { r: 0, g: 0, b: 0 };
  const isDarkTheme = theme ? ((0.299 * bg.r + 0.587 * bg.g + 0.114 * bg.b) < 128) : false;

  for (let i = 0; i < len; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    const a = data[i + 3];

    // Skip fully transparent pixels
    if (a === 0) continue;

    let rNew = r;
    let gNew = g;
    let bNew = b;

    // Apply Theme transformations only if not normal theme
    if (themeId && themeId !== 'normal' && theme) {
      // Calculate luminance (0 to 255)
      const L = 0.299 * r + 0.587 * g + 0.114 * b;

      // Calculate chroma (color saturation measure)
      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const chroma = maxVal - minVal;

      if (mode === 'original' && chroma >= 25) {
        // Keep original R, G, B colors completely untouched (No-Negative)
        rNew = r;
        gNew = g;
        bNew = b;
      } else if (mode === 'duotone' || chroma < 25) {
        // Grayscale interpolation for backgrounds & texts (or in duotone mode)
        const factor = L / 255;
        rNew = fg.r * (1 - factor) + bg.r * factor;
        gNew = fg.g * (1 - factor) + bg.g * factor;
        bNew = fg.b * (1 - factor) + bg.b * factor;
      } else {
        // Smart mode: saturated color preservation with lightness inversion
        const [h, s, l] = rgbToHsl(r, g, b);
        let lNew = isDarkTheme ? Math.max(0.45, 1.0 - l) : Math.min(0.9, l);
        const [rTemp, gTemp, bTemp] = hslToRgb(h, s, lNew);

        // Blend slightly with theme foreground for integration
        const blend = 0.15;
        rNew = rTemp * (1 - blend) + fg.r * blend;
        gNew = gTemp * (1 - blend) + fg.g * blend;
        bNew = bTemp * (1 - blend) + fg.b * blend;
      }
    }

    // Apply Contrast Adjustment
    if (contrast !== 0) {
      rNew = (rNew - 128) * contrastFactor + 128;
      gNew = (gNew - 128) * contrastFactor + 128;
      bNew = (bNew - 128) * contrastFactor + 128;
    }

    // Apply Brightness Adjustment
    if (brightness !== 0) {
      rNew += brightness;
      gNew += brightness;
      bNew += brightness;
    }

    // Clamp values to [0, 255] and write back in-place
    data[i] = Math.max(0, Math.min(255, Math.round(rNew)));
    data[i + 1] = Math.max(0, Math.min(255, Math.round(gNew)));
    data[i + 2] = Math.max(0, Math.min(255, Math.round(bNew)));
  }

  return imageData;
}
