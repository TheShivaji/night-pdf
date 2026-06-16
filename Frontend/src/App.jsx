import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import { loadPdfDocument, convertPdfTheme } from './utils/pdfProcessor';

export default function App() {
  // File & Document States
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);

  // Configuration States
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [mode, setMode] = useState('smart'); // 'smart' | 'duotone' | 'original' (no-invert colors)
  const [quality, setQuality] = useState(2.0); // 1.0 = Normal, 2.0 = High, 3.0 = Super Crisp
  const [brightness, setBrightness] = useState(0); // -100 to 100
  const [contrast, setContrast] = useState(0); // -100 to 100
  const [boldness, setBoldness] = useState(0); // 0 to 2 (pixel offset)

  // UI Flow States
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, status: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Register PWA Service Worker on mount
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
  }, []);

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

  // 3. File Loading Process
  const processUploadedFile = async (selectedFile) => {
    try {
      setFile(selectedFile);
      setPdfDoc(null);
      setCurrentPage(1);
      setErrorMsg('');
      
      const doc = await loadPdfDocument(selectedFile);
      setPdfDoc(doc);
      setNumPages(doc.numPages);

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
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar drawer on mobile
    }
  };

  // 4. Handle PDF Conversion & Download compilation
  const handleDownload = async () => {
    if (!pdfDoc || !file) return;

    try {
      setIsProcessing(true);
      setErrorMsg('');

      const pdfBytes = await convertPdfTheme(
        pdfDoc, 
        selectedTheme, 
        { 
          mode, 
          scale: quality, 
          brightness, 
          contrast,
          boldness
        },
        (p) => setProgress(p)
      );

      // Trigger standard browser download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `night-${selectedTheme}-${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error('Processing error:', err);
      setErrorMsg('Error generating themed PDF. Try lowering download quality.');
    } finally {
      setIsProcessing(false);
      setProgress({ current: 0, total: 0, status: '' });
    }
  };

  return (
    <div className="app-container">
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
      />
    </div>
  );
}
