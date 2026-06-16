import React from 'react';
import { 
  Moon, 
  FileText, 
  X, 
  Download, 
  Sparkles, 
  Contrast, 
  Loader2,
  Sun,
  Sliders,
  RotateCcw,
  Eye
} from 'lucide-react';
import { THEME_PRESETS } from '../utils/themeEngine';

export default function Sidebar({
  file,
  pdfDoc,
  numPages,
  selectedTheme,
  setSelectedTheme,
  mode,
  setMode,
  quality,
  setQuality,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  boldness,
  setBoldness,
  isProcessing,
  progress,
  clearFile,
  handleDownload,
  isSidebarOpen,
  setIsSidebarOpen,
  isMobile
}) {
  const getThemeColors = (theme) => {
    return {
      background: theme.bgHex,
      color: theme.fgHex
    };
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const resetSliders = () => {
    setBrightness(0);
    setContrast(0);
    setBoldness(0);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="logo-icon">🌙</span>
          <span className="logo-text">Night PDF</span>
          <span className="logo-beta">Client</span>
        </div>
        {isMobile && (
          <button className="sidebar-close-mobile" onClick={() => setIsSidebarOpen(false)}>
            <X size={18} />
          </button>
        )}
      </div>

      <div className="sidebar-content">
        {pdfDoc ? (
          <>
            {/* File Info Card */}
            <div className="file-card">
              <div className="file-info">
                <FileText className="file-icon" size={24} />
                <div style={{ overflow: 'hidden' }}>
                  <div className="file-name" title={file.name}>{file.name}</div>
                  <div className="file-size">{formatBytes(file.size)} • {numPages} pages</div>
                </div>
              </div>
              <button className="remove-btn" onClick={clearFile} disabled={isProcessing} title="Remove PDF">
                <X size={16} />
              </button>
            </div>

            {/* Presets Theme Selection */}
            <div>
              <div className="section-title">Select Eye-Friendly Theme</div>
              <div className="theme-grid">
                {Object.values(THEME_PRESETS).map((theme) => {
                  const active = selectedTheme === theme.id;
                  const colors = getThemeColors(theme);
                  return (
                    <div 
                      key={theme.id}
                      className={`theme-card ${active ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedTheme(theme.id);
                        if (isMobile) setIsSidebarOpen(false); // Close drawer to show canvas
                      }}
                    >
                      <div className="theme-preview">
                        <div className="theme-preview-bg" style={{ backgroundColor: colors.background }}>
                          <div 
                            style={{ 
                              position: 'absolute', 
                              top: '30%', 
                              left: '15%', 
                              width: '70%', 
                              height: '2px', 
                              backgroundColor: colors.color 
                            }} 
                          />
                          <div 
                            style={{ 
                              position: 'absolute', 
                              top: '55%', 
                              left: '15%', 
                              width: '50%', 
                              height: '2px', 
                              backgroundColor: colors.color 
                            }} 
                          />
                        </div>
                      </div>
                      <div className="theme-name">{theme.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Tuning Sliders */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div className="section-title" style={{ marginBottom: 0 }}>Custom Adjustments</div>
                {(brightness !== 0 || contrast !== 0 || boldness !== 0) && (
                  <button 
                    onClick={resetSliders} 
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--text-secondary)', 
                      fontSize: '11px', 
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px' 
                    }}
                    title="Reset sliders"
                  >
                    <RotateCcw size={10} /> Reset
                  </button>
                )}
              </div>
              <div className="control-row" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Brightness Slider */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Brightness</span>
                    <span style={{ color: brightness === 0 ? 'var(--text-muted)' : '#ffffff' }}>
                      {brightness > 0 ? `+${brightness}` : brightness}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sun size={14} style={{ color: 'var(--text-muted)' }} />
                    <input 
                      type="range" 
                      min="-100" 
                      max="100" 
                      value={brightness} 
                      onChange={(e) => setBrightness(parseInt(e.target.value))} 
                      className="slider-input"
                      disabled={isProcessing}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                {/* Contrast Slider */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Contrast Bolding</span>
                    <span style={{ color: contrast === 0 ? 'var(--text-muted)' : '#ffffff' }}>
                      {contrast > 0 ? `+${contrast}` : contrast}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sliders size={14} style={{ color: 'var(--text-muted)' }} />
                    <input 
                      type="range" 
                      min="-100" 
                      max="100" 
                      value={contrast} 
                      onChange={(e) => setContrast(parseInt(e.target.value))} 
                      className="slider-input"
                      disabled={isProcessing}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                {/* Text Bolding / Thickness Slider */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Text Thickness</span>
                    <span style={{ color: boldness === 0 ? 'var(--text-muted)' : '#ffffff' }}>
                      {boldness === 0 ? 'Original' : `+${boldness}px`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sliders size={14} style={{ color: 'var(--text-muted)' }} />
                    <input 
                      type="range" 
                      min="0" 
                      max="2" 
                      step="0.2"
                      value={boldness} 
                      onChange={(e) => setBoldness(parseFloat(e.target.value))} 
                      className="slider-input"
                      disabled={isProcessing}
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings (Processing Mode) */}
            <div>
              <div className="section-title">Processing Mode</div>
              <div className="control-row">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Color Rendering</span>
                  <span style={{ fontSize: '11px', color: '#ffffff', fontWeight: 600 }}>
                    {mode === 'smart' ? 'Smart Mode' : mode === 'original' ? 'No-Invert Images' : 'Duotone Contrast'}
                  </span>
                </div>
                <div className="toggle-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', padding: '2px' }}>
                  <button 
                    className={`toggle-option ${mode === 'smart' ? 'active' : ''}`}
                    onClick={() => setMode('smart')}
                    disabled={isProcessing}
                    style={{ fontSize: '10px', padding: '8px 2px' }}
                  >
                    <Sparkles size={10} /> Smart
                  </button>
                  <button 
                    className={`toggle-option ${mode === 'original' ? 'active' : ''}`}
                    onClick={() => setMode('original')}
                    disabled={isProcessing}
                    style={{ fontSize: '10px', padding: '8px 2px' }}
                    title="Keep original colors of diagrams and photographs"
                  >
                    <Eye size={10} /> No-Invert
                  </button>
                  <button 
                    className={`toggle-option ${mode === 'duotone' ? 'active' : ''}`}
                    onClick={() => setMode('duotone')}
                    disabled={isProcessing}
                    style={{ fontSize: '10px', padding: '8px 2px' }}
                  >
                    <Contrast size={10} /> Duotone
                  </button>
                </div>
              </div>
            </div>

            {/* Quality & Download Actions */}
            <div className="download-section">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label htmlFor="quality-select" style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Download Quality
                </label>
                <select 
                  id="quality-select"
                  className="select-quality" 
                  value={quality} 
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  disabled={isProcessing}
                >
                  <option value={1.0}>Normal Quality (1x Scale) - Fast</option>
                  <option value={1.5}>Medium Quality (1.5x Scale)</option>
                  <option value={2.0}>High Quality (2x Scale) - Recommended</option>
                  <option value={2.5}>Super High Quality (2.5x Scale)</option>
                  <option value={3.0}>Ultra Crisp (3x Scale) - Heavy File</option>
                </select>
              </div>

              {isProcessing ? (
                <div className="progress-card">
                  <div className="progress-header">
                    <span>Generating Night PDF...</span>
                    <span>
                      {progress.status === 'saving' 
                        ? '100%' 
                        : `${Math.round((progress.current / progress.total) * 100)}%`}
                    </span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: progress.status === 'saving' 
                          ? '100%' 
                          : `${(progress.current / progress.total) * 100}%` 
                        }} 
                    />
                  </div>
                  <div className="progress-status">
                    {progress.status === 'saving' 
                      ? 'Assembling pages & compressing file...' 
                      : `Converting page ${progress.current} of ${progress.total}...`}
                  </div>
                </div>
              ) : (
                <button className="action-btn" onClick={handleDownload}>
                  <Download size={16} />
                  Download Eye-Friendly PDF
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="sidebar-placeholder">
            <Moon size={24} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
            <p>No document active.</p>
            <p style={{ fontSize: '11px', marginTop: '6px' }}>Upload a PDF in the center panel to customize reader settings.</p>
          </div>
        )}
      </div>
    </aside>
  );
}
