// Enterprise Feature Flag Architecture for NightPDF
export const FLAGS = {
  SMART_RENDER_V2: true, // Master toggle for Adaptive Histogram + Sobel CV Engine
  TELEMETRY_HUD: true,   // Development 9-Stage Telemetry HUD
  SSIM_QUALITY_GATES: true // Visual Regression Suite calculations
};

export function isFeatureEnabled(flagName) {
  return Boolean(FLAGS[flagName]);
}
