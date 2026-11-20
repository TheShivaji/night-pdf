// PDF Processing engine using PDF.js and pdf-lib client-side
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { applyThemeToCanvas } from './themeEngine';

// Set up the PDFJS worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/**
 * Loads a PDF file and returns the PDF Document object.
 * @param {File} file - PDF file uploaded by user
 * @returns {Promise<pdfjsLib.PDFDocumentProxy>}
 */
export async function loadPdfDocument(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  try {
    return await loadingTask.promise;
  } catch (error) {
    await loadingTask.destroy();
    throw error;
  }
}

// Bound both area and edge length, including unusually narrow or rotated pages.
export function boundedViewport(page, requestedScale, maxPixels = 4_000_000) {
  const base = page.getViewport({ scale: 1 });
  const { width, height } = base;
  if (!(width > 0 && height > 0 && Number.isFinite(width * height))) {
    throw new Error('This page has invalid dimensions.');
  }
  const scale = Math.min(requestedScale, 8192 / Math.max(width, height),
    Math.sqrt(maxPixels / (width * height)));
  return page.getViewport({ scale });
}

export async function convertPdfTheme(pdfDoc, themeId, options = {}, onProgress = () => {}) {
  const { signal } = options;
  const pages = options.pageRange?.length ? options.pageRange :
    Array.from({ length: pdfDoc.numPages }, (_, i) => i + 1);
  const output = await PDFDocument.create();
  let embeddedBytes = 0;
  for (const [index, pageNum] of pages.entries()) {
    signal?.throwIfAborted();
    onProgress({ current: index + 1, total: pages.length, status: 'processing' });
    const page = await pdfDoc.getPage(pageNum);
    signal?.throwIfAborted();
    const base = page.getViewport({ scale: 1 });
    const viewport = boundedViewport(page, options.scale || 3, 9_000_000);
    const width = Math.max(1, Math.floor(viewport.width));
    const height = Math.max(1, Math.floor(viewport.height));
    const canvas = document.createElement('canvas');
    let task;
    const cancel = () => task?.cancel();
    try {
      canvas.width = width; canvas.height = height;
      task = page.render({ canvasContext: canvas.getContext('2d'), viewport, background: '#ffffff' });
      signal?.addEventListener('abort', cancel, { once: true });
      await task.promise;
      signal?.throwIfAborted();
      await applyThemeToCanvas(canvas, themeId, options);
      signal?.throwIfAborted();
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      signal?.throwIfAborted();
      if (!blob) throw new Error(`Could not encode page ${pageNum}. Try a lower download quality.`);
      canvas.width = canvas.height = 0;
      const image = await output.embedPng(await blob.arrayBuffer());
      signal?.throwIfAborted();
      // Compress each opaque page now so pdf-lib can release its decoded RGB buffer.
      await image.embed();
      embeddedBytes += output.context.lookup(image.ref).getContentsSize();
      if (embeddedBytes > 64 * 1024 ** 2) {
        throw new Error('This export is too large. Choose a smaller page range or lower resolution.');
      }
      signal?.throwIfAborted();
      output.addPage([base.width, base.height]).drawImage(image, { width: base.width, height: base.height });
    } finally {
      signal?.removeEventListener('abort', cancel);
      canvas.width = canvas.height = 0;
    }
  }
  signal?.throwIfAborted();
  onProgress({ status: 'saving', current: pages.length, total: pages.length });
  return output.save();
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
