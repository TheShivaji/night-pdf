import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateMasterTestPdf() {
  console.log('Generating NightPDF Master Enterprise Test Suite...');
  const pdfDoc = await PDFDocument.create();
  
  const timesFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const courier = await pdfDoc.embedFont(StandardFonts.Courier);
  const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  // ==========================================
  // PAGE 1: Academic Examination & Research Profile
  // ==========================================
  const page1 = pdfDoc.addPage([595.28, 841.89]); // Standard A4 (72 dpi points)
  const { width, height } = page1.getSize();

  // Draw solid white background
  page1.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });

  // Header Title
  page1.drawText('DR. BABASAHEB AMBEDKAR TECHNOLOGICAL UNIVERSITY, LONERE', {
    x: 55, y: height - 60, size: 13, font: timesBold, color: rgb(0.1, 0.1, 0.1)
  });
  page1.drawText('Supplementary Winter Examination - 2026', {
    x: 180, y: height - 85, size: 12, font: timesBold, color: rgb(0.2, 0.2, 0.2)
  });

  // Course Details Table Box
  page1.drawRectangle({ x: 45, y: height - 165, width: width - 90, height: 60, borderColor: rgb(0.4, 0.4, 0.4), borderWidth: 1 });
  page1.drawText('Course: B.Tech Computer Science & Engineering', { x: 55, y: height - 125, size: 11, font: timesBold });
  page1.drawText('Semester: VI', { x: 420, y: height - 125, size: 11, font: timesBold });
  page1.drawText('Subject Code & Name: BTCOC602 Advanced Agentic Networks', { x: 55, y: height - 145, size: 11, font: timesFont });
  page1.drawText('Max Marks: 60', { x: 55, y: height - 160, size: 10, font: timesBold });
  page1.drawText('Duration: 3 Hours', { x: 420, y: height - 160, size: 10, font: timesBold });

  // Instructions Section
  page1.drawText('Instructions to the Students:', { x: 55, y: height - 195, size: 11, font: timesBold, color: rgb(0, 0, 0) });
  const instructions = [
    '1. All questions are compulsory. Verify smart dark mode readability on this page.',
    '2. The level of question expected answer as per Course Outcome (CO) is mentioned explicitly.',
    '3. Check Compare Wiper slider <---> across this exact academic text layout.',
    '4. Verify zoom independence up to 400% without blurry bitmap scaling.'
  ];
  instructions.forEach((ins, idx) => {
    page1.drawText(ins, { x: 70, y: height - 215 - (idx * 16), size: 10, font: timesFont, color: rgb(0.15, 0.15, 0.15) });
  });

  // Questions
  page1.drawText('Q.1 Solve Any Two of the following:', { x: 55, y: height - 300, size: 11, font: timesBold });
  page1.drawText('(Marks: 12)', { x: width - 110, y: height - 300, size: 11, font: timesBold });

  page1.drawText('A) Define Smart Image Preservation heuristics. Explain 8x8 spatial heatmap classification.', {
    x: 70, y: height - 325, size: 10.5, font: timesFont
  });
  page1.drawText('[CO1]', { x: width - 100, y: height - 325, size: 10, font: timesBold });

  page1.drawText('B) Derive the WCAG AA contrast ratio formula for AMOLED black background panels:', {
    x: 70, y: height - 355, size: 10.5, font: timesFont
  });
  page1.drawText('[CO2]', { x: width - 100, y: height - 355, size: 10, font: timesBold });

  // Drawn Formula Box
  page1.drawRectangle({ x: 120, y: height - 410, width: 340, height: 40, color: rgb(0.96, 0.96, 0.98), borderColor: rgb(0.2, 0.4, 0.8), borderWidth: 1.5 });
  page1.drawText('Luminance Ratio = (L_light + 0.05) / (L_dark + 0.05)  >=  4.5 : 1', {
    x: 135, y: height - 385, size: 10.5, font: courierBold, color: rgb(0.1, 0.2, 0.6)
  });

  page1.drawText('C) State and explain the Web Worker zero-copy ArrayBuffer transfer mechanism.', {
    x: 70, y: height - 440, size: 10.5, font: timesFont
  });
  page1.drawText('[CO3]', { x: width - 100, y: height - 440, size: 10, font: timesBold });

  // Footer
  page1.drawText('Page 1 of 3 -- Academic Profile Validation', { x: 200, y: 30, size: 9, font: helvetica, color: rgb(0.5, 0.5, 0.5) });


  // ==========================================
  // PAGE 2: Color Chromaticity & Charts Profile
  // ==========================================
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  page2.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });

  page2.drawText('ENTERPRISE COLOR CHROMATICITY BENCHMARK', {
    x: 75, y: height - 60, size: 16, font: helveticaBold, color: rgb(0.08, 0.12, 0.2)
  });
  page2.drawText('Smart Image Preservation Heuristic Validation Page (Protect Chart Colors)', {
    x: 95, y: height - 85, size: 11, font: helvetica, color: rgb(0.4, 0.4, 0.45)
  });

  // Chart Container Box
  page2.drawRectangle({ x: 50, y: height - 480, width: width - 100, height: 360, color: rgb(0.98, 0.98, 0.99), borderColor: rgb(0.85, 0.85, 0.9), borderWidth: 1 });

  // Y-Axis Gridlines
  for (let g = 0; g <= 4; g++) {
    const gy = height - 430 + (g * 65);
    page2.drawLine({ start: { x: 80, y: gy }, end: { x: width - 70, y: gy }, color: rgb(0.88, 0.88, 0.9), thickness: 1 });
    page2.drawText(`${g * 25}%`, { x: 55, y: gy - 4, size: 9, font: helvetica, color: rgb(0.5, 0.5, 0.5) });
  }

  // 4 Vibrant Bar Columns
  // Bar 1: Emerald Green (Success)
  page2.drawRectangle({ x: 110, y: height - 430, width: 65, height: 245, color: rgb(0.06, 0.72, 0.50) });
  page2.drawText('94.2%', { x: 125, y: height - 175, size: 11, font: helveticaBold, color: rgb(0.05, 0.4, 0.25) });
  page2.drawText('SUCCESS', { x: 120, y: height - 448, size: 9, font: helveticaBold, color: rgb(0.2, 0.2, 0.2) });
  page2.drawText('(GREEN)', { x: 122, y: height - 460, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  // Bar 2: Rose Red (Errors)
  page2.drawRectangle({ x: 215, y: height - 430, width: 65, height: 35, color: rgb(0.93, 0.26, 0.26) });
  page2.drawText('13.4%', { x: 230, y: height - 385, size: 11, font: helveticaBold, color: rgb(0.6, 0.1, 0.1) });
  page2.drawText('ERRORS', { x: 227, y: height - 448, size: 9, font: helveticaBold, color: rgb(0.2, 0.2, 0.2) });
  page2.drawText('(RED)', { x: 233, y: height - 460, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  // Bar 3: Sky Blue (Latency)
  page2.drawRectangle({ x: 320, y: height - 430, width: 65, height: 180, color: rgb(0.23, 0.51, 0.96) });
  page2.drawText('69.1ms', { x: 332, y: height - 240, size: 11, font: helveticaBold, color: rgb(0.1, 0.3, 0.7) });
  page2.drawText('LATENCY', { x: 330, y: height - 448, size: 9, font: helveticaBold, color: rgb(0.2, 0.2, 0.2) });
  page2.drawText('(BLUE)', { x: 334, y: height - 460, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  // Bar 4: Amber Orange (Cache Hits)
  page2.drawRectangle({ x: 425, y: height - 430, width: 65, height: 260, color: rgb(0.96, 0.62, 0.04) });
  page2.drawText('100%', { x: 442, y: height - 160, size: 11, font: helveticaBold, color: rgb(0.7, 0.4, 0.0) });
  page2.drawText('CACHE', { x: 440, y: height - 448, size: 9, font: helveticaBold, color: rgb(0.2, 0.2, 0.2) });
  page2.drawText('(AMBER)', { x: 436, y: height - 460, size: 8, font: helvetica, color: rgb(0.4, 0.4, 0.4) });

  // Explanation Box
  page2.drawRectangle({ x: 50, y: height - 600, width: width - 100, height: 90, color: rgb(0.94, 0.96, 0.98), borderColor: rgb(0.2, 0.5, 0.9), borderWidth: 1 });
  page2.drawText('QUALITY GATE VERIFICATION INSTRUCTION:', { x: 65, y: height - 530, size: 10, font: helveticaBold, color: rgb(0.1, 0.3, 0.8) });
  page2.drawText('When switching rendering strategy to "Smart" or dragging the Compare Wiper:', { x: 65, y: height - 550, size: 9.5, font: helvetica, color: rgb(0.2, 0.2, 0.2) });
  page2.drawText('1. The white background must turn AMOLED black (#000000).', { x: 80, y: height - 568, size: 9, font: helvetica });
  page2.drawText('2. The 4 colored chart bars MUST NOT invert into purple/cyan negatives!', { x: 80, y: height - 584, size: 9, font: helveticaBold, color: rgb(0.8, 0.1, 0.1) });

  page2.drawText('Page 2 of 3 -- Chart Color Preservation Benchmark', { x: 190, y: 30, size: 9, font: helvetica, color: rgb(0.5, 0.5, 0.5) });


  // ==========================================
  // PAGE 3: Developer Snippets & Architecture Profile
  // ==========================================
  const page3 = pdfDoc.addPage([595.28, 841.89]);
  page3.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });

  page3.drawText('DEVELOPER ARCHITECTURE & SYNTAX PROFILE', {
    x: 85, y: height - 60, size: 16, font: helveticaBold, color: rgb(0.1, 0.1, 0.1)
  });
  page3.drawText('Simulated IDE Screenshot & Code Snippet Box (Programming Books Heuristic)', {
    x: 95, y: height - 85, size: 10.5, font: helvetica, color: rgb(0.4, 0.4, 0.4)
  });

  // Dark IDE Editor Window Box
  page3.drawRectangle({ x: 50, y: height - 360, width: width - 100, height: 240, color: rgb(0.09, 0.11, 0.15), borderRadius: 6 });
  
  // Window Controls (Red, Yellow, Green Dots)
  page3.drawCircle({ x: 70, y: height - 138, size: 5, color: rgb(0.93, 0.36, 0.36) });
  page3.drawCircle({ x: 88, y: height - 138, size: 5, color: rgb(0.96, 0.75, 0.20) });
  page3.drawCircle({ x: 106, y: height - 138, size: 5, color: rgb(0.18, 0.80, 0.44) });
  page3.drawText('smartThemeWorker.js -- NightPDF Engine', { x: 200, y: height - 141, size: 9, font: courier, color: rgb(0.6, 0.65, 0.75) });

  page3.drawLine({ start: { x: 50, y: height - 152 }, end: { x: width - 50, y: height - 152 }, color: rgb(0.18, 0.22, 0.30), thickness: 1 });

  // Code Content inside IDE Box
  const codeLines = [
    { text: '// Asynchronous 8x8 Spatial Heatmap Classification Engine', color: rgb(0.40, 0.50, 0.60) },
    { text: 'import { expose } from "comlink";', color: rgb(0.80, 0.55, 0.95) },
    { text: 'import { classifyBlockConfidence } from "./heuristics";', color: rgb(0.80, 0.55, 0.95) },
    { text: '', color: rgb(1, 1, 1) },
    { text: 'async function processCanvasBuffer(imgData, preset) {', color: rgb(0.35, 0.75, 0.95) },
    { text: '  const { width, height, data } = imgData;', color: rgb(0.90, 0.90, 0.95) },
    { text: '  // Protect OCR Pointer Events & Vector Graphics', color: rgb(0.40, 0.50, 0.60) },
    { text: '  const heatmap = classifyBlockConfidence(data, width);', color: rgb(0.95, 0.75, 0.45) },
    { text: '  return applyAmoledTheme(data, preset, heatmap);', color: rgb(0.35, 0.95, 0.65) },
    { text: '}', color: rgb(0.35, 0.75, 0.95) }
  ];

  codeLines.forEach((line, i) => {
    page3.drawText(`${i + 1}`, { x: 65, y: height - 175 - (i * 17), size: 10, font: courier, color: rgb(0.3, 0.35, 0.45) });
    if (line.text) {
      page3.drawText(line.text, { x: 95, y: height - 175 - (i * 17), size: 10, font: courierBold, color: line.color });
    }
  });

  // Architecture Flow Diagram
  page3.drawText('MODULAR PIPELINE ZERO-COPY ARCHITECTURE:', { x: 50, y: height - 410, size: 11, font: helveticaBold, color: rgb(0.2, 0.2, 0.2) });

  const boxY = height - 500;
  // Box 1
  page3.drawRectangle({ x: 50, y: boxY, width: 130, height: 60, color: rgb(0.92, 0.95, 0.99), borderColor: rgb(0.2, 0.4, 0.8), borderWidth: 1.5 });
  page3.drawText('Main UI Thread', { x: 75, y: boxY + 35, size: 10, font: helveticaBold, color: rgb(0.1, 0.3, 0.7) });
  page3.drawText('(React / PDF.js)', { x: 78, y: boxY + 18, size: 8.5, font: helvetica, color: rgb(0.4, 0.4, 0.5) });

  // Arrow 1
  page3.drawLine({ start: { x: 180, y: boxY + 30 }, end: { x: 235, y: boxY + 30 }, color: rgb(0.4, 0.4, 0.4), thickness: 2 });
  page3.drawText('ArrayBuffer', { x: 184, y: boxY + 36, size: 8, font: courierBold, color: rgb(0.5, 0.5, 0.5) });

  // Box 2
  page3.drawRectangle({ x: 235, y: boxY, width: 130, height: 60, color: rgb(0.99, 0.95, 0.90), borderColor: rgb(0.9, 0.5, 0.1), borderWidth: 1.5 });
  page3.drawText('Worker Pool', { x: 268, y: boxY + 35, size: 10, font: helveticaBold, color: rgb(0.8, 0.4, 0.0) });
  page3.drawText('(Async Heatmap)', { x: 262, y: boxY + 18, size: 8.5, font: helvetica, color: rgb(0.5, 0.4, 0.3) });

  // Arrow 2
  page3.drawLine({ start: { x: 365, y: boxY + 30 }, end: { x: 420, y: boxY + 30 }, color: rgb(0.4, 0.4, 0.4), thickness: 2 });
  page3.drawText('Baked Pixels', { x: 368, y: boxY + 36, size: 8, font: courierBold, color: rgb(0.5, 0.5, 0.5) });

  // Box 3
  page3.drawRectangle({ x: 420, y: boxY, width: 125, height: 60, color: rgb(0.90, 0.98, 0.94), borderColor: rgb(0.1, 0.7, 0.4), borderWidth: 1.5 });
  page3.drawText('AMOLED Canvas', { x: 435, y: boxY + 35, size: 10, font: helveticaBold, color: rgb(0.1, 0.5, 0.3) });
  page3.drawText('(60 FPS Display)', { x: 442, y: boxY + 18, size: 8.5, font: helvetica, color: rgb(0.3, 0.5, 0.4) });

  page3.drawText('Page 3 of 3 -- Developer & Architecture Benchmark', { x: 180, y: 30, size: 9, font: helvetica, color: rgb(0.5, 0.5, 0.5) });

  // ==========================================
  // SAVE FILE
  // ==========================================
  const pdfBytes = await pdfDoc.save();

  // Save to test/ folder in workspace root
  const workspaceRoot = path.resolve(__dirname, '../..');
  const testDir = path.join(workspaceRoot, 'test');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  const testPath = path.join(testDir, 'NightPDF_Master_Test_Suite.pdf');
  fs.writeFileSync(testPath, pdfBytes);
  console.log(`Saved master test PDF to: ${testPath}`);

  // Also save to Frontend/public/ for direct browser loading
  const publicPath = path.join(__dirname, '../public/NightPDF_Master_Test_Suite.pdf');
  fs.writeFileSync(publicPath, pdfBytes);
  console.log(`Saved copy to public dir: ${publicPath}`);
}

generateMasterTestPdf().catch(console.error);
