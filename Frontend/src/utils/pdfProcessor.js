// PDF Processing engine using PDF.js and pdf-lib client-side
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { applyThemeToImageData } from './themeEngine';

// Set up the PDFJS worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/**
 * Thicken text on canvas by redrawing it with small offsets.
 * @param {HTMLCanvasElement} canvas 
 * @param {number} boldness - pixel offset (e.g. 0.5 to 2.0)
 */
export function applyBoldingToCanvas(canvas, boldness) {
  if (!boldness || boldness <= 0) return;
  
  const ctx = canvas.getContext('2d');
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(canvas, 0, 0);

  // Redraw with directional offsets at lower opacity to dilate text lines
  ctx.globalAlpha = 0.35;
  ctx.drawImage(tempCanvas, -boldness, 0);
  ctx.drawImage(tempCanvas, boldness, 0);
  ctx.drawImage(tempCanvas, 0, -boldness);
  ctx.drawImage(tempCanvas, 0, boldness);
  
  // Reset opacity
  ctx.globalAlpha = 1.0;
}

/**
 * Loads a PDF file and returns the PDF Document object.
 * @param {File} file - PDF file uploaded by user
 * @returns {Promise<pdfjsLib.PDFDocumentProxy>}
 */
export async function loadPdfDocument(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  return await loadingTask.promise;
}

/**
 * Converts a PDF to the selected theme and compiles a new PDF bytes.
 * @param {pdfjsLib.PDFDocumentProxy} pdfDoc - PDFJS Document object
 * @param {string} themeId - Theme preset key
 * @param {object} options - Options { mode: 'smart' | 'duotone' | 'original', scale: number, brightness: number, contrast: number, boldness: number }
 * @param {function} onProgress - Progress callback ({ current, total, status })
 * @returns {Promise<Uint8Array>} Converted PDF bytes
 */
export async function convertPdfTheme(pdfDoc, themeId, options = {}, onProgress = () => {}) {
  const numPages = pdfDoc.numPages;
  const scale = options.scale || 2.0; // default to 2x for high quality text
  const mode = options.mode || 'smart';
  const brightness = options.brightness || 0;
  const contrast = options.contrast || 0;
  const boldness = options.boldness || 0;

  // Determine pages to convert based on custom range selection
  const pagesToConvert = (options.pageRange && options.pageRange.length > 0)
    ? options.pageRange
    : Array.from({ length: numPages }, (_, i) => i + 1);
  const totalToConvert = pagesToConvert.length;

  // Create a new PDF document using pdf-lib
  const newPdf = await PDFDocument.create();

  for (let idx = 0; idx < totalToConvert; idx++) {
    const pageNum = pagesToConvert[idx];
    onProgress({ current: idx + 1, total: totalToConvert, status: 'processing' });

    // 1. Get the PDF page
    const page = await pdfDoc.getPage(pageNum);
    
    // 2. Get viewport at desired scale
    const viewport = page.getViewport({ scale });
    
    // 3. Create canvas and render page
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    const ctx = canvas.getContext('2d');
    
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;

    // 3.5. Apply text bolding (dilation) on original page render if specified
    if (boldness > 0) {
      applyBoldingToCanvas(canvas, boldness);
    }

    // 4. Apply theme and adjustments to canvas image data
    const isNormal = themeId === 'normal';
    const hasAdjustments = brightness !== 0 || contrast !== 0;

    if (!isNormal || hasAdjustments || mode === 'original') {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      applyThemeToImageData(imgData, themeId, { 
        mode, 
        brightness, 
        contrast,
        customTheme: options.customTheme 
      });
      ctx.putImageData(imgData, 0, 0);
    }

    // 5. Convert canvas to png image bytes
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });
    
    const pageImgBytes = await blob.arrayBuffer();

    // 6. Embed image into pdf-lib document
    const embeddedImg = await newPdf.embedPng(pageImgBytes);
    
    // In pdf-lib, page size is set in points (72 points per inch)
    const originalViewport = page.getViewport({ scale: 1.0 });
    const newPage = newPdf.addPage([originalViewport.width, originalViewport.height]);
    
    newPage.drawImage(embeddedImg, {
      x: 0,
      y: 0,
      width: originalViewport.width,
      height: originalViewport.height,
    });
  }

  onProgress({ current: totalToConvert, total: totalToConvert, status: 'saving' });
  
  // Save PDF as Uint8Array bytes
  const pdfBytes = await newPdf.save();
  return pdfBytes;
}

/**
 * Resolves outline destinations to page numbers recursively.
 */
async function resolveOutlineItem(pdfDoc, item) {
  let pageNum = null;
  try {
    if (item.dest) {
      let dest = item.dest;
      if (typeof dest === 'string') {
        dest = await pdfDoc.getDestination(item.dest);
      }
      if (dest && dest[0]) {
        const pageIndex = await pdfDoc.getPageIndex(dest[0]);
        pageNum = pageIndex + 1;
      }
    }
  } catch (e) {
    console.warn('Error resolving outline dest:', e);
  }

  const resolvedChildren = [];
  if (item.items && item.items.length > 0) {
    for (const child of item.items) {
      resolvedChildren.push(await resolveOutlineItem(pdfDoc, child));
    }
  }

  return {
    title: item.title,
    pageNum,
    items: resolvedChildren
  };
}

/**
 * Gets the outline (TOC) tree of a PDF document with page numbers resolved.
 * @param {pdfjsLib.PDFDocumentProxy} pdfDoc 
 * @returns {Promise<Array>} resolved outline items
 */
export async function getPdfOutline(pdfDoc) {
  try {
    const rawOutline = await pdfDoc.getOutline();
    if (!rawOutline) return [];
    
    const resolved = [];
    for (const item of rawOutline) {
      resolved.push(await resolveOutlineItem(pdfDoc, item));
    }
    return resolved;
  } catch (e) {
    console.error('Error fetching outline:', e);
    return [];
  }
}
