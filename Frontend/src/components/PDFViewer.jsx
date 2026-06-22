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
  Minimize
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { applyThemeToImageData, THEME_PRESETS } from '../utils/themeEngine';
import { applyBoldingToCanvas } from '../utils/pdfProcessor';
import ShortcutsModal from './ShortcutsModal';

function PDFPageCanvas({ 
  pdfDoc, 
  pageNum, 
  zoom, 
  selectedTheme, 
  customTheme,
  mode, 
  brightness, 
  contrast,
  boldness
}) {
  const canvasRef = useRef(null);
  const textLayerRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 800 });
  const renderTaskRef = useRef(null);

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
      { rootMargin: '2000px 0px' } // Load pages 2000px ahead, unload when far away
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

  // 3. Render page (Double-buffered for no-flash, Retina DPR scaled)
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    let active = true;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (!active) return;

        const viewport = page.getViewport({ scale: zoom });
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // Cap at 2.5x for memory
        
        // Use detached offscreen canvas to prevent white flash during re-render
        const offscreenCanvas = document.createElement('canvas');
        const offCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = viewport.width * dpr;
        offscreenCanvas.height = viewport.height * dpr;

        // Scale context for Retina
        offCtx.scale(dpr, dpr);

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderContext = {
          canvasContext: offCtx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!active) return;

        // Apply filters directly to the offscreen canvas
        if (boldness > 0) {
          applyBoldingToCanvas(offscreenCanvas, boldness);
        }

        const isNormal = selectedTheme === 'normal';
        const hasAdjustments = brightness !== 0 || contrast !== 0;

        if (!isNormal || hasAdjustments || mode === 'original') {
          // Note: getImageData on Retina canvases is large, process full bounds
          const imgData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          applyThemeToImageData(imgData, selectedTheme, { 
            mode, 
            brightness, 
            contrast,
            customTheme 
          });
          offCtx.putImageData(imgData, 0, 0);
        }

        // Now swap the fully rendered buffer into the visible canvas
        const visibleCanvas = canvasRef.current;
        if (visibleCanvas && active) {
          visibleCanvas.width = offscreenCanvas.width;
          visibleCanvas.height = offscreenCanvas.height;
          visibleCanvas.style.width = `${viewport.width}px`;
          visibleCanvas.style.height = `${viewport.height}px`;
          const visibleCtx = visibleCanvas.getContext('2d');
          visibleCtx.drawImage(offscreenCanvas, 0, 0);
        }

        // Render Text Layer
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
  }, [isVisible, pdfDoc, pageNum, zoom, selectedTheme, customTheme, mode, brightness, contrast, boldness]);

  return (
    <div 
      ref={containerRef} 
      className="canvas-wrapper"
      style={{ 
        width: `${dimensions.width * zoom}px`,
        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        marginBottom: '20px',
        position: 'relative',
        margin: '0 auto 20px auto'
      }}
    >
      {isVisible ? (
        <>
          <canvas ref={canvasRef} className="viewer-canvas" />
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
  mode,
  brightness,
  contrast,
  boldness,
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
  const singleCanvasRef = useRef(null);
  const singleTextLayerRef = useRef(null);
  const singleRenderTaskRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(null);

  const toolbarRef = useRef(null);
  const containerRef = useRef(null);
  const viewerPanelRef = useRef(null);

  // Measure dynamic toolbar height to prevent overlap
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

  // 1. Fetch unscaled PDF width on load
  useEffect(() => {
    if (pdfDoc) {
      pdfDoc.getPage(1).then(page => {
        const vp = page.getViewport({ scale: 1.0 });
        setBaseWidth(vp.width);
      });
    }
  }, [pdfDoc]);

  // 2. Debounced Fit-to-Width & Safe Position Recalculation
  useEffect(() => {
    if (!isMobile || zoomMode !== 'fit-width' || !baseWidth) return;

    let rAF;
    const calculateMobileZoom = () => {
      // Pause if tab is hidden
      if (document.visibilityState === 'hidden') return;
      
      const containerWidth = viewerPanelRef.current ? viewerPanelRef.current.clientWidth : window.innerWidth;
      const targetWidth = containerWidth - 16; // 8px padding per side
      let newZoom = targetWidth / baseWidth;
      
      // Small PDF protection (max 2.0x scale)
      newZoom = Math.min(newZoom, 2.0);
      
      // Position Preservation: Cache scroll ratio
      const scrollRatio = window.scrollY / document.body.scrollHeight;
      
      setZoom(newZoom);
      
      // Restore position after render
      setTimeout(() => {
        window.scrollTo(0, scrollRatio * document.body.scrollHeight);
      }, 50);
    };

    // Calculate immediately on load
    calculateMobileZoom();

    const handleResize = () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(calculateMobileZoom);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('visibilitychange', calculateMobileZoom);
    
    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', calculateMobileZoom);
    };
  }, [isMobile, zoomMode, baseWidth, setZoom]);

  // Sync HTML5 Fullscreen state change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [setIsFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Keyboard Shortcuts (Reader Scoped)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable
      ) {
        return; // Ignore if typing
      }

      switch (e.key) {
        case 't':
        case 'T':
          if (setSelectedTheme) {
            const themeKeys = Object.keys(THEME_PRESETS);
            const currentIndex = themeKeys.indexOf(selectedTheme === 'custom' ? 'dark' : selectedTheme);
            const nextIndex = (currentIndex + 1) % themeKeys.length;
            setSelectedTheme(themeKeys[nextIndex]);
          }
          break;
        case '+':
        case '=':
          setZoom(z => Math.min(z + 0.1, 5.0));
          break;
        case '-':
          setZoom(z => Math.max(z - 0.1, 0.5));
          break;
        case 'ArrowRight':
          setCurrentPage(p => Math.min(p + 1, numPages));
          break;
        case 'ArrowLeft':
          setCurrentPage(p => Math.max(p - 1, 1));
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case '?':
          setIsShortcutsOpen(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages, selectedTheme, setSelectedTheme, setCurrentPage, setZoom]);

  // Calculate pages for Book Mode (spread double pages)
  const leftPage = currentPage % 2 !== 0 ? currentPage : currentPage - 1;
  const rightPage = leftPage + 1;

  // Single Page Mode: Render active page and text layer to canvas
  useEffect(() => {
    if (!pdfDoc || isContinuous || isBookMode) return;

    let active = true;

    const renderSinglePage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        if (!active) return;

        const viewport = page.getViewport({ scale: zoom });
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // Retina cap
        
        const offscreenCanvas = document.createElement('canvas');
        const offCtx = offscreenCanvas.getContext('2d');
        offscreenCanvas.width = viewport.width * dpr;
        offscreenCanvas.height = viewport.height * dpr;
        offCtx.scale(dpr, dpr);

        if (singleRenderTaskRef.current) {
          singleRenderTaskRef.current.cancel();
        }

        const renderContext = {
          canvasContext: offCtx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        singleRenderTaskRef.current = renderTask;

        await renderTask.promise;
        if (!active) return;

        if (boldness > 0) {
          applyBoldingToCanvas(offscreenCanvas, boldness);
        }

        const isNormal = selectedTheme === 'normal';
        const hasAdjustments = brightness !== 0 || contrast !== 0;

        if (!isNormal || hasAdjustments || mode === 'original') {
          const imgData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
          applyThemeToImageData(imgData, selectedTheme, { 
            mode, 
            brightness, 
            contrast,
            customTheme
          });
          offCtx.putImageData(imgData, 0, 0);
        }

        const visibleCanvas = singleCanvasRef.current;
        if (visibleCanvas && active) {
          visibleCanvas.width = offscreenCanvas.width;
          visibleCanvas.height = offscreenCanvas.height;
          visibleCanvas.style.width = `${viewport.width}px`;
          visibleCanvas.style.height = `${viewport.height}px`;
          const visibleCtx = visibleCanvas.getContext('2d');
          visibleCtx.drawImage(offscreenCanvas, 0, 0);
        }

        const textContent = await page.getTextContent();
        const textLayerDiv = singleTextLayerRef.current;
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
      } catch (err) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Single page render error:', err);
        }
      }
    };

    renderSinglePage();

    return () => {
      active = false;
      if (singleRenderTaskRef.current) {
        singleRenderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, currentPage, zoom, selectedTheme, customTheme, mode, brightness, contrast, boldness, isContinuous, isBookMode]);

  // Adjust pagination buttons for different viewing layouts
  const handlePrevPage = () => {
    if (isBookMode) {
      setCurrentPage(prev => Math.max(1, prev - 2));
    } else {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    if (isBookMode) {
      setCurrentPage(prev => {
        const isLeftOdd = prev % 2 !== 0;
        const currentLeft = isLeftOdd ? prev : prev - 1;
        return Math.min(numPages, currentLeft + 2);
      });
    } else {
      setCurrentPage(prev => Math.min(numPages, prev + 1));
    }
  };

  const getPageIndicatorText = () => {
    if (isContinuous) return `All Pages (${numPages})`;
    if (isBookMode) {
      return rightPage <= numPages 
        ? `Pages ${leftPage}-${rightPage} of ${numPages}` 
        : `Page ${leftPage} of ${numPages}`;
    }
    return `Page ${currentPage} of ${numPages}`;
  };



  const lastTapRef = useRef(0);
  const handleDoubleTap = () => {
    if (!isMobile) return;
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      if (zoomMode === 'fit-width' && zoom < 1.5) {
        setZoom(1.5);
        if (setZoomMode) setZoomMode('manual');
      } else {
        if (setZoomMode) setZoomMode('fit-width');
        // The calculateMobileZoom effect will run because zoomMode changed
      }
    }
    lastTapRef.current = now;
  };

  return (
    <main className="preview-container" ref={containerRef}>
      {/* Top Controls Toolbar */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
      <div className="toolbar px-4 md:px-6" ref={toolbarRef}>
        <div className="toolbar-info">
          {pdfDoc && (
            <button 
              className={`toolbar-btn sidebar-toggle-btn ${isSidebarOpen ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(prev => !prev)}
              title="Toggle Settings"
            >
              <Menu size={18} />
            </button>
          )}
          
          <span className="page-indicator hidden md:block">
            {getPageIndicatorText()}
          </span>
        </div>
        
        <div className="toolbar-controls">
            {/* Toggle Scroll Mode (Hidden on mobile) */}
            <button 
              className={`toolbar-btn hidden md:flex ${isContinuous ? 'active' : ''}`}
              onClick={() => {
                setIsContinuous(prev => !prev);
                setIsBookMode(false);
              }}
              title={isContinuous ? "Switch to Page Mode" : "Switch to Scroll Mode"}
              disabled={isProcessing}
            >
              <ScrollText size={16} />
            </button>

            {/* Toggle Book Mode (Side by Side) (Hidden on mobile) */}
            <button 
              className={`toolbar-btn hidden md:flex ${isBookMode ? 'active' : ''}`}
              onClick={() => {
                setIsBookMode(prev => !prev);
                setIsContinuous(false);
              }}
              title={isBookMode ? "Switch to Single Page" : "Switch to Book Spread Mode"}
              disabled={isProcessing}
            >
              <BookOpen size={16} />
            </button>

            {/* Fullscreen toggle */}
            <button 
              className={`toolbar-btn ${isFullscreen ? 'active' : ''}`}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen Mode"}
              disabled={isProcessing}
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>

            <div className="hidden md:block" style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 4px' }} />

            {/* Pagination Controls */}
            {!isContinuous && (
              <>
                <button 
                  className="toolbar-btn" 
                  disabled={(isBookMode ? leftPage <= 1 : currentPage <= 1) || isProcessing}
                  onClick={handlePrevPage}
                  title="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="toolbar-btn" 
                  disabled={(isBookMode ? rightPage >= numPages : currentPage >= numPages) || isProcessing}
                  onClick={handleNextPage}
                  title="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="hidden md:block" style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 4px' }} />
              </>
            )}

            {/* Zoom Controls */}
            <button 
              className="toolbar-btn" 
              disabled={zoom <= 0.25 || isProcessing}
              onClick={() => {
                setZoom(prev => Math.max(0.25, prev - 0.25));
                if (setZoomMode) setZoomMode('manual');
              }}
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
            <button 
              className="toolbar-btn" 
              disabled={zoom >= 3.0 || isProcessing}
              onClick={() => {
                setZoom(prev => Math.min(3.0, prev + 0.25));
                if (setZoomMode) setZoomMode('manual');
              }}
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 4px' }} />

            {/* Close PDF */}
            <button 
              className="toolbar-btn close-doc-btn" 
              onClick={clearFile}
              title="Close PDF"
              disabled={isProcessing}
              style={{ color: '#ef4444' }}
            >
              <X size={18} />
            </button>
          </div>
      </div>

      {/* Viewer Panel */}
      <div 
        className="viewer-panel" 
        style={{ 
          display: 'block',
          paddingTop: 'var(--toolbar-height, 56px)' 
        }}
        onTouchEnd={handleDoubleTap}
      >
          <div 
            ref={viewerPanelRef}
            style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            minHeight: '100%',
            overflowY: 'auto' 
          }}>
            {isContinuous ? (
              // Continuous Scroll View
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
                />
              ))
            ) : isBookMode ? (
              // Book Spread View (Side-by-side double canvases)
              <div className="book-layout" style={{ display: 'flex', gap: '20px', justifyContent: 'center', width: '100%', padding: '10px' }}>
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
                  />
                )}
              </div>
            ) : (
              // Single Page View
              <div 
                className="canvas-wrapper" 
                style={{ 
                  position: 'relative', 
                  width: baseWidth ? `${baseWidth * zoom}px` : 'auto',
                  margin: '0 auto' 
                }}
              >
                <canvas ref={singleCanvasRef} className="viewer-canvas" />
                <div ref={singleTextLayerRef} className="textLayer" />
              </div>
            )}
          </div>
      </div>
    </main>
  );
}
