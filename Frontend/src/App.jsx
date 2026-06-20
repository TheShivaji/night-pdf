import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import { loadPdfDocument, convertPdfTheme, getPdfOutline } from './utils/pdfProcessor';
import { saveRecentFile, updateLastReadPage, getRecentFiles, deleteRecentFile } from './utils/db';

export default function App() {
  // File & Document States
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);

  // Configuration States
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [customTheme, setCustomTheme] = useState({
    bgHex: '#1a1a1a',
    fgHex: '#f3f4f6',
    bg: { r: 26, g: 26, b: 26 },
    fg: { r: 243, g: 244, b: 246 }
  });
  const [mode, setMode] = useState('smart'); // 'smart' | 'duotone' | 'original' (no-invert colors)
  const [quality, setQuality] = useState(2.0); // 1.0 = Normal, 2.0 = High, 3.0 = Super Crisp
  const [brightness, setBrightness] = useState(0); // -100 to 100
  const [contrast, setContrast] = useState(0); // -100 to 100
  const [boldness, setBoldness] = useState(0); // 0 to 2 (pixel offset)

  // Download settings
  const [downloadMode, setDownloadMode] = useState('all'); // 'all' | 'range'
  const [pagesToConvertStr, setPagesToConvertStr] = useState('');

  // Book & Fullscreen view modes
  const [isBookMode, setIsBookMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // UI Flow States
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [recentFiles, setRecentFiles] = useState([]);
  const [outline, setOutline] = useState([]);

  // 1. Register PWA Service Worker on mount & Load Recent Files
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => {
            console.log('Night PDF ServiceWorker registered successfully:', reg.scope);
          })
          .catch((err) => {
            console.error('Night PDF ServiceWorker registration failed:', err);
          });
      });
    }
    refreshRecentFiles();
  }, []);

  const refreshRecentFiles = async () => {
    try {
      const list = await getRecentFiles();
      setRecentFiles(list);
    } catch (err) {
      console.error('Failed to refresh recent files:', err);
    }
  };

  // 2. Handle responsive resizing transitions
  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth <= 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) {
        setIsSidebarOpen(true); // Always show settings on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Auto-save reading progress on page changes
  useEffect(() => {
    if (file && pdfDoc && currentPage) {
      updateLastReadPage(file.name, file.size, currentPage)
        .then(() => refreshRecentFiles())
        .catch(err => console.error('Error saving reading progress:', err));
    }
  }, [currentPage, file, pdfDoc]);

  // 4. File Loading Process
  const processUploadedFile = async (selectedFile, startPage = 1) => {
    try {
      setFile(selectedFile);
      setPdfDoc(null);
      setCurrentPage(startPage);
      setErrorMsg('');
      
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
      setNumPages(doc.numPages);

      // Save to IndexedDB recent files
      await saveRecentFile(selectedFile, doc.numPages, startPage);
      await refreshRecentFiles();

      // Load outline (TOC)
      try {
        const toc = await getPdfOutline(doc);
        setOutline(toc);
      } catch (e) {
        console.error('Failed to load outline:', e);
        setOutline([]);
      }

      // Dynamically calculate initial fit-to-width zoom based on viewport dimensions
      const firstPage = await doc.getPage(1);
      const originalViewport = firstPage.getViewport({ scale: 1.0 });
      const sidebarWidth = window.innerWidth <= 768 ? 0 : 380;
      const viewerPadding = window.innerWidth <= 768 ? 24 : 80;
      const availableWidth = window.innerWidth - sidebarWidth - viewerPadding;
      
      const fitZoom = Math.min(1.8, Math.max(0.4, availableWidth / originalViewport.width));
      setZoom(Number(fitZoom.toFixed(2)));

      // On mobile, close sidebar after upload so they can immediately read
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to parse PDF. The file may be corrupted.');
      setFile(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPdfDoc(null);
    setNumPages(0);
    setCurrentPage(1);
    setZoom(1.0);
    setErrorMsg('');
    setBrightness(0);
    setContrast(0);
    setBoldness(0);
    setOutline([]);
    refreshRecentFiles();
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar drawer on mobile
    }
  };

  const handleDeleteRecent = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await deleteRecentFile(id);
      await refreshRecentFiles();
    } catch (err) {
      console.error('Failed to delete recent file:', err);
    }
  };

  // Helper: parse custom page range string (e.g. "1-5, 8, 11-15")
  const parsePageRange = (rangeStr, maxPages) => {
    const pages = new Set();
    const parts = rangeStr.split(',');
    for (let part of parts) {
      part = part.trim();
      if (!part) continue;
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const s = Math.max(1, Math.min(start, maxPages));
          const e = Math.max(1, Math.min(end, maxPages));
          const min = Math.min(s, e);
          const max = Math.max(s, e);
          for (let i = min; i <= max; i++) {
            pages.add(i);
          }
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page) && page >= 1 && page <= maxPages) {
          pages.add(page);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  // 5. Handle PDF Conversion & Download compilation
  const handleDownload = async () => {
    if (!pdfDoc || !file) return;

    try {
      setIsProcessing(true);
      setErrorMsg('');

      let pageRange = [];
      if (downloadMode === 'range' && pagesToConvertStr.trim()) {
        pageRange = parsePageRange(pagesToConvertStr, numPages);
        if (pageRange.length === 0) {
          throw new Error('Invalid page range entered. Use format like: 1-5, 8, 11-15');
        }
      }

      const pdfBytes = await convertPdfTheme(
        pdfDoc, 
        selectedTheme, 
        { 
          mode, 
          scale: quality, 
          brightness, 
          contrast,
          boldness,
          pageRange,
          customTheme: selectedTheme === 'custom' ? customTheme : undefined
        },
        (p) => setProgress(p)
      );

      // Trigger standard browser download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const themeName = selectedTheme === 'custom' ? 'custom' : selectedTheme;
      link.download = `night-${themeName}-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Processing error:', err);
      setErrorMsg(err.message || 'Error generating themed PDF. Try lowering download quality.');
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0, status: '' });
    }
  };

  return (
    <div className={`app-container ${isFullscreen ? 'zen-mode' : ''}`}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Left Sidebar Config Panel */}
      <Sidebar
        file={file}
        pdfDoc={pdfDoc}
        numPages={numPages}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        customTheme={customTheme}
        setCustomTheme={setCustomTheme}
        mode={mode}
        setMode={setMode}
        quality={quality}
        setQuality={setQuality}
        brightness={brightness}
        setBrightness={setBrightness}
        contrast={contrast}
        setContrast={setContrast}
        boldness={boldness}
        setBoldness={setBoldness}
        isProcessing={isProcessing}
        progress={progress}
        clearFile={clearFile}
        handleDownload={handleDownload}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
        downloadMode={downloadMode}
        setDownloadMode={setDownloadMode}
        pagesToConvertStr={pagesToConvertStr}
        setPagesToConvertStr={setPagesToConvertStr}
        outline={outline}
        setCurrentPage={setCurrentPage}
      />

      {/* Right Main Viewer Pane / Centered Drag-Drop Box */}
      <PDFViewer
        pdfDoc={pdfDoc}
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        zoom={zoom}
        setZoom={setZoom}
        selectedTheme={selectedTheme}
        customTheme={customTheme}
        mode={mode}
        brightness={brightness}
        contrast={contrast}
        boldness={boldness}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isMobile={isMobile}
        isProcessing={isProcessing}
        onFileSelected={processUploadedFile}
        clearFile={clearFile}
        errorMsg={errorMsg}
        recentFiles={recentFiles}
        onDeleteRecent={handleDeleteRecent}
        isBookMode={isBookMode}
        setIsBookMode={setIsBookMode}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />
    </div>
  );
}
