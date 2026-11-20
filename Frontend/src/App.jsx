import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import EmptyStateHero from './components/EmptyStateHero';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { loadPdfDocument, convertPdfTheme, getPdfOutline } from './utils/pdfProcessor';
import { readSavedFile, saveRecentFile, updateLastReadPage, getRecentFiles, deleteRecentFile } from './utils/db';

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

const parsePageRange = (input, maxPage) => {
    const pages = new Set();
    for (const part of input.split(',')) {
      const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(part.trim());
      const first = Number(match?.[1]);
      const last = Number(match?.[2] ?? first);
      if (!match || first < 1 || last < first || last > maxPage) {
        throw new Error(`Invalid page range. Enter pages from 1 to ${maxPage}, such as 1 or 1-${maxPage}.`);
      }
      for (let page = first; page <= last; page++) pages.add(page);
    }
    return [...pages].sort((a, b) => a - b);
  };


function ReaderWorkspace() {
  const [settings, setSettings] = useState(() => {
    let old = {};
    try { old = JSON.parse(localStorage.getItem('nightpdf_settings')) || {}; }
    catch { /* Preferences are optional. */ }
    return {
      selectedTheme: old.mode === 'original' ? 'normal' : old.selectedTheme || 'dark',
      themeStrength: old.themeStrength ?? 100, brightness: old.brightness ?? 0,
      customTheme: old.customTheme || { bgHex: '#1a1a1a', fgHex: '#f3f4f6', bg: {r:26,g:26,b:26}, fg: {r:243,g:244,b:246} }
    };
  });
  useEffect(() => {
    try { localStorage.setItem('nightpdf_settings', JSON.stringify(settings)); }
    catch { /* Reading works with browser storage disabled. */ }
  }, [settings]);

  const [opened, setOpened] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [outline, setOutline] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const [savedId, setSavedId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);
  const [errorMsg, setErrorMsg] = useState('');
  const [opening, setOpening] = useState(false);
  const [progress, setProgress] = useState(null);
  const [exportSmartTheme, setExportSmartTheme] = useState(false);
  const [quality, setQuality] = useState(3);
  const [downloadMode, setDownloadMode] = useState('all');
  const [pagesToConvertStr, setPagesToConvertStr] = useState('');
  const session = useRef(0);
  const activeDoc = useRef(null);
  const exportJob = useRef(null);
  const historyRead = useRef(null);
  const rememberJob = useRef(null);
  const sessionKey = useRef(null);

  function releaseDocument() {
    session.current++;
    exportJob.current?.abort();
    exportJob.current = null;
    rememberJob.current = null;
    const previous = activeDoc.current;
    activeDoc.current = null;
    previous?.loadingTask.destroy().catch(error => console.warn('PDF cleanup:', error));
  }

  async function refreshHistory() {
    const read = Symbol();
    historyRead.current = read;
    const list = await getRecentFiles();
    if (historyRead.current === read) setRecentFiles(list);
  }
  useEffect(() => {
    refreshHistory();
    const media = window.matchMedia('(max-width: 768px)');
    const resize = () => { setIsMobile(media.matches); setIsSidebarOpen(!media.matches); };
    media.addEventListener('change', resize);
    return () => { media.removeEventListener('change', resize); releaseDocument(); historyRead.current = null; };
  }, []);

  useEffect(() => {
    if (!savedId) return;
    const owner = session.current;
    updateLastReadPage(savedId, currentPage).catch(() => {
      if (owner === session.current) setErrorMsg('Could not save your reading position. You can continue reading.');
    });
  }, [savedId, currentPage]);

  function clearFile() {
    releaseDocument();
    setOpened(null); setSavedId(null); setOutline([]); setErrorMsg('');
    setOpening(false); setProgress(null); setSaving(false); setCurrentPage(1);
    setDownloadMode('all'); setPagesToConvertStr('');
    void refreshHistory();
  }

  async function openFile(file, entry) {
    clearFile();
    const owner = session.current;
    setOpening(true);
    try {
      if (!file) {
        const data = await readSavedFile(entry.id);
        if (owner !== session.current) return;
        if (!data) throw new Error('Saved bytes are unavailable. Choose the original PDF.');
        file = new File([data], entry.name, { type: 'application/pdf' });
      }
      const doc = await loadPdfDocument(file);
      if (owner !== session.current) { await doc.loadingTask.destroy(); return; }
      activeDoc.current = doc;
      sessionKey.current = entry && !entry.isMetaOnly ? entry.id : null;
      setSavedId(entry && !entry.isMetaOnly ? entry.id : null);
      setCurrentPage(Math.min(doc.numPages, Math.max(1, Number(entry?.currentPage) || 1)));
      setOpened({ file, doc });
      setIsSidebarOpen(window.innerWidth > 768);
      getPdfOutline(doc).then(items => { if (session.current === owner) setOutline(items); });
    } catch (error) {
      if (owner === session.current) setErrorMsg(error.name === 'PasswordException'
        ? 'This PDF is password-protected. Open an unlocked copy.'
        : 'Could not open this PDF. Choose the original file or an undamaged copy.');
    } finally {
      if (owner === session.current) setOpening(false);
    }
  }

  async function remember() {
    if (!opened || rememberJob.current || savedId) return;
    const owner = session.current;
    rememberJob.current = owner;
    setSaving(true); setErrorMsg('');
    try {
      let key = sessionKey.current;
      if (!key) {
        const digest = await crypto.subtle.digest('SHA-256', await opened.file.arrayBuffer());
        key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
      }
      if (session.current !== owner) return;
      const id = await saveRecentFile(key, opened.file, opened.doc.numPages, currentPage);
      if (owner === session.current) setSavedId(id);
      await refreshHistory();
    } catch (error) {
      if (session.current === owner) setErrorMsg('Could not save this PDF on this device. ' + error.message);
    } finally {
      if (session.current === owner) { rememberJob.current = null; setSaving(false); }
    }
  }

  async function forget(entry) {
    const owner = session.current;
    try {
      await deleteRecentFile(entry);
      if (owner === session.current && entry.id === savedId) setSavedId(null);
      await refreshHistory();
    } catch (error) {
      if (session.current === owner) setErrorMsg('Could not forget this saved file. ' + error.message);
    }
  }

  async function handleDownload() {
    if (!opened || exportJob.current) return;
    const controller = new AbortController();
    exportJob.current = controller;
    const { signal } = controller;
    setErrorMsg('');
    try {
      let blob = opened.file;
      if (exportSmartTheme) {
        const pageRange = downloadMode === 'range' ? parsePageRange(pagesToConvertStr, opened.doc.numPages) : [];
        setProgress({ status: 'Preparing pages…' });
        const bytes = await convertPdfTheme(opened.doc, settings.selectedTheme, {
          strength: settings.themeStrength, brightness: settings.brightness, customTheme: settings.customTheme,
          scale: quality, pageRange, signal
        }, p => { if (!signal.aborted) setProgress(p); });
        signal.throwIfAborted();
        blob = new Blob([bytes], { type: 'application/pdf' });
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = exportSmartTheme ? `night-${settings.selectedTheme}-${opened.file.name}` : opened.file.name;
      document.body.appendChild(link);
      try { link.click(); } finally { link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
    } catch (error) {
      if (!signal.aborted) setErrorMsg(`Download failed. ${error.message}`);
    } finally {
      if (exportJob.current === controller) { exportJob.current = null; setProgress(null); }
    }
  }

  if (!opened) return <div className="flex min-h-screen flex-col bg-black text-white">
    <Navbar /><EmptyStateHero onFileSelected={openFile} opening={opening} errorMsg={errorMsg}
      recentFiles={recentFiles} onForget={forget} onResume={entry => openFile(null, entry)} /><Footer />
  </div>;

  return <div className="app-container">
    {isMobile && isSidebarOpen && <button aria-label="Close settings" className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}
    <Sidebar {...{ settings, setSettings, file: opened.file, numPages: opened.doc.numPages, savedId, saving, remember,
      outline, exportSmartTheme, setExportSmartTheme, downloadMode, setDownloadMode, quality, setQuality,
      pagesToConvertStr, setPagesToConvertStr, handleDownload, progress, isMobile, isSidebarOpen, errorMsg }}
      onForget={() => forget({ id: savedId })} onClose={() => setIsSidebarOpen(false)}
      onJump={page => { setCurrentPage(page); if (isMobile) setIsSidebarOpen(false); }}
      onCancel={() => { exportJob.current?.abort(); setProgress({ status: 'Cancelling…' }); }} />
    <PDFViewer key={opened.doc.loadingTask.docId} pdfDoc={opened.doc} numPages={opened.doc.numPages}
      {...settings} {...{ currentPage, setCurrentPage, clearFile, errorMsg, isSidebarOpen, setIsSidebarOpen, isMobile }} />
  </div>;
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
