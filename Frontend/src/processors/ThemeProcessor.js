// Reader palettes
export const THEME_PRESETS = {
  normal: {
    id: 'normal',
    name: 'Normal (Original)',
    bg: { r: 255, g: 255, b: 255 },
    fg: { r: 0, g: 0, b: 0 },

    bgHex: '#ffffff',
    fgHex: '#000000',





  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    bg: { r: 26, g: 26, b: 26 },
    fg: { r: 243, g: 244, b: 246 },

    bgHex: '#1a1a1a',
    fgHex: '#f3f4f6',





  },
  amoled: {
    id: 'amoled',
    name: 'Amoled Black',
    bg: { r: 0, g: 0, b: 0 },
    fg: { r: 255, g: 255, b: 255 },

    bgHex: '#000000',
    fgHex: '#ffffff',





  },
  sepia: {
    id: 'sepia',
    name: 'Sepia Reader',
    bg: { r: 244, g: 236, b: 216 },
    fg: { r: 91, g: 70, b: 54 },

    bgHex: '#f4ecd8',
    fgHex: '#5b4636',





  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Blue',
    bg: { r: 15, g: 23, b: 42 },
    fg: { r: 226, g: 232, b: 240 },

    bgHex: '#0f172a',
    fgHex: '#e2e8f0',





  },
  dracula: {
    id: 'dracula',
    name: 'Dracula Purple',
    bg: { r: 40, g: 42, b: 54 },
    fg: { r: 248, g: 248, b: 242 },

    bgHex: '#282a36',
    fgHex: '#f8f8f2',





  },
  forest: {
    id: 'forest',
    name: 'Forest Green',
    bg: { r: 20, g: 35, b: 25 },
    fg: { r: 209, g: 250, b: 229 },

    bgHex: '#142319',
    fgHex: '#d1fae5',





  },
  cool: {
    id: 'cool',
    name: 'Cool Slate',
    bg: { r: 52, g: 53, b: 65 },
    fg: { r: 243, g: 244, b: 246 },

    bgHex: '#343541',
    fgHex: '#f3f4f6',






  }
};

export class ThemeProcessor {
  static getPreset(themeId, customTheme) {
    if (themeId === 'custom' && customTheme) {
      return {
        id: 'custom',
        name: 'Custom Theme',
        bg: customTheme.bg || { r: 26, g: 26, b: 26 },
        fg: customTheme.fg || { r: 243, g: 244, b: 246 },

        bgHex: customTheme.bgHex || '#1a1a1a',
        fgHex: customTheme.fgHex || '#f3f4f6',






      };
    }
    return THEME_PRESETS[themeId] || THEME_PRESETS.dark;
  }

}
