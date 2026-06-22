import { execSync } from 'child_process';
import { copyFileSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('Building Vite project to extract CSS...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Finding compiled CSS...');
const assetsDir = join(process.cwd(), 'dist', 'assets');
const files = readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));

if (!cssFile) {
  console.error('Could not find compiled CSS file in dist/assets!');
  process.exit(1);
}

const sourceCss = join(assetsDir, cssFile);
const targetCss = join(process.cwd(), 'src', 'remotion', 'compiled-tailwind.css');

console.log(`Copying ${cssFile} to src/remotion/compiled-tailwind.css...`);
copyFileSync(sourceCss, targetCss);

const format = process.argv[2] || 'mp4';
const codec = format === 'webm' ? '--codec=vp8' : '';

console.log(`Starting Remotion render for ${format}...`);
try {
  execSync(`npx remotion render src/remotion/index.jsx NightPDF-Hero-Video public/hero-demo.${format} ${codec}`, { stdio: 'inherit' });
  console.log('Render complete!');
} catch (error) {
  console.error('Render failed:', error.message);
  process.exit(1);
}
