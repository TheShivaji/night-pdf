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
import { applyThemeToImageData } from '../utils/themeEngine';
import { applyBoldingToCanvas } from '../utils/pdfProcessor';

// Helper component for Lazy Rendering a Single Page in Continuous Scroll / Book Mode
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
    return () => {
      active = false;
    };
  }, [pdfDoc, pageNum]);

  // 2. Setup intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: '400px' } // Load pages 400px ahead
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // 3. Render page and text layer when visible
  useEffect(() => {
    if (!isVisible) return;

    let active = true;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (!active) return;

        const viewport = page.getViewport({ scale: zoom });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;

        if (!active) return;

        // Apply text bolding (dilation) on original page render if specified
        if (boldness > 0) {
          applyBoldingToCanvas(canvas, boldness);
        }

        // Apply theme/contrast/brightness adjustments
        const isNormal = selectedTheme === 'normal';
        const hasAdjustments = brightness !== 0 || contrast !== 0;

        if (!isNormal || hasAdjustments || mode === 'original') {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          applyThemeToImageData(imgData, selectedTheme, { 
            mode, 
            brightness, 
            contrast,
            customTheme 
          });
          ctx.putImageData(imgData, 0, 0);
        }

        // Render Text Layer for copy-paste & native search selection
        const textContent = await page.getTextContent();
        const textLayerDiv = textLayerRef.current;
        if (textLayerDiv) {
          textLayerDiv.innerHTML = '';
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
        width: '100%',
        maxWidth: `${dimensions.width * zoom}px`,
        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        marginBottom: '20px',
        position: 'relative'
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
  selectedTheme,
  customTheme,
  mode,
  brightness,
  contrast,
  boldness,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile,
  isProcessing,
  onFileSelected,
  clearFile,
  errorMsg,
  recentFiles,
  onDeleteRecent,
  isBookMode,
  setIsBookMode,
  isFullscreen,
  setIsFullscreen
}) {
  const [isContinuous, setIsContinuous] = useState(false);
  const singleCanvasRef = useRef(null);
  const singleTextLayerRef = useRef(null);
  const singleRenderTaskRef = useRef(null);

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
        const canvas = singleCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (singleRenderTaskRef.current) {
          singleRenderTaskRef.current.cancel();
        }

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        singleRenderTaskRef.current = renderTask;

        await renderTask.promise;

        if (!active) return;

        // Apply text bolding (dilation) on original page render if specified
        if (boldness > 0) {
          applyBoldingToCanvas(canvas, boldness);
        }

        // Apply theme/contrast/brightness adjustments
        const isNormal = selectedTheme === 'normal';
        const hasAdjustments = brightness !== 0 || contrast !== 0;

        if (!isNormal || hasAdjustments || mode === 'original') {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          applyThemeToImageData(imgData, selectedTheme, { 
            mode, 
            brightness, 
            contrast,
            customTheme
          });
          ctx.putImageData(imgData, 0, 0);
        }

        // Render Text Layer in Single Page Mode
        const textContent = await page.getTextContent();
        const textLayerDiv = singleTextLayerRef.current;
        if (textLayerDiv) {
          textLayerDiv.innerHTML = '';
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

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 KB';
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <main className="preview-container">
      {/* Viewer Toolbar */}
      <div className="preview-toolbar">
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
          
          <span className="page-indicator">
            {getPageIndicatorText()}
          </span>
        </div>
        
        <div className="toolbar-controls">
            {/* Toggle Scroll Mode */}
            <button 
              className={`toolbar-btn ${isContinuous ? 'active' : ''}`}
              onClick={() => {
                setIsContinuous(prev => !prev);
                setIsBookMode(false); // turn off conflicting book mode
              }}
              title={isContinuous ? "Switch to Page Mode" : "Switch to Scroll Mode"}
              disabled={isProcessing}
            >
              <ScrollText size={16} />
            </button>

            {/* Toggle Book Mode (Side by Side) */}
            <button 
              className={`toolbar-btn ${isBookMode ? 'active' : ''}`}
              onClick={() => {
                setIsBookMode(prev => !prev);
                setIsContinuous(false); // turn off conflicting scroll mode
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

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 4px' }} />

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
                <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 4px' }} />
              </>
            )}

            {/* Zoom Controls */}
            <button 
              className="toolbar-btn" 
              disabled={zoom <= 0.25 || isProcessing}
              onClick={() => setZoom(prev => Math.max(0.25, prev - 0.25))}
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
            <button 
              className="toolbar-btn" 
              disabled={zoom >= 3.0 || isProcessing}
              onClick={() => setZoom(prev => Math.min(3.0, prev + 0.25))}
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
      <div className="viewer-panel" style={{ display: 'block' }}>
          <div style={{ 
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
              <div className="canvas-wrapper" style={{ position: 'relative' }}>
                <canvas ref={singleCanvasRef} className="viewer-canvas" />
                <div ref={singleTextLayerRef} className="textLayer" />
              </div>
            )}
          </div>
      </div>
    </main>
  );
}
