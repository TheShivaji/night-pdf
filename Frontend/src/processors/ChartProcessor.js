// ChartProcessor: protects bar charts, scatter plots & pie charts
export class ChartProcessor {
  static preserveExactColors(r, g, b, h, s, l) {
    // Maintain exact chart hues
    return [r, g, b];
  }
}
