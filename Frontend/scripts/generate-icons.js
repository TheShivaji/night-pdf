import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const svgContent = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="npdf-punch">
      <rect width="24" height="24" fill="white"/>
      <circle cx="12" cy="10" r="4.5" fill="black"/>
      <circle cx="13.5" cy="8.5" r="4.5" fill="white"/>
      <line x1="8" y1="16" x2="16" y2="16" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="8" y1="19" x2="13" y2="19" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
    </mask>
  </defs>
  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#18181b" mask="url(#npdf-punch)"/>
  <path d="M14 2v4a2 2 0 0 0 2 2h4" fill="none" stroke="#18181b" stroke-width="2"/>
</svg>
`;

async function generateIcons() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; }
          svg { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>${svgContent}</body>
    </html>
  `;
  
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const sizes = [
    { name: 'pwa-192x192.png', size: 192 },
    { name: 'pwa-512x512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 }
  ];
  
  for (const { name, size } of sizes) {
    await page.setViewport({ width: size, height: size });
    await page.screenshot({
      path: path.join('public', name),
      omitBackground: true,
      clip: { x: 0, y: 0, width: size, height: size }
    });
    console.log(`Generated ${name}`);
  }
  
  await browser.close();
}

generateIcons().catch(console.error);
