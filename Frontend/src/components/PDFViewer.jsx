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
  X
} from 'lucide-react';
import UploadZone from './UploadZone';
import { applyThemeToImageData } from '../utils/themeEngine';
import { applyBoldingToCanvas } from '../utils/pdfProcessor';

// Helper component for Lazy Rendering a Single Page in Continuous Scroll Mode
function PDFPageCanvas({ 
  pdfDoc, 
  pageNum, 
  zoom, 
  selectedTheme, 
  mode, 
  brightness, 
  contrast,
  boldness
}) {
  const canvasRef = useRef(null);
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

  // 3. Render page when visible
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
          applyThemeToImageData(imgData, selectedTheme, { mode, brightness, contrast });
          ctx.putImageData(imgData, 0, 0);
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
  }, [isVisible, pdfDoc, pageNum, zoom, selectedTheme, mode, brightness, contrast, boldness]);

  return (
    <div 
      ref={containerRef} 
      className="canvas-wrapper"
      style={{ 
        width: '100%',
        maxWidth: `${dimensions.width * zoom}px`,
        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
        marginBottom: '20px'
      }}
    >
      {isVisible ? (
        <canvas ref={canvasRef} className="viewer-canvas" />
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
  errorMsg
}) {
  const [isContinuous, setIsContinuous] = useState(false);
  const singleCanvasRef = useRef(null);
  const singleRenderTaskRef = useRef(null);

  // Single Page Mode: Render active page to canvas
  useEffect(() => {
    if (!pdfDoc || isContinuous) return;

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
          applyThemeToImageData(imgData, selectedTheme, { mode, brightness, contrast });
          ctx.putImageData(imgData, 0, 0);
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
  }, [pdfDoc, currentPage, zoom, selectedTheme, mode, brightness, contrast, boldness, isContinuous]);

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
          
          {pdfDoc ? (
            <span className="page-indicator">
              {isContinuous ? `All Pages (${numPages})` : `Page ${currentPage} of ${numPages}`}
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="logo-icon">🌙</span>
              <span className="logo-text" style={{ fontSize: '16px' }}>Night PDF</span>
            </div>
          )}
        </div>
        
        {pdfDoc && (
          <div className="toolbar-controls">
            {/* Toggle Scroll Mode */}
            <button 
              className={`toolbar-btn ${isContinuous ? 'active' : ''}`}
              onClick={() => setIsContinuous(prev => !prev)}
              title={isContinuous ? "Switch to Page Mode" : "Switch to Scroll Mode"}
              disabled={isProcessing}
            >
              {isContinuous ? <BookOpen size={16} /> : <ScrollText size={16} />}
            </button>

            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-light)', margin: '0 4px' }} />

            {/* Pagination Controls (disabled in continuous mode) */}
            {!isContinuous && (
              <>
                <button 
                  className="toolbar-btn" 
                  disabled={currentPage <= 1 || isProcessing}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  title="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="toolbar-btn" 
                  disabled={currentPage >= numPages || isProcessing}
                  onClick={() => setCurrentPage(prev => Math.min(numPages, prev + 1))}
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

            {/* Close / Remove PDF Button directly in Viewer */}
            <button 
              className="toolbar-btn close-doc-btn" 
              onClick={clearFile}
              title="Close PDF / Upload New"
              disabled={isProcessing}
              style={{ color: '#ef4444' }}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Viewer Panel */}
      <div className="viewer-panel" style={{ display: pdfDoc ? 'block' : 'flex' }}>
        {pdfDoc ? (
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
                  mode={mode}
                  brightness={brightness}
                  contrast={contrast}
                  boldness={boldness}
                />
              ))
            ) : (
              // Single Page View
              <div className="canvas-wrapper">
                <canvas ref={singleCanvasRef} className="viewer-canvas" />
              </div>
            )}
          </div>
        ) : (
          <UploadZone onFileSelected={onFileSelected} errorMsg={errorMsg} />
        )}
      </div>
    </main>
  );
}
