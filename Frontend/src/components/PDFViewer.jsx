import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Menu, X } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { applyThemeToCanvas } from '../utils/themeEngine';
import { boundedViewport } from '../utils/pdfProcessor';
import { CacheManager } from '../processors/CacheManager';

function readDpr() {
  return Math.min(window.devicePixelRatio || 1, 2.5);
}

function subscribeDpr(notify) {
  let media;
  function watch() {
    media?.removeEventListener('change', watch);
    media = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    media.addEventListener('change', watch);
    notify();
  }
  watch();
  window.addEventListener('resize', notify);
  return () => {
    media.removeEventListener('change', watch);
    window.removeEventListener('resize', notify);
  };
}

function PDFPageCanvas({
  pageCache,
  dimensions,
  dpr,
  pdfDoc, 
  pageNum, 
  zoom, 
  selectedTheme, 
  customTheme,
  brightness = 0, 
  themeStrength = 100
}) {
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);
  const [pageError, setPageError] = useState('');
  const [attempt, setAttempt] = useState(0);
  // 3. Render page (Double-buffered for no-flash, Web Worker & LRU cache backed)
  useEffect(() => {
    if (!canvasRef.current) return;

    let active = true;

    const controller = new AbortController();
    let renderTask;
    let textLayer;
    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (!active) return;

        const viewport = page.getViewport({ scale: zoom });
        const rasterViewport = boundedViewport(page, zoom * dpr);
        const width = Math.max(1, Math.floor(rasterViewport.width));
        const height = Math.max(1, Math.floor(rasterViewport.height));
        const cacheKey = pageCache.getCacheKey({
          pageNum, zoom, width, height, dpr, selectedTheme, themeStrength,
          brightness,
          customColors: selectedTheme === 'custom' ? [customTheme.bg, customTheme.fg] : null
        });
        
        // Render Text Layer & OCR preservation
        const textContent = await page.getTextContent();
        const textLayerDiv = textLayerRef.current;
        if (textLayerDiv && active) {
          textLayerDiv.replaceChildren();
          textLayerDiv.style.setProperty('--total-scale-factor', String(zoom * page.userUnit));
          textLayerDiv.style.width = `${viewport.width}px`;
          textLayerDiv.style.height = `${viewport.height}px`;
          textLayer = new pdfjsLib.TextLayer({
            textContentSource: textContent,
            container: textLayerDiv,
            viewport: viewport
          });
          await textLayer.render();
        }

        // Check LRU Cache
        if (!active) return;
        const cachedBitmap = pageCache.get(cacheKey);
        const visibleCanvas = canvasRef.current;
        const visibleCtx = visibleCanvas?.getContext('2d');

        if (cachedBitmap && visibleCanvas && active) {
          visibleCanvas.width = width;
          visibleCanvas.height = height;
          visibleCanvas.style.width = `${viewport.width}px`;
          visibleCanvas.style.height = `${viewport.height}px`;
          visibleCtx.drawImage(cachedBitmap, 0, 0);
          setPageError('');
          return;
        }

        // Use detached offscreen canvas to prevent white flash
        const offscreenCanvas = document.createElement('canvas');
        const offCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = width;
        offscreenCanvas.height = height;

        renderTask = page.render({
          canvasContext: offCtx,
          viewport: rasterViewport,
          background: '#ffffff'
        });

        await renderTask.promise;
        if (!active) return;

        await applyThemeToCanvas(offscreenCanvas, selectedTheme, {
          customTheme, strength: themeStrength, brightness, signal: controller.signal
        });

        if (visibleCanvas && active) {
          visibleCanvas.width = offscreenCanvas.width;
          visibleCanvas.height = offscreenCanvas.height;
          visibleCanvas.style.width = `${viewport.width}px`;
          visibleCanvas.style.height = `${viewport.height}px`;
          visibleCtx.drawImage(offscreenCanvas, 0, 0);
          setPageError('');
          
          // Save to LRU cache
          pageCache.set(cacheKey, offscreenCanvas);
        }
      } catch (err) {
        if (active) {
          setPageError(`Could not render page ${pageNum}. ${err.message || 'Try this page again.'}`);
        }
      }
    };

    renderPage();

    return () => {
      active = false;
      controller.abort();
      textLayer?.cancel();
      renderTask?.cancel();
    };
  }, [attempt, pageCache, dpr, pdfDoc, pageNum, zoom, selectedTheme, customTheme, brightness, themeStrength]);

  return (
    <div 
      className="canvas-wrapper group"
      style={{ 
        width: `${dimensions.width * zoom}px`,
        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        marginBottom: '20px',
        position: 'relative',
        margin: '0 auto 20px auto',
        overflow: 'hidden'
      }}
    >
      {pageError && (
        <div role="alert" className="absolute inset-x-0 top-0 z-30 rounded bg-zinc-900 p-3 text-sm text-white">
          {pageError}{' '}
          <button className="underline" onClick={() => setAttempt(value => value + 1)}>Retry page</button>
        </div>
      )}
      <canvas ref={canvasRef} className="viewer-canvas" style={{ display: 'block' }} />
      <div ref={textLayerRef} className="textLayer" />
    </div>
  );
}

export default function PDFViewer({ pdfDoc, numPages, currentPage, setCurrentPage, selectedTheme, customTheme,
  brightness, themeStrength, isSidebarOpen, setIsSidebarOpen, isMobile, errorMsg, clearFile }) {
  const dpr = useSyncExternalStore(subscribeDpr, readDpr);
  const [pageCache] = useState(() => new CacheManager(30));
  useEffect(() => () => pageCache.clear(), [pageCache]);
  const [manualZoom, setManualZoom] = useState(null);
  const [available, setAvailable] = useState(0);
  const [geometry, setGeometry] = useState(null);
  const [retry, setRetry] = useState(0);
  const panel = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setAvailable(entry.contentRect.width));
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let active = true;
    pdfDoc.getPage(currentPage).then(page => {
      if (active) {
        const { width, height } = page.getViewport({ scale: 1 });
        setGeometry({ page: currentPage, width, height });
      }
    }).catch(error => { if (active) setGeometry({ page: currentPage, error: error.message }); });
    return () => { active = false; };
  }, [pdfDoc, currentPage, retry]);
  const ready = available > 0 && geometry?.page === currentPage && geometry.width > 0;
  const zoom = manualZoom ?? (ready ? Math.min(1.8, available / geometry.width) : 1);
  function jump(input) {
    const n = Number(input.value);
    if (Number.isInteger(n) && n >= 1 && n <= numPages) setCurrentPage(n);
    else input.value = currentPage;
  }
  return <main className="preview-container w-full" inert={isMobile && isSidebarOpen}>
    <div className="toolbar v1-toolbar">
      <button className="toolbar-btn" aria-label="Reading and download settings" aria-expanded={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu size={18} /></button>
      <div className="toolbar-controls">
        <button className="toolbar-btn" aria-label="Previous page" disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage-1)}><ChevronLeft size={18} /></button>
        <label className="page-indicator"><input key={currentPage} aria-label="Go to page" type="number" min="1" max={numPages}
          defaultValue={currentPage} onBlur={e => jump(e.target)} onKeyDown={e => {
            if (e.key === 'Enter') { jump(e.target); e.target.blur(); }
          }} /> / {numPages}</label>
        <button className="toolbar-btn" aria-label="Next page" disabled={currentPage >= numPages}
          onClick={() => setCurrentPage(currentPage+1)}><ChevronRight size={18} /></button>
      </div>
      <div className="toolbar-controls">
        <button className="toolbar-btn" aria-label="Zoom out" disabled={zoom <= 0.25}
          onClick={() => setManualZoom(Math.max(0.25, zoom - 0.25))}><ZoomOut size={16}/></button>
        <button className="toolbar-btn fit-button" aria-label="Fit current page to width" title="Fit width"
          onClick={() => setManualZoom(null)}>{manualZoom === null ? 'Fit' : Math.round(zoom*100)+'%'}</button>
        <button className="toolbar-btn" aria-label="Zoom in" disabled={zoom >= 3}
          onClick={() => setManualZoom(Math.min(3, zoom + 0.25))}><ZoomIn size={16}/></button>
      </div>
      <button className="toolbar-btn" title="Close PDF" aria-label="Close PDF" onClick={clearFile}><X size={18}/></button>
    </div>
    {errorMsg && (!isMobile || !isSidebarOpen) && <p role="alert" className="p-3 text-sm text-rose-300">{errorMsg}</p>}
    <div className="viewer-panel v1-panel" ref={panel}>
      {geometry?.page === currentPage && geometry.error ? <div role="alert">Could not open page {currentPage}. {geometry.error}
        <button className="ml-2 underline" onClick={() => setRetry(v => v+1)}>Retry page</button></div> :
        ready ? <PDFPageCanvas key={currentPage} {...{ pdfDoc, pageCache, dpr, zoom, selectedTheme, customTheme, brightness, themeStrength }}
          dimensions={geometry} pageNum={currentPage} /> : <p role="status">Opening page {currentPage}…</p>}
    </div>
  </main>;
}
