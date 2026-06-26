// TextProcessor: high contrast typography & syntax highlight preservation
export class TextProcessor {
  static isTextGlyph(r, g, b, L) {
    // Isolated dark or saturated pixel against light background
    return L < 140;
  }

  static preserveSyntaxHighlight(h, s, l, themeFg) {
    if (s > 0.22) {
      // Developer code syntax: preserve color saturation and boost lightness on dark theme
      return [h, Math.min(1.0, s * 1.15), Math.max(0.68, l)];
    }
    return null; // Standard text
  }
}
