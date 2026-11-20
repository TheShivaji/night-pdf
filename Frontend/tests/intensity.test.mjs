import test from 'node:test';
import assert from 'node:assert/strict';
import { processSmartCanvas } from '../src/utils/smartPreservationEngine.js';
import { THEME_PRESETS } from '../src/processors/ThemeProcessor.js';

const input = [255,255,255,255, 0,0,0,255, 100,100,100,255, 10,60,200,255, 1,2,3,0];
async function pixels(theme, options) {
  const image = { width: 5, height: 1, data: Uint8ClampedArray.from(input) };
  return Array.from((await processSmartCanvas(image, THEME_PRESETS[theme], options)).data);
}

for (const theme of ['dark', 'amoled', 'sepia', 'normal']) {
  test(`${theme} intensity blends paper, text, gray and colored pixels at every tested setting`, async () => {
    const full = await pixels(theme, { strength: 100 });
    if (theme === 'normal') assert.deepEqual(full, input);
    else {
      const { bg, fg } = THEME_PRESETS[theme];
      assert.deepEqual(full.slice(0, 8), [bg.r,bg.g,bg.b,255,fg.r,fg.g,fg.b,255]);
    }
    for (const strength of [0, 25, 50, 75, 100]) {
      const actual = await pixels(theme, { strength });
      assert.deepEqual(actual, input.map((value, i) => Math.round(value + (full[i] - value) * strength / 100)));
    }
  });
}
test('zero strength preserves input even with contrast and brightness adjustments', async () => {
  assert.deepEqual(await pixels('dark', { strength: 0, contrast: 90, brightness: -30 }), input);
});
