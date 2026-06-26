// ImageProcessor: preserves embedded raster photographs, UI screenshots & logos
export class ImageProcessor {
  static shouldPreserveRegion(spatialConfidence, chroma, L) {
    // If block confidence indicates photo/screenshot or high saturation
    return spatialConfidence >= 90 || chroma > 28 || L < 45;
  }

  static preserveNaturalAppearance(r, g, b, contrastAdj = 0) {
    // Keep natural RGB lighting untouched (zero negative inversion)
    if (contrastAdj === 0) return [r, g, b];
    const factor = 1 + contrastAdj / 100;
    return [
      Math.max(0, Math.min(255, (r - 128) * factor + 128)),
      Math.max(0, Math.min(255, (g - 128) * factor + 128)),
      Math.max(0, Math.min(255, (b - 128) * factor + 128))
    ];
  }
}
