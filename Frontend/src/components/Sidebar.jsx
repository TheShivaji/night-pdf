import { useEffect, useRef } from 'react';
import { Bookmark, ChevronDown, Download, FileText, List, SlidersHorizontal, X } from 'lucide-react';
import { THEME_PRESETS } from '../utils/themeEngine.js';

function asRGB(hex) {
  return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) };
}

function contrastRatio(theme, strength, brightness) {
  const luminance = (original, color) => ['r','g','b'].reduce((sum, key, i) => {
    const target = Math.max(0, Math.min(255, color[key] + brightness));
    const channel = (original + (target - original) * strength / 100) / 255;
    const linear = channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    return sum + linear * [0.2126, 0.7152, 0.0722][i];
  }, 0);
  const paper = luminance(255, theme.bg), ink = luminance(0, theme.fg);
  return (Math.max(paper, ink) + 0.05) / (Math.min(paper, ink) + 0.05);
}

function Outline({ items, onJump }) {
  return <ul className="ml-2">{items.map((item,i) => <li key={i}>
    {item.pageNum ? <button className="py-1 text-left underline" onClick={() => onJump(item.pageNum)}>{item.title}</button> : item.title}
    {item.items.length > 0 && <Outline items={item.items} onJump={onJump} />}
  </li>)}</ul>;
}

export default function Sidebar({ settings, setSettings, file, numPages, savedId, saving, remember, onForget,
  outline, exportSmartTheme, setExportSmartTheme, downloadMode, setDownloadMode, quality, setQuality,
  pagesToConvertStr, setPagesToConvertStr, handleDownload, progress, isMobile, isSidebarOpen,
  errorMsg, onClose, onJump, onCancel }) {
  const closeButton = useRef(null);
  useEffect(() => {
    if (!isMobile || !isSidebarOpen) return;
    const previous = document.activeElement;
    closeButton.current?.focus();
    return () => previous?.focus?.();
  }, [isMobile, isSidebarOpen]);
  const { selectedTheme, customTheme, themeStrength, brightness } = settings;
  const theme = selectedTheme === 'custom' ? customTheme : THEME_PRESETS[selectedTheme] || THEME_PRESETS.dark;
  const change = update => setSettings(previous => ({ ...previous, ...update }));
  return <aside inert={!isSidebarOpen} aria-label="Reader settings"
    className={'sidebar ' + (isSidebarOpen ? 'open' : 'collapsed')}
    onKeyDown={e => { if (e.key === 'Escape') onClose(); }}>
    <div className="sidebar-content v1-settings">
      <header className="reader-brand">
        <span><img src="/logo-icon.svg" alt="" width="28" height="28" />Night PDF</span>
        <button ref={closeButton} className="panel-close" onClick={onClose} aria-label="Close settings"><X size={17} /></button>
      </header>
      <div className="document-summary">
        <FileText size={20} aria-hidden="true" />
        <div><strong title={file.name}>{file.name}</strong><small>{numPages} {numPages === 1 ? 'page' : 'pages'}</small></div>
      </div>
      {isMobile && errorMsg && <div role="alert" className="panel-alert">{errorMsg}</div>}

      <div className="reading-options">
        <label className="field-label">Reading theme
          <select value={selectedTheme} onChange={e => change({ selectedTheme: e.target.value })}>
            {Object.values(THEME_PRESETS).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            <option value="custom">Custom colors</option>
          </select>
        </label>
        {selectedTheme === 'custom' && <div className="color-fields">{['bg','fg'].map(key =>
          <label key={key}>{key === 'bg' ? 'Paper' : 'Text'} color
            <input type="color" value={customTheme[key+'Hex']} onChange={e => change({ customTheme: {
              ...customTheme, [key+'Hex']: e.target.value, [key]: asRGB(e.target.value)
            } })} />
          </label>)}</div>}
        {selectedTheme !== 'normal' && <details className="reader-disclosure">
          <summary><SlidersHorizontal size={16} />Reading adjustments<ChevronDown size={15} /></summary>
          <div className="adjustment-controls">
            <label>Brightness <output>{brightness}</output>
              <input className="slider-input" type="range" min="-100" max="100" value={brightness}
                onChange={e => change({ brightness: Number(e.target.value) })} /></label>
            <label>Theme intensity <output>{themeStrength}%</output>
              <input type="range" min="0" max="100" value={themeStrength}
                onChange={e => change({ themeStrength: Number(e.target.value) })} /></label>
          </div>
        </details>}
        {selectedTheme !== 'normal' && contrastRatio(theme, themeStrength, brightness) < 4.5 &&
          <div role="status" className="panel-alert">Text and paper have low contrast.
            <button className="block underline" onClick={() => change({ selectedTheme: 'dark', themeStrength: 100, brightness: 0 })}>Use high-contrast Dark</button>
          </div>}
        {outline.length > 0 && <details className="reader-disclosure"><summary><List size={16} />Contents<ChevronDown size={15} /></summary>
          <Outline items={outline} onJump={onJump} /></details>}
      </div>

      <section className="export-options" aria-label="Download">
        <h2><Download size={17} />Download PDF</h2>
        <label className="theme-switch">Include reading theme
          <input type="checkbox" checked={exportSmartTheme} disabled={!!progress}
            onChange={e => setExportSmartTheme(e.target.checked)} />
        </label>
        {exportSmartTheme ? <>
          <p>Themed pages are images. For selectable text, links and sharp vector detail at any zoom, download the original.</p>
          <fieldset disabled={!!progress}>
            <label className="field-label">Text quality<select id="quality-select" value={quality} onChange={e => setQuality(Number(e.target.value))}>
              <option value="1">Compact · 72 dpi</option>
              <option value="2">Standard · 144 dpi</option>
              <option value="3">Sharp · 216 dpi</option>
              <option value={300/72}>Print · 300 dpi</option>
            </select></label>
            <small>Target resolution. Very large pages are limited to 9 megapixels.</small>
            <div className="toggle-group" role="group" aria-label="Pages to download">{['all','range'].map(value =>
              <button key={value} className={'toggle-option ' + (downloadMode === value ? 'active' : '')}
                aria-pressed={downloadMode === value} onClick={() => setDownloadMode(value)}>
                {value === 'all' ? 'All pages' : 'Page range'}</button>)}</div>
            {downloadMode === 'range' && <label className="field-label">Pages<input className="text-input" value={pagesToConvertStr}
              placeholder="1-3, 5" onChange={e => setPagesToConvertStr(e.target.value)} /></label>}
          </fieldset>
        </> : <p>Original PDF with all pages, fonts and links intact.</p>}
        {progress ? <><p role="status">{progress.status === 'processing' ? `Rendering page ${progress.current} of ${progress.total}` :
          progress.status === 'saving' ? 'Saving PDF…' : progress.status}</p><button className="panel-secondary" onClick={onCancel}>Cancel export</button></>
          : <button className="action-btn" onClick={handleDownload}><Download size={16} />{exportSmartTheme ? 'Download themed PDF' : 'Download original PDF'}</button>}
      </section>
      <section className="remember-options" aria-label="Local storage">
        <button className="panel-secondary" disabled={saving} onClick={savedId ? onForget : remember}>
          <Bookmark size={15} />{savedId ? 'Forget saved copy' : saving ? 'Saving…' : 'Remember this PDF'}</button>
        <p>{savedId ? 'A full copy is saved in this browser.' : 'Optional. Saves a copy in this browser for next time.'}</p>
      </section>
    </div>
  </aside>;
}
