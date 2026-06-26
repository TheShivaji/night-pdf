// Enterprise Theme Preset Architecture
export const THEME_PRESETS = {
  normal: {
    id: 'normal',
    name: 'Normal (Original)',
    bg: { r: 255, g: 255, b: 255 },
    fg: { r: 0, g: 0, b: 0 },
    accent: { r: 59, g: 130, b: 246 },
    bgHex: '#ffffff',
    fgHex: '#000000',
    description: 'Original document colors',
    strength: 0,
    imagePreservation: 'original',
    formulaStrategy: 'normal',
    tableStrategy: 'normal',
    defaultThreshold: 50
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    bg: { r: 26, g: 26, b: 26 },
    fg: { r: 243, g: 244, b: 246 },
    accent: { r: 139, g: 92, b: 246 },
    bgHex: '#1a1a1a',
    fgHex: '#f3f4f6',
    description: 'Soothing dark gray background',
    strength: 100,
    imagePreservation: 'smart',
    formulaStrategy: 'high-contrast',
    tableStrategy: 'protect-borders',
    defaultThreshold: 50
  },
  amoled: {
    id: 'amoled',
    name: 'Amoled Black',
    bg: { r: 0, g: 0, b: 0 },
    fg: { r: 255, g: 255, b: 255 },
    accent: { r: 168, g: 85, b: 247 },
    bgHex: '#000000',
    fgHex: '#ffffff',
    description: 'Pure black for OLED screens',
    strength: 100,
    imagePreservation: 'smart',
    formulaStrategy: 'high-contrast',
    tableStrategy: 'protect-borders',
    defaultThreshold: 55
  },
  sepia: {
    id: 'sepia',
    name: 'Sepia Reader',
    bg: { r: 244, g: 236, b: 216 },
    fg: { r: 91, g: 70, b: 54 },
    accent: { r: 180, g: 83, b: 9 },
    bgHex: '#f4ecd8',
    fgHex: '#5b4636',
    description: 'Warm, paper-like sepia tone',
    strength: 85,
    imagePreservation: 'warm-blend',
    formulaStrategy: 'normal',
    tableStrategy: 'warm-borders',
    defaultThreshold: 45
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Blue',
    bg: { r: 15, g: 23, b: 42 },
    fg: { r: 226, g: 232, b: 240 },
    accent: { r: 56, g: 189, b: 248 },
    bgHex: '#0f172a',
    fgHex: '#e2e8f0',
    description: 'Deep midnight blue hue',
    strength: 100,
    imagePreservation: 'smart',
    formulaStrategy: 'high-contrast',
    tableStrategy: 'protect-borders',
    defaultThreshold: 50
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula Purple',
    bg: { r: 40, g: 42, b: 54 },
    fg: { r: 248, g: 248, b: 242 },
    accent: { r: 255, g: 121, b: 198 },
    bgHex: '#282a36',
    fgHex: '#f8f8f2',
    description: 'Popular purple hacker theme',
    strength: 100,
    imagePreservation: 'smart',
    formulaStrategy: 'vibrant',
    tableStrategy: 'protect-borders',
    defaultThreshold: 50
  },
  forest: {
    id: 'forest',
    name: 'Forest Green',
    bg: { r: 20, g: 35, b: 25 },
    fg: { r: 209, g: 250, b: 229 },
    accent: { r: 52, g: 211, b: 153 },
    bgHex: '#142319',
    fgHex: '#d1fae5',
    description: 'Nature-inspired dark green',
    strength: 100,
    imagePreservation: 'smart',
    formulaStrategy: 'high-contrast',
    tableStrategy: 'protect-borders',
    defaultThreshold: 50
  },
  cool: {
    id: 'cool',
    name: 'Cool Slate',
    bg: { r: 52, g: 53, b: 65 },
    fg: { r: 243, g: 244, b: 246 },
    accent: { r: 96, g: 165, b: 250 },
    bgHex: '#343541',
    fgHex: '#f3f4f6',
    description: 'Modern slate-gray theme',
    strength: 100,
    imagePreservation: 'smart',
    formulaStrategy: 'high-contrast',
    tableStrategy: 'protect-borders',
    defaultThreshold: 50
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
        accent: { r: 139, g: 92, b: 246 },
        bgHex: customTheme.bgHex || '#1a1a1a',
        fgHex: customTheme.fgHex || '#f3f4f6',
        description: 'User customized theme',
        strength: 100,
        imagePreservation: 'smart',
        formulaStrategy: 'high-contrast',
        tableStrategy: 'protect-borders',
        defaultThreshold: 50
      };
    }
    return THEME_PRESETS[themeId] || THEME_PRESETS.dark;
  }

  static isDarkTheme(theme) {
    if (!theme || !theme.bg) return true;
    const lum = 0.299 * theme.bg.r + 0.587 * theme.bg.g + 0.114 * theme.bg.b;
    return lum < 128;
  }
}
