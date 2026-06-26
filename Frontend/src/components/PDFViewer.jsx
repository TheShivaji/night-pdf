import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Menu, 
  Moon,
  ScrollText,
  BookOpen,
  X,
  Maximize,
  Minimize,
  Columns,
  Sliders
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { applyThemeToImageData, THEME_PRESETS } from '../utils/themeEngine';
import { applyBoldingToCanvas } from '../utils/pdfProcessor';
import { globalWorkerPool } from '../processors/WorkerManager';
import { globalPageCache } from '../processors/CacheManager';
import { ThemeProcessor } from '../processors/ThemeProcessor';
import ShortcutsModal from './ShortcutsModal';

function PDFPageCanvas({ 
  pdfDoc, 
  pageNum, 
  zoom, 
  selectedTheme, 
  customTheme,
  mode = 'smart', 
  brightness = 0, 
  contrast = 0,
  boldness = 0,
  themeStrength = 100,
  adaptiveThreshold = 50,
  isWiperActive = false
}) {
  const canvasRef = useRef(null);
  const lightCanvasRef = useRef(null);
  const textLayerRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 });
  const renderTaskRef = useRef(null);
  const [wiperPos, setWiperPos] = useState(50); // percentage

  // 1. Get aspect ratio size placeholders
  useEffect(() => {
    let active = true;
    pdfDoc.getPage(pageNum).then((page) => {
      if (!active) return;
      const viewport = page.getViewport({ scale: 1.0 });
      setDimensions({ width: viewport.width, height: viewport.height });
    });
    return () => { active = false; };
  }, [pdfDoc, pageNum]);

  // 2. Setup intersection observer for memory-safe lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '2000px 0px' } // Load ahead, unload far away
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  // 3. Render page (Double-buffered for no-flash, Web Worker & LRU cache backed)
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    let active = true;

    const renderPage = async () => {
      try {
        const docId = pdfDoc._transport?.docId || 'pdf_doc';
        const cacheKey = globalPageCache.getCacheKey({
          docId, pageNum, zoom, themeId: selectedTheme, strength: themeStrength, mode, threshold: adaptiveThreshold
        });

        const page = await pdfDoc.getPage(pageNum);
        if (!active) return;

        const viewport = page.getViewport({ scale: zoom });
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // Cap at 2.5x
        
        // Render Text Layer & OCR preservation
        const textContent = await page.getTextContent();
        const textLayerDiv = textLayerRef.current;
        if (textLayerDiv && active) {
          textLayerDiv.innerHTML = '';
          textLayerDiv.style.width = `${viewport.width}px`;
          textLayerDiv.style.height = `${viewport.height}px`;
          const textLayer = new pdfjsLib.TextLayer({
            textContentSource: textContent,
            container: textLayerDiv,
            viewport: viewport
          });
          await textLayer.render();
        }

        // Check LRU Cache
        const cachedBitmap = globalPageCache.get(cacheKey);
        const visibleCanvas = canvasRef.current;
        const visibleCtx = visibleCanvas?.getContext('2d');

        if (!isWiperActive && cachedBitmap && visibleCanvas && active) {
          visibleCanvas.width = viewport.width * dpr;
          visibleCanvas.height = viewport.height * dpr;
          visibleCanvas.style.width = `${viewport.width}px`;
          visibleCanvas.style.height = `${viewport.height}px`;
          visibleCtx?.drawImage(cachedBitmap, 0, 0);
          return;
        }

        // Use detached offscreen canvas to prevent white flash
        const offscreenCanvas = document.createElement('canvas');
        const offCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = viewport.width * dpr;
        offscreenCanvas.height = viewport.height * dpr;
        offCtx.scale(dpr, dpr);

        // Guarantee solid white paper background for transparent PDFs
        offCtx.fillStyle = '#ffffff';
        offCtx.fillRect(0, 0, viewport.width, viewport.height);

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderTask = page.render({
          canvasContext: offCtx,
          viewport: viewport
        });
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!active) return;

        if (boldness > 0) {
          applyBoldingToCanvas(offscreenCanvas, boldness);
        }

        // Save original light render for comparison wiper if active
        if (isWiperActive && lightCanvasRef.current && active) {
          const lCanvas = lightCanvasRef.current;
          lCanvas.width = offscreenCanvas.width;
          lCanvas.height = offscreenCanvas.height;
          lCanvas.style.width = `${viewport.width}px`;
          lCanvas.style.height = `${viewport.height}px`;
          lCanvas.getContext('2d').drawImage(offscreenCanvas, 0, 0);
        }

        const isNormal = selectedTheme === 'normal';
        const hasAdjustments = brightness !== 0 || contrast !== 0 || themeStrength < 100;

        if (!isNormal || hasAdjustments || mode === 'original') {
          const activePreset = ThemeProcessor.getPreset(selectedTheme, customTheme);
          const imgData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          
          // Execute Asynchronous Web Worker Smart Preservation
          const processedImgData = await globalWorkerPool.processCanvas(imgData, activePreset, {
            mode,
            strength: themeStrength,
            threshold: adaptiveThreshold,
            brightness,
            contrast
          });
          
          if (!active) return;
          offCtx.putImageData(processedImgData, 0, 0);
        }

        if (visibleCanvas && active) {
          visibleCanvas.width = offscreenCanvas.width;
          visibleCanvas.height = offscreenCanvas.height;
          visibleCanvas.style.width = `${viewport.width}px`;
          visibleCanvas.style.height = `${viewport.height}px`;
          visibleCtx?.drawImage(offscreenCanvas, 0, 0);
          
          // Save to LRU cache
          globalPageCache.set(cacheKey, offscreenCanvas);
        }
      } catch (err) {
        if (err.name !== 'RenderingCancelledException') {
          console.error(`Page ${pageNum} render error:`, err);
        }
      }
    };

    renderPage();

    return () => {
      active = false;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [isVisible, pdfDoc, pageNum, zoom, selectedTheme, customTheme, mode, brightness, contrast, boldness, themeStrength, adaptiveThreshold, isWiperActive]);

  return (
    <div 
      ref={containerRef} 
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
      {isVisible ? (
        <>
          <canvas 
            ref={canvasRef} 
            className="viewer-canvas" 
            style={{ display: 'block', width: '100%', height: '100%' }} 
          />
          <div ref={textLayerRef} className="textLayer" />
          
          {/* Interactive Comparison Wiper Layer (Masked 1:1 via clip-path) */}
          {isWiperActive && selectedTheme !== 'normal' && (
            <>
              <canvas 
                ref={lightCanvasRef} 
                className="viewer-canvas" 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  zIndex: 10,
                  display: 'block',
                  clipPath: `inset(0 calc(100% - ${wiperPos}%) 0 0)`
                }} 
              />
              <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider z-15 pointer-events-none transition-opacity" style={{ opacity: wiperPos > 12 ? 1 : 0 }}>Original Light</span>
              
              {/* Vertical Blue Separator Line */}
              <div 
                className="absolute top-0 bottom-0 z-15 pointer-events-none"
                style={{
                  left: `${wiperPos}%`,
                  width: '2px',
                  background: '#3b82f6',
                  boxShadow: '0 0 12px rgba(59, 130, 246, 0.6)'
                }}
              />

              {/* Draggable Handle */}
              <div 
                className="absolute top-0 bottom-0 z-20 cursor-ew-resize flex items-center justify-center"
                style={{ left: `calc(${wiperPos}% - 12px)`, width: '24px' }}
                onMouseDown={(e) => {
                  const rect = containerRef.current.getBoundingClientRect();
                  const onMove = (moveEvent) => {
                    const pos = ((moveEvent.clientX - rect.left) / rect.width) * 100;
                    setWiperPos(Math.max(2, Math.min(98, pos)));
                  };
                  const onUp = () => {
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onUp);
                  };
                  window.addEventListener('mousemove', onMove);
                  window.addEventListener('mouseup', onUp);
                }}
              >
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white text-[10px]">
                  ↔
                </div>
              </div>
              <span className="absolute top-2 right-2 bg-slate-900/90 text-blue-300 border border-slate-700 text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider z-15 pointer-events-none transition-opacity" style={{ opacity: wiperPos < 88 ? 1 : 0 }}>Smart Dark</span>
            </>
          )}

          <div ref={textLayerRef} className="textLayer" />
        </>
      ) : (
        <div style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'var(--text-muted)',
          fontSize: '13px',
          background: 'rgba(255, 255, 255, 0.01)'
        }}>
          Loading Page {pageNum}...
        </div>
      )}
    </div>
  );
}

export default function PDFViewer({
  pdfDoc,
  numPages,
  currentPage,
  setCurrentPage,
  zoom,
  setZoom,
  zoomMode,
  setZoomMode,
  selectedTheme,
  setSelectedTheme,
  customTheme,
  mode = 'smart',
  brightness = 0,
  contrast = 0,
  boldness = 0,
  themeStrength = 100,
  adaptiveThreshold = 50,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  isProcessing,
  clearFile,
  isBookMode,
  setIsBookMode,
  isFullscreen,
  setIsFullscreen
}) {
  const [isContinuous, setIsContinuous] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isWiperActive, setIsWiperActive] = useState(false);
  const [baseWidth, setBaseWidth] = useState(null);

  const toolbarRef = useRef(null);
  const containerRef = useRef(null);
  const viewerPanelRef = useRef(null);

  useEffect(() => {
    if (!toolbarRef.current || !containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
        containerRef.current.style.setProperty('--toolbar-height', `${height}px`);
      }
    });
    observer.observe(toolbarRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pdfDoc) {
      pdfDoc.getPage(1).then(page => {
        const vp = page.getViewport({ scale: 1.0 });
        setBaseWidth(vp.width);
      });
    }
  }, [pdfDoc]);

  // Fit-to-Width resizing
  useEffect(() => {
    if (!isMobile || zoomMode !== 'fit-width' || !baseWidth) return;
    const actualViewerWidth = containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
    const targetWidth = actualViewerWidth - 20;
    let newZoom = Math.min(2.0, targetWidth / baseWidth);
    setZoom(newZoom);
  }, [isMobile, zoomMode, baseWidth, setZoom]);

  const handlePrevPage = () => {
    if (isBookMode) {
      setCurrentPage(prev => Math.max(1, prev - 2));
    } else {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (isBookMode) {
      setCurrentPage(prev => Math.min(numPages, prev + 2));
    } else {
      setCurrentPage(prev => Math.min(numPages, prev + 1));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getPageIndicatorText = () => {
    if (!numPages) return '0 / 0';
    if (isBookMode) {
      const left = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
      const right = left + 1;
      return right <= numPages ? `${left}-${right} / ${numPages}` : `${left} / ${numPages}`;
    }
    return `${currentPage} / ${numPages}`;
  };

  const leftPage = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
  const rightPage = leftPage + 1;

  return (
    <main className="preview-container w-full" ref={containerRef}>
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <div className="toolbar md:px-6" ref={toolbarRef}>
        <div className="toolbar-info flex items-center gap-2">
          {pdfDoc && (
            <button 
              className={`toolbar-btn sidebar-toggle-btn ${isSidebarOpen ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title="Toggle Settings"
            >
              <Menu size={18} />
            </button>
          )}
          <span className="page-indicator font-mono text-xs hidden md:block">
            {getPageIndicatorText()}
          </span>
        </div>
        
        <div className="toolbar-controls flex items-center gap-1.5">
          {/* Before/After Split Wiper Button */}
          <button 
            className={`toolbar-btn px-2.5 flex items-center gap-1.5 text-xs font-mono border ${isWiperActive ? 'bg-blue-600 text-white border-blue-400' : 'border-slate-700 text-blue-300 hover:bg-slate-800'}`}
            onClick={() => setIsWiperActive(!isWiperActive)}
            title="Compare Original vs Smart Dark Theme in real time"
            disabled={isProcessing || selectedTheme === 'normal'}
          >
            <Columns size={14} />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button 
            className={`toolbar-btn hidden md:flex ${isContinuous ? 'active' : ''}`}
            onClick={() => { setIsContinuous(!isContinuous); setIsBookMode(false); }}
            title="Switch Scroll Mode"
            disabled={isProcessing}
          >
            <ScrollText size={16} />
          </button>

          <button 
            className={`toolbar-btn hidden md:flex ${isBookMode ? 'active' : ''}`}
            onClick={() => { setIsBookMode(!isBookMode); setIsContinuous(false); }}
            title="Switch Book Spread Mode"
            disabled={isProcessing}
          >
            <BookOpen size={16} />
          </button>

          <button className={`toolbar-btn ${isFullscreen ? 'active' : ''}`} onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>

          <div className="hidden md:block w-[1px] h-5 bg-slate-800 mx-1" />

          {!isContinuous && (
            <>
              <button className="toolbar-btn" disabled={currentPage <= 1 || isProcessing} onClick={handlePrevPage}>
                <ChevronLeft size={18} />
              </button>
              <button className="toolbar-btn" disabled={currentPage >= numPages || isProcessing} onClick={handleNextPage}>
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <button className="toolbar-btn" disabled={zoom <= 0.25 || isProcessing} onClick={() => setZoom(z => Math.max(0.25, z - 0.25))}>
            <ZoomOut size={18} />
          </button>
          <span className="zoom-indicator text-xs font-mono">{Math.round(zoom * 100)}%</span>
          <button className="toolbar-btn" disabled={zoom >= 3.0 || isProcessing} onClick={() => setZoom(z => Math.min(3.0, z + 0.25))}>
            <ZoomIn size={18} />
          </button>

          <button className="toolbar-btn text-rose-500 ml-2" onClick={clearFile} title="Close PDF">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="viewer-panel block pt-[var(--toolbar-height,56px)]">
        <div ref={viewerPanelRef} className="flex flex-col items-center w-full min-h-full overflow-y-auto">
          {isContinuous ? (
            Array.from({ length: numPages }, (_, i) => i + 1).map((pageNo) => (
              <PDFPageCanvas
                key={pageNo}
                pdfDoc={pdfDoc}
                pageNum={pageNo}
                zoom={zoom}
                selectedTheme={selectedTheme}
                customTheme={customTheme}
                mode={mode}
                brightness={brightness}
                contrast={contrast}
                boldness={boldness}
                themeStrength={themeStrength}
                adaptiveThreshold={adaptiveThreshold}
                isWiperActive={isWiperActive}
              />
            ))
          ) : isBookMode ? (
            <div className="book-layout flex gap-6 justify-center w-full p-4">
              <PDFPageCanvas
                pdfDoc={pdfDoc}
                pageNum={leftPage}
                zoom={zoom}
                selectedTheme={selectedTheme}
                customTheme={customTheme}
                mode={mode}
                brightness={brightness}
                contrast={contrast}
                boldness={boldness}
                themeStrength={themeStrength}
                adaptiveThreshold={adaptiveThreshold}
                isWiperActive={isWiperActive}
              />
              {rightPage <= numPages && (
                <PDFPageCanvas
                  pdfDoc={pdfDoc}
                  pageNum={rightPage}
                  zoom={zoom}
                  selectedTheme={selectedTheme}
                  customTheme={customTheme}
                  mode={mode}
                  brightness={brightness}
                  contrast={contrast}
                  boldness={boldness}
                  themeStrength={themeStrength}
                  adaptiveThreshold={adaptiveThreshold}
                  isWiperActive={isWiperActive}
                />
              )}
            </div>
          ) : (
            <PDFPageCanvas
              pdfDoc={pdfDoc}
              pageNum={currentPage}
              zoom={zoom}
              selectedTheme={selectedTheme}
              customTheme={customTheme}
              mode={mode}
              brightness={brightness}
              contrast={contrast}
              boldness={boldness}
              themeStrength={themeStrength}
              adaptiveThreshold={adaptiveThreshold}
              isWiperActive={isWiperActive}
            />
          )}
        </div>
      </div>
    </main>
  );
}
