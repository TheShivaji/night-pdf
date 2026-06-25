import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import EmptyStateHero from './components/EmptyStateHero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { loadPdfDocument, convertPdfTheme, getPdfOutline } from './utils/pdfProcessor';
import { saveRecentFile, updateLastReadPage, getRecentFiles, deleteRecentFile } from './utils/db';

// Import core pages
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import BlogListing from './pages/BlogListing';

// Import blog articles
import HowToReadPdfAtNight from './pages/blog/HowToReadPdfAtNight';
import BestPdfDarkModeTools from './pages/blog/BestPdfDarkModeTools';
import AmoledVsSepia from './pages/blog/AmoledVsSepia';
import ReduceEyeStrain from './pages/blog/ReduceEyeStrain';
import ConvertPdfOnMobile from './pages/blog/ConvertPdfOnMobile';
import DarkModeVsLightMode from './pages/blog/DarkModeVsLightMode';
import ReadApiDocumentationDarkMode from './pages/blog/ReadApiDocumentationDarkMode';

function ReaderWorkspace() {
  // File & Document States
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomMode, setZoomMode] = useState(() => loadSetting('zoomMode', 'fit-width'));
  const [zoom, setZoom] = useState(() => loadSetting('zoom', 1.0));

  // Configuration States
  function loadSetting(key, defaultVal) {
    try {
      const stored = localStorage.getItem('nightpdf_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[key] !== undefined) return parsed[key];
      }
    } catch (e) {}
    // Additional safety wrapper for defaultVal execution if it's a function
    return typeof defaultVal === 'function' ? defaultVal() : defaultVal;
  };

  const [selectedTheme, setSelectedTheme] = useState(() => loadSetting('selectedTheme', 'dark'));
  const [customTheme, setCustomTheme] = useState({
    bgHex: '#1a1a1a',
    fgHex: '#f3f4f6',
    bg: { r: 26, g: 26, b: 26 },
    fg: { r: 243, g: 244, b: 246 }
  });
  const [mode, setMode] = useState(() => loadSetting('mode', 'smart')); 
  const [quality, setQuality] = useState(2.0); 
  const [brightness, setBrightness] = useState(() => loadSetting('brightness', 0)); 
  const [contrast, setContrast] = useState(() => loadSetting('contrast', 0)); 
  const [boldness, setBoldness] = useState(() => loadSetting('boldness', 0)); 


  // Download settings
  const [downloadMode, setDownloadMode] = useState('all'); // 'all' | 'range'
  const [pagesToConvertStr, setPagesToConvertStr] = useState('');

  // Book & Fullscreen view modes
  const [isBookMode, setIsBookMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => loadSetting('isFullscreen', false));

  // UI Flow States
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => loadSetting('isSidebarOpen', window.innerWidth > 768));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [recentFiles, setRecentFiles] = useState([]);
  const [outline, setOutline] = useState([]);

  // Save Settings
  useEffect(() => {
    try {
      localStorage.setItem('nightpdf_settings', JSON.stringify({
        selectedTheme, mode, brightness, contrast, boldness,
        zoomMode, zoom, isSidebarOpen, isFullscreen
      }));
    } catch (e) {}
  }, [selectedTheme, mode, brightness, contrast, boldness, zoomMode, zoom, isSidebarOpen, isFullscreen]);

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

  // 3. Auto-collapse sidebar on fullscreen
  useEffect(() => {
    if (isFullscreen && !isMobile) {
      setIsSidebarOpen(false);
    } else if (!isFullscreen && !isMobile) {
      setIsSidebarOpen(true);
    }
  }, [isFullscreen, isMobile]);

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

  // 5. Session Recovery Handler (Safety wrapped)
  const handleResumeSession = async (recentFileRecord) => {
    try {
      if (!recentFileRecord || !recentFileRecord.data) {
        throw new Error('No valid PDF data found for resume.');
      }
      
      // Reconstruct File object from ArrayBuffer
      const reconstructedFile = new File([recentFileRecord.data], recentFileRecord.name, {
        type: 'application/pdf',
        lastModified: recentFileRecord.lastReadTime || Date.now()
      });
      
      // Process it normally, jumping to the saved page
      await processUploadedFile(reconstructedFile, recentFileRecord.currentPage || 1);
    } catch (err) {
      console.warn('Failed to resume session safely. Falling back to normal upload experience.', err);
      // Remove corrupted entry and hide resume card without blocking UI
      if (recentFileRecord?.id) handleDeleteRecent(recentFileRecord.id);
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
    <>
      {!pdfDoc ? (
        <div className="flex flex-col min-h-screen bg-black text-white w-full">
          <Navbar />
          <EmptyStateHero 
            onFileSelected={processUploadedFile} 
            errorMsg={errorMsg} 
            recentFiles={recentFiles} 
            onDeleteRecent={handleDeleteRecent}
            onResumeSession={handleResumeSession} 
          />
          <Footer />
        </div>
      ) : (
        <div className={`app-container ${isFullscreen ? 'zen-mode' : ''}`}>
          {/* Mobile Sidebar Overlay */}
          {isMobile && isSidebarOpen && pdfDoc && (
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
            recentFiles={recentFiles}
            onDeleteRecent={handleDeleteRecent}
            onFileSelected={processUploadedFile}
          />

          {/* Right Main Viewer Pane */}
          <PDFViewer
            pdfDoc={pdfDoc}
            numPages={numPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            zoom={zoom}
            setZoom={setZoom}
            zoomMode={zoomMode}
            setZoomMode={setZoomMode}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
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
      )}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Main App Reader Workspace */}
          <Route path="/" element={<ReaderWorkspace />} />

          {/* SaaS Core Pages */}
          <Route path="/faq" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><FAQPage /><Footer /></div>} />
          <Route path="/privacy-policy" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><PrivacyPolicy /><Footer /></div>} />
          <Route path="/terms" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><TermsOfService /><Footer /></div>} />
          <Route path="/blog" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><BlogListing /><Footer /></div>} />

          {/* Static Blog Posts */}
          <Route path="/blog/how-to-read-pdf-at-night" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><HowToReadPdfAtNight /><Footer /></div>} />
          <Route path="/blog/best-pdf-dark-mode-tools" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><BestPdfDarkModeTools /><Footer /></div>} />
          <Route path="/blog/amoled-vs-sepia" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><AmoledVsSepia /><Footer /></div>} />
          <Route path="/blog/reduce-eye-strain-while-reading-pdf" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><ReduceEyeStrain /><Footer /></div>} />
          <Route path="/blog/convert-pdf-to-dark-mode-on-mobile" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><ConvertPdfOnMobile /><Footer /></div>} />
          <Route path="/blog/dark-mode-vs-light-mode-reading" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><DarkModeVsLightMode /><Footer /></div>} />
          <Route path="/blog/read-api-documentation-pdf-dark-mode" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><ReadApiDocumentationDarkMode /><Footer /></div>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
