// BackgroundProcessor: darkens neutral document backgrounds adaptively
export class BackgroundProcessor {
  static isNeutralBackground(r, g, b, threshold = 225) {
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const chroma = max - min;
    return min >= threshold && chroma < 18;
  }

  static applyThemeBackground(r, g, b, themeBg, strength = 100) {
    const factor = strength / 100;
    return [
      Math.round(r * (1 - factor) + themeBg.r * factor),
      Math.round(g * (1 - factor) + themeBg.g * factor),
      Math.round(b * (1 - factor) + themeBg.b * factor)
    ];
  }
}
