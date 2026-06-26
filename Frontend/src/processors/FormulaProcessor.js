// FormulaProcessor: preserves crisp mathematical notation, matrices & Greek notation
export class FormulaProcessor {
  static protectMathFormula(r, g, b, L, themeFg) {
    if (L < 100) {
      // Crisp high contrast math symbol
      return [themeFg.r, themeFg.g, themeFg.b];
    }
    return [r, g, b];
  }
}
