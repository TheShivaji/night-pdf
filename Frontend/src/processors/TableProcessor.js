// TableProcessor: protects table borders, zebra striping & highlighted cells
export class TableProcessor {
  static preserveTableCell(r, g, b, isBorder, themeBg) {
    if (isBorder) {
      return [100, 116, 139]; // Subtle slate border
    }
    return [r, g, b];
  }
}
