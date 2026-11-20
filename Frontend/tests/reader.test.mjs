import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import puppeteer from 'puppeteer';
import { build, preview } from 'vite';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PDFDocument, rgb } from 'pdf-lib';

let server, browser, outDir;
const downloadDirs = new WeakMap();
before(async () => {
  outDir = await mkdtemp(join(tmpdir(), 'nightpdf-test-'));
  const config = { build: { outDir }, logLevel: 'error' };
  await build(config);
  server = await preview({ ...config, preview: { host: '127.0.0.1', port: 0 } });
  browser = await puppeteer.launch({ headless: true });
});
after(async () => {
  await browser?.close();
  await server?.close();
  if (outDir) await rm(outDir, { recursive: true, force: true });
});

async function fixture(color, label, width = 200) {
  const pdf = await PDFDocument.create();
  for (const text of [label, 'Second page']) {
    const page = pdf.addPage([width, 200]);
    page.drawRectangle({ width, height: 200, color });
    page.drawRectangle({ x: 40, y: 30, width: 50, height: 20, color: rgb(0.1, 0.2, 0.9) });
    page.drawText(text, { x: 20, y: 80, size: 18 });
  }
  return Array.from(await pdf.save());
}

async function openReader(t, { disableThemeWorkers = false } = {}) {
  const downloadPath = await mkdtemp(join(tmpdir(), 'nightpdf-download-'));
  const context = await browser.createBrowserContext({ downloadBehavior: { policy: 'allow', downloadPath } });
  const page = await context.newPage();
  downloadDirs.set(page, downloadPath);
  t.after(async () => {
    await context.close();
    await rm(downloadPath, { recursive: true, force: true });
  });
  page.on('pageerror', error => console.error(error));
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && !request.url().startsWith(server.resolvedUrls.local[0])) {
      void request.abort();
    } else {
      void request.continue();
    }
  });
  await page.setViewport({ width: 1100, height: 800 });
  await page.evaluateOnNewDocument(block => {
    window.themeJobs = 0;
    window.Worker = class extends Worker {
      postMessage(message, ...args) {
        if (message.theme) window.themeJobs++;
        return super.postMessage(message, ...args);
      }
      constructor(url, options) {
        if (block && String(url).includes('smartThemeWorker')) throw new Error('Test fallback');
        super(url, options);
      }
    };
  }, disableThemeWorkers);
  await page.goto(server.resolvedUrls.local[0], { waitUntil: 'domcontentloaded' });
  return page;
}

async function upload(page, bytes, name) {
  await page.waitForSelector('input[type=file]');
  await page.$eval('input[type=file]', (input, data, filename) => {
    const transfer = new DataTransfer();
    transfer.items.add(new File([Uint8Array.from(data)], filename, { type: 'application/pdf' }));
    input.files = transfer.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, bytes, name);
}

async function expectPixel(page, expected) {
  await page.waitForFunction(color => {
    const canvas = document.querySelector('canvas.viewer-canvas');
    return canvas && color.every((value, i) =>
      canvas.getContext('2d').getImageData(5, 5, 1, 1).data[i] === value);
  }, { timeout: 10000 }, expected);
}

test('different PDFs at identical render settings display their own pixels and text', async t => {
  const page = await openReader(t);
  await upload(page, await fixture(rgb(1, 1, 1), 'First PDF'), 'first.pdf');
  await expectPixel(page, [26, 26, 26]);
  await page.click('[title="Close PDF"]');
  await upload(page, await fixture(rgb(0, 0, 0), 'Second PDF'), 'second.pdf');
  await expectPixel(page, [243, 244, 246]);
  assert.match(await page.$eval('.canvas-wrapper', el => el.textContent), /Second PDF/);
  await page.click('.toolbar-btn:has(.lucide-chevron-right)');
  await page.waitForFunction(() => document.querySelector('.textLayer')?.textContent.includes('Second page'));
  const selected = await page.$eval('.textLayer', layer => {
    const range = document.createRange();
    range.selectNodeContents(layer);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return selection.toString();
  });
  assert.match(selected, /Second page/);
});

async function setInput(page, selector, value) {
  await page.$eval(selector, (input, next) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(input, next);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, String(value));
}

test('cached pages track brightness, repeated settings and DPR changes', async t => {
  const page = await openReader(t);
  await upload(page, await fixture(rgb(1, 1, 1), 'Settings'), 'settings.pdf');
  await expectPixel(page, [26, 26, 26]);
  await page.waitForFunction(() => document.querySelector('.viewer-canvas')?.width === 360);
  const jobs = await page.evaluate(() => window.themeJobs);
  for (const brightness of [30, 0, 30]) {
    await setInput(page, '.slider-input', brightness);
    await expectPixel(page, Array(3).fill(26 + brightness));
  }
  assert.equal(await page.evaluate(() => window.themeJobs), jobs + 1, 'revisited settings must hit cache');
  const width = await page.$eval('.viewer-canvas', c => c.width);
  await page.setViewport({ width: 1101, height: 800, deviceScaleFactor: 2 });
  await page.waitForFunction(w => document.querySelector('.viewer-canvas')?.width === w * 2, {}, width);
  await expectPixel(page, [56, 56, 56]);
});

async function downloadBytes(page, filename) {
  const path = join(downloadDirs.get(page), filename);
  await page.click('.action-btn');
  // Chrome renames its temporary file to the requested name on completion.
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      return Uint8Array.from(await readFile(path));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await delay(50);
    }
  }
  throw new Error(`Download did not complete: ${filename}`);
}

async function readPixels(page) {
  return Buffer.from(await page.$eval('.viewer-canvas', c => {
    const rgba = c.getContext('2d').getImageData(0, 0, c.width, c.height);
    return Array.from(rgba.data);
  }));
}

test('worker preview, fallback preview and reopened themed download agree at 1x', async t => {
  const input = await fixture(rgb(1, 1, 1), 'Searchable input', 640);
  let workerPixels;
  for (const disableThemeWorkers of [false, true]) {
    const page = await openReader(t, { disableThemeWorkers });
    await upload(page, input, 'parity.pdf');
    await expectPixel(page, [26, 26, 26]);
    await setInput(page, '.slider-input', 18);
    await expectPixel(page, [44, 44, 44]);
    assert.equal(await page.evaluate(() => window.themeJobs > 0), !disableThemeWorkers);
    const previewPixels = await readPixels(page);
    if (workerPixels) assert.ok(workerPixels.equals(previewPixels), 'worker and fallback pixels differ');
    workerPixels = previewPixels;
    assert.deepEqual(await downloadBytes(page, 'parity.pdf'), Uint8Array.from(input));
    await page.click('input[type=checkbox]');
    await page.select('#quality-select', '1');
    const task = getDocument({ data: await downloadBytes(page, 'night-dark-parity.pdf') });
    try {
      const doc = await task.promise;
      assert.equal(doc.numPages, 2);
      const first = await doc.getPage(1);
      const viewport = first.getViewport({ scale: 1 });
      const canvas = createCanvas(viewport.width, viewport.height);
      await first.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      const output = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
      assert.ok(previewPixels.equals(Buffer.from(output.data)), 'reopened page differs from preview');
      assert.equal((await first.getTextContent()).items.length, 0);
    } finally {
      await task.destroy();
    }
  }
});

test('invalid ranges and encoding failures stay visible and allow a corrected download', async t => {
  const page = await openReader(t);
  await upload(page, await fixture(rgb(1,1,1), 'Range'), 'range.pdf');
  await expectPixel(page, [26,26,26]);
  await page.click('input[type=checkbox]');
  await page.click('.toggle-option:last-child');
  for (const range of ['', '1x', '2-1', '1,3', '1,']) {
    await setInput(page, '.text-input', range);
    await page.click('.action-btn');
    await page.waitForFunction(() => document.querySelector('[role=alert]')?.textContent.includes('page range'));
  }
  await setInput(page, '.text-input', '2');
  await page.evaluate(() => {
    const encode = HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob = function (callback) {
      HTMLCanvasElement.prototype.toBlob = encode;
      callback(null);
    };
  });
  await page.click('.action-btn');
  await page.waitForFunction(() => document.querySelector('[role=alert]')?.textContent.includes('encode page 2'));
  const result = await PDFDocument.load(await downloadBytes(page, 'night-dark-range.pdf'));
  assert.equal(result.getPageCount(), 1);
  assert.equal(await page.$('[role=alert]'), null);
});

test('page processing failure is visible and Retry page recovers in place', async t => {
  const page = await openReader(t);
  await upload(page, await fixture(rgb(1,1,1), 'Retry'), 'retry.pdf');
  await expectPixel(page, [26,26,26]);
  await page.evaluate(() => {
    const post = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (message, ...rest) {
      if (!message.theme) return post.call(this, message, ...rest);
      Worker.prototype.postMessage = post;
      this.dispatchEvent(new ErrorEvent('error', { message: 'Test worker failure' }));
    };
  });
  await setInput(page, '.slider-input', 10);
  await page.waitForSelector('.canvas-wrapper [role=alert]');
  assert.match(await page.$eval('.canvas-wrapper [role=alert]', el => el.textContent), /page 1/i);
  await page.click('.canvas-wrapper [role=alert] button');
  await expectPixel(page, [36,36,36]);
  assert.equal(await page.$('.canvas-wrapper [role=alert]'), null);
});

test('late completion of an earlier upload cannot replace the active document', async t => {
  const page = await openReader(t);
  await page.evaluate(() => {
    const read = File.prototype.arrayBuffer;
    File.prototype.arrayBuffer = async function () {
      if (this.name === 'slow.pdf') await new Promise(resolve => { window.releaseRead = resolve; });
      return read.call(this);
    };
  });
  await upload(page, await fixture(rgb(1,1,1), 'Superseded'), 'slow.pdf');
  await page.waitForFunction(() => Boolean(window.releaseRead));
  await upload(page, await fixture(rgb(0,0,0), 'Current'), 'current.pdf');
  await expectPixel(page, [243,244,246]);
  // The late PDF.js loading task is destroyed when the stale load completes.
  await page.evaluate(() => {
    const terminate = Worker.prototype.terminate;
    Worker.prototype.terminate = function () {
      Worker.prototype.terminate = terminate;
      window.staleTaskFinished = true;
      return terminate.call(this);
    };
    window.releaseRead();
  });
  await page.waitForFunction(() => window.staleTaskFinished);
  await expectPixel(page, [243,244,246]);
  assert.match(await page.$eval('.textLayer', el => el.textContent), /Current/);
});

test('black glyph and white paper on the bundled exam PDF blend across the intensity range', async t => {
  const page = await openReader(t);
  const bytes = await readFile(new URL('../public/NightPDF_Master_Test_Suite.pdf', import.meta.url));
  await upload(page, Array.from(bytes), 'exam.pdf');
  await expectPixel(page, [26,26,26]);
  const slider = 'input[type=range][min="0"][max="100"]';
  await setInput(page, slider, 0);
  await expectPixel(page, [255,255,255]);
  const point = await page.$eval('.viewer-canvas', canvas => {
    const ctx = canvas.getContext('2d');
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const scale = canvas.width / 595.28;
    // The fixture draws black text in the course-details row.
    for (let y = Math.ceil(114 * scale); y <= 125 * scale; y++) {
      for (let x = Math.ceil(55 * scale); x <= 280 * scale; x++) {
        const i = (canvas.width * y + x) * 4;
        if (data[i] === 0 && data[i+1] === 0 && data[i+2] === 0) return [x, y];
      }
    }
  });
  assert.ok(point, 'could not find a black glyph in the fixture');
  for (const strength of [0, 25, 50, 75, 100]) {
    await setInput(page, slider, strength);
    const paper = Math.round(255 + (26 - 255) * strength / 100);
    await expectPixel(page, [paper, paper, paper]);
    const ink = await page.$eval('.viewer-canvas', (canvas, xy) =>
      Array.from(canvas.getContext('2d').getImageData(...xy, 1, 1).data.slice(0, 3)), point);
    assert.deepEqual(ink, [243,244,246].map(c => Math.round(c * strength / 100)));
  }
});
