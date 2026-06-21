import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('Launching puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  
  const htmlPath = 'file://' + path.join(__dirname, '..', 'og-image.html').replace(/\\/g, '/');
  console.log('Loading HTML:', htmlPath);
  
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });
  
  const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
  await page.screenshot({ path: outputPath });
  
  console.log('OG Image successfully saved to', outputPath);
  await browser.close();
})();
