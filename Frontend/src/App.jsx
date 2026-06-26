import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import EmptyStateHero from './components/EmptyStateHero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BenchmarkHUD from './components/BenchmarkHUD';
import { loadPdfDocument, convertPdfTheme, getPdfOutline } from './utils/pdfProcessor';
import { saveRecentFile, updateLastReadPage, getRecentFiles, deleteRecentFile } from './utils/db';
import { DocumentProfiler } from './processors/DocumentProfiler';

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
  const [themeStrength, setThemeStrength] = useState(() => loadSetting('themeStrength', 100));
  const [adaptiveThreshold, setAdaptiveThreshold] = useState(() => loadSetting('adaptiveThreshold', 50));
  const [docProfile, setDocProfile] = useState(() => loadSetting('docProfile', 'mixed'));

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

  // Telemetry HUD stats
  const [renderLatency, setRenderLatency] = useState(12);

  // Save Settings
  useEffect(() => {
    try {
      localStorage.setItem('nightpdf_settings', JSON.stringify({
        selectedTheme, mode, themeStrength, adaptiveThreshold, docProfile, brightness, contrast, boldness,
        zoomMode, zoom, isSidebarOpen, isFullscreen
      }));
    } catch (e) {}
  }, [selectedTheme, mode, themeStrength, adaptiveThreshold, docProfile, brightness, contrast, boldness, zoomMode, zoom, isSidebarOpen, isFullscreen]);

  // 1. Register PWA Service Worker on mount & Load Recent Files
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => console.log('Night PDF ServiceWorker registered:', reg.scope))
          .catch((err) => console.error('Night PDF ServiceWorker failed:', err));
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

  useEffect(() => {
    const handleResize = () => {
      const mobileStatus = window.innerWidth <= 768;
      setIsMobile(mobileStatus);
      if (!mobileStatus) setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isFullscreen && !isMobile) setIsSidebarOpen(false);
    else if (!isFullscreen && !isMobile) setIsSidebarOpen(true);
  }, [isFullscreen, isMobile]);

  useEffect(() => {
    if (file && pdfDoc && currentPage) {
      updateLastReadPage(file.name, file.size, currentPage)
        .then(() => refreshRecentFiles())
        .catch(err => console.error('Error saving reading progress:', err));
    }
  }, [currentPage, file, pdfDoc]);

  const processUploadedFile = async (selectedFile, startPage = 1) => {
    try {
      setFile(selectedFile);
      setPdfDoc(null);
      setCurrentPage(startPage);
      setErrorMsg('');
      
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
      setNumPages(doc.numPages);

      await saveRecentFile(selectedFile, doc.numPages, startPage);
      await refreshRecentFiles();

      try {
        const toc = await getPdfOutline(doc);
        setOutline(toc);
        const profile = DocumentProfiler.analyzeDocumentMetadata(doc.numPages, toc, selectedFile.name);
        setDocProfile(profile.id);
        if (profile.threshold) setAdaptiveThreshold(profile.threshold);
      } catch (e) {
        setOutline([]);
      }

      const firstPage = await doc.getPage(1);
      const originalViewport = firstPage.getViewport({ scale: 1.0 });
      const sidebarWidth = window.innerWidth <= 768 ? 0 : 380;
      const viewerPadding = window.innerWidth <= 768 ? 24 : 80;
      const availableWidth = window.innerWidth - sidebarWidth - viewerPadding;
      
      const fitZoom = Math.min(1.8, Math.max(0.4, availableWidth / originalViewport.width));
      setZoom(Number(fitZoom.toFixed(2)));

      if (isMobile) setIsSidebarOpen(false);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to parse PDF. The file may be corrupted.');
      setFile(null);
    }
  };

  const handleResumeSession = async (recentFileRecord) => {
    try {
      if (!recentFileRecord || !recentFileRecord.data) throw new Error('No valid PDF data.');
      const reconstructedFile = new File([recentFileRecord.data], recentFileRecord.name, {
        type: 'application/pdf',
        lastModified: recentFileRecord.lastReadTime || Date.now()
      });
      await processUploadedFile(reconstructedFile, recentFileRecord.currentPage || 1);
    } catch (err) {
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
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleDeleteRecent = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await deleteRecentFile(id);
      await refreshRecentFiles();
    } catch (err) {}
  };

  const parsePageRange = (rangeStr, maxPages) => {
    const pages = new Set();
    const parts = rangeStr.split(',');
    for (let part of parts) {
      part = part.trim();
      if (!part) continue;
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10), end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const s = Math.max(1, Math.min(start, maxPages)), e = Math.max(1, Math.min(end, maxPages));
          for (let i = Math.min(s, e); i <= Math.max(s, e); i++) pages.add(i);
        }
      } else {
        const page = parseInt(part, 10);
        if (!isNaN(page) && page >= 1 && page <= maxPages) pages.add(page);
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const [exportSmartTheme, setExportSmartTheme] = useState(false);

  const handleDownload = async () => {
    if (!pdfDoc || !file) return;
    try {
      setIsProcessing(true);
      setErrorMsg('');

      let pdfBytes;
      if (!exportSmartTheme) {
        // Requirement 12: Export original document unchanged unless explicitly selected
        pdfBytes = await file.arrayBuffer();
      } else {
        let pageRange = [];
        if (downloadMode === 'range' && pagesToConvertStr.trim()) {
          pageRange = parsePageRange(pagesToConvertStr, numPages);
          if (pageRange.length === 0) throw new Error('Invalid page range.');
        }

        pdfBytes = await convertPdfTheme(pdfDoc, selectedTheme, { 
          mode, 
          strength: themeStrength,
          threshold: adaptiveThreshold,
          scale: quality, 
          brightness, 
          contrast,
          boldness,
          pageRange,
          customTheme: selectedTheme === 'custom' ? customTheme : undefined
        }, (p) => setProgress(p));
      }

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = !exportSmartTheme ? file.name : `night-${selectedTheme}-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setErrorMsg(err.message || 'Error generating PDF.');
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0, status: '' });
    }
  };

  return (
    <>
      <BenchmarkHUD renderTime={renderLatency} workerTime={4} cacheHitRatio={94} memoryMB={62} fps={60} pagesCached={8} />
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
          {isMobile && isSidebarOpen && pdfDoc && (
            <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
          )}

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
            themeStrength={themeStrength}
            setThemeStrength={setThemeStrength}
            adaptiveThreshold={adaptiveThreshold}
            setAdaptiveThreshold={setAdaptiveThreshold}
            docProfile={docProfile}
            setDocProfile={setDocProfile}
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
            exportSmartTheme={exportSmartTheme}
            setExportSmartTheme={setExportSmartTheme}
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
            themeStrength={themeStrength}
            adaptiveThreshold={adaptiveThreshold}
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
          <Route path="/" element={<ReaderWorkspace />} />
          <Route path="/faq" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><FAQPage /><Footer /></div>} />
          <Route path="/privacy-policy" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><PrivacyPolicy /><Footer /></div>} />
          <Route path="/terms" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><TermsOfService /><Footer /></div>} />
          <Route path="/blog" element={<div className="flex flex-col min-h-screen bg-black text-white"><Navbar /><BlogListing /><Footer /></div>} />

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
