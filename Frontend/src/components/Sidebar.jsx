import React, { useState } from "react";
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
  Eye,
} from "lucide-react";
import { THEME_PRESETS } from "../utils/themeEngine";

export default function Sidebar({
  file,
  pdfDoc,
  numPages,
  selectedTheme,
  setSelectedTheme,
  customTheme,
  setCustomTheme,
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
  isMobile,
  downloadMode,
  setDownloadMode,
  pagesToConvertStr,
  setPagesToConvertStr,
  outline,
  setCurrentPage
}) {
  const [activeTab, setActiveTab] = useState('settings');

  const renderOutlineNodes = (nodes, depth = 0) => {
    if (!nodes || nodes.length === 0) return null;
    return (
      <ul style={{ listStyle: 'none', paddingLeft: depth > 0 ? '12px' : 0, display: 'flex', flexDirection: 'column', gap: '4px', margin: 0 }}>
        {nodes.map((node, idx) => {
          const hasChildren = node.items && node.items.length > 0;
          return (
            <li key={`${node.title}-${idx}`} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div 
                className="outline-item-row"
                onClick={() => {
                  if (node.pageNum) {
                    setCurrentPage(node.pageNum);
                    if (isMobile) setIsSidebarOpen(false); // Close sidebar on mobile
                  }
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: node.pageNum ? 'pointer' : 'default',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  if (node.pageNum) {
                    e.currentTarget.style.background = 'var(--bg-card-hover)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (node.pageNum) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }
                }}
              >
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: 500, 
                  color: node.pageNum ? '#fff' : 'var(--text-secondary)',
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  flex: 1,
                  marginRight: '8px'
                }}>
                  {hasChildren ? '📁 ' : '📄 '} {node.title}
                </span>
                {node.pageNum && (
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 700, 
                    color: 'var(--text-secondary)', 
                    background: 'rgba(255,255,255,0.06)', 
                    padding: '2px 6px', 
                    borderRadius: '4px' 
                  }}>
                    p.{node.pageNum}
                  </span>
                )}
              </div>
              {hasChildren && renderOutlineNodes(node.items, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const handleCustomThemeChange = (key, val) => {
    const updated = { ...customTheme, [key]: val };
    if (key === 'bgHex') {
      updated.bg = hexToRgb(val);
    } else if (key === 'fgHex') {
      updated.fg = hexToRgb(val);
    }
    setCustomTheme(updated);
  };
  const getThemeColors = (theme) => {
    return {
      background: theme.bgHex,
      color: theme.fgHex,
    };
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const resetSliders = () => {
    setBrightness(0);
    setContrast(0);
    setBoldness(0);
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="logo-icon">🌙</span>
          <span className="logo-text">Night PDF</span>
          <span className="logo-beta">Client</span>
        </div>
        {isMobile && (
          <button
            className="sidebar-close-mobile"
            onClick={() => setIsSidebarOpen(false)}
          >
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
                <div style={{ overflow: "hidden" }}>
                  <div className="file-name" title={file.name}>
                    {file.name}
                  </div>
                  <div className="file-size">
                    {formatBytes(file.size)} • {numPages} pages
                  </div>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={clearFile}
                disabled={isProcessing}
                title="Remove PDF"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tab Selection */}
            <div className="sidebar-tabs" style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginTop: '14px', marginBottom: '16px' }}>
              <button
                className={`sidebar-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: activeTab === 'settings' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: activeTab === 'settings' ? '1px solid var(--border-active)' : '1px solid transparent',
                  borderRadius: 'var(--radius-sm)',
                  color: activeTab === 'settings' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
              >
                ⚙️ Settings
              </button>
              <button
                className={`sidebar-tab-btn ${activeTab === 'outline' ? 'active' : ''}`}
                onClick={() => setActiveTab('outline')}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: activeTab === 'outline' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: activeTab === 'outline' ? '1px solid var(--border-active)' : '1px solid transparent',
                  borderRadius: 'var(--radius-sm)',
                  color: activeTab === 'outline' ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
              >
                📖 Chapters
              </button>
            </div>

            {activeTab === 'settings' ? (
              <>
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
                      className={`theme-card ${active ? "active" : ""}`}
                      onClick={() => {
                        setSelectedTheme(theme.id);
                        if (isMobile) setIsSidebarOpen(false); // Close drawer to show canvas
                      }}
                    >
                      <div className="theme-preview">
                        <div
                          className="theme-preview-bg"
                          style={{ backgroundColor: colors.background }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: "30%",
                              left: "15%",
                              width: "70%",
                              height: "2px",
                              backgroundColor: colors.color,
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "55%",
                              left: "15%",
                              width: "50%",
                              height: "2px",
                              backgroundColor: colors.color,
                            }}
                          />
                        </div>
                      </div>
                      <div className="theme-name">{theme.name}</div>
                    </div>
                  );
                })}
                {/* Custom theme preset card */}
                <div
                  className={`theme-card ${selectedTheme === 'custom' ? "active" : ""}`}
                  onClick={() => {
                    setSelectedTheme('custom');
                  }}
                >
                  <div className="theme-preview">
                    <div
                      className="theme-preview-bg"
                      style={{ 
                        background: `linear-gradient(135deg, ${customTheme.bgHex} 50%, ${customTheme.fgHex} 50%)`,
                        position: 'relative',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </div>
                  <div className="theme-name">Custom Theme</div>
                </div>
              </div>

              {/* Custom Theme Color Pickers */}
              {selectedTheme === 'custom' && (
                <div className="custom-theme-pickers control-row" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Color Settings</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Background</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input 
                          type="color" 
                          value={customTheme.bgHex} 
                          onChange={(e) => handleCustomThemeChange('bgHex', e.target.value)}
                          style={{ width: '32px', height: '32px', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer', padding: 0, background: 'none' }}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{customTheme.bgHex}</span>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Text Color</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input 
                          type="color" 
                          value={customTheme.fgHex} 
                          onChange={(e) => handleCustomThemeChange('fgHex', e.target.value)}
                          style={{ width: '32px', height: '32px', border: '1px solid var(--border-light)', borderRadius: '4px', cursor: 'pointer', padding: 0, background: 'none' }}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{customTheme.fgHex}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Tuning Sliders */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div className="section-title" style={{ marginBottom: 0 }}>
                  Custom Adjustments
                </div>
                {(brightness !== 0 || contrast !== 0 || boldness !== 0) && (
                  <button
                    onClick={resetSliders}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-secondary)",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                    title="Reset sliders"
                  >
                    <RotateCcw size={10} /> Reset
                  </button>
                )}
              </div>
              <div
                className="control-row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {/* Brightness Slider */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>
                      Brightness
                    </span>
                    <span
                      style={{
                        color:
                          brightness === 0 ? "var(--text-muted)" : "#ffffff",
                      }}
                    >
                      {brightness > 0 ? `+${brightness}` : brightness}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Sun size={14} style={{ color: "var(--text-muted)" }} />
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>
                      Contrast Bolding
                    </span>
                    <span
                      style={{
                        color: contrast === 0 ? "var(--text-muted)" : "#ffffff",
                      }}
                    >
                      {contrast > 0 ? `+${contrast}` : contrast}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Sliders size={14} style={{ color: "var(--text-muted)" }} />
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>
                      Text Thickness
                    </span>
                    <span
                      style={{
                        color: boldness === 0 ? "var(--text-muted)" : "#ffffff",
                      }}
                    >
                      {boldness === 0 ? "Original" : `+${boldness}px`}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Sliders size={14} style={{ color: "var(--text-muted)" }} />
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{ fontSize: "11px", color: "var(--text-muted)" }}
                  >
                    Color Rendering
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#ffffff",
                      fontWeight: 600,
                    }}
                  >
                    {mode === "smart"
                      ? "Smart Mode"
                      : mode === "original"
                        ? "No-Invert Images"
                        : "Duotone Contrast"}
                  </span>
                </div>
                <div
                  className="toggle-group"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "2px",
                    padding: "2px",
                  }}
                >
                  <button
                    className={`toggle-option ${mode === "smart" ? "active" : ""}`}
                    onClick={() => setMode("smart")}
                    disabled={isProcessing}
                    style={{ fontSize: "10px", padding: "8px 2px" }}
                  >
                    <Sparkles size={10} /> Smart
                  </button>
                  <button
                    className={`toggle-option ${mode === "original" ? "active" : ""}`}
                    onClick={() => setMode("original")}
                    disabled={isProcessing}
                    style={{ fontSize: "10px", padding: "8px 2px" }}
                    title="Keep original colors of diagrams and photographs"
                  >
                    <Eye size={10} /> No-Invert
                  </button>
                  <button
                    className={`toggle-option ${mode === "duotone" ? "active" : ""}`}
                    onClick={() => setMode("duotone")}
                    disabled={isProcessing}
                    style={{ fontSize: "10px", padding: "8px 2px" }}
                  >
                    <Contrast size={10} /> Duotone
                  </button>
                </div>
              </div>
            </div>

            {/* Quality & Download Actions */}
            <div className="download-section" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  htmlFor="quality-select"
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
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
                  <option value={2.0}>
                    High Quality (2x Scale) - Recommended
                  </option>
                  <option value={2.5}>Super High Quality (2.5x Scale)</option>
                  <option value={3.0}>
                    Ultra Crisp (3x Scale) - Heavy File
                  </option>
                </select>
              </div>

              {/* Conversion Mode / Page Range Select */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>Pages to Convert</span>
                <div className="toggle-group" style={{ display: 'flex', padding: '2px', gap: '2px' }}>
                  <button
                    className={`toggle-option ${downloadMode === 'all' ? 'active' : ''}`}
                    onClick={() => setDownloadMode('all')}
                    disabled={isProcessing}
                    style={{ padding: '6px 2px', fontSize: '11px', flex: 1 }}
                  >
                    All Pages ({numPages})
                  </button>
                  <button
                    className={`toggle-option ${downloadMode === 'range' ? 'active' : ''}`}
                    onClick={() => setDownloadMode('range')}
                    disabled={isProcessing}
                    style={{ padding: '6px 2px', fontSize: '11px', flex: 1 }}
                  >
                    Custom Range
                  </button>
                </div>

                {downloadMode === 'range' && (
                  <div style={{ marginTop: '4px' }}>
                    <input
                      type="text"
                      className="text-input"
                      placeholder="e.g. 1-5, 8, 11-15"
                      value={pagesToConvertStr}
                      onChange={(e) => setPagesToConvertStr(e.target.value)}
                      disabled={isProcessing}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        fontSize: '12px',
                        outline: 'none'
                      }}
                    />
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                      Convert only selected pages. Format: 1-5, 8, 11-15
                    </div>
                  </div>
                )}
              </div>

              {isProcessing ? (
                <div className="progress-card">
                  <div className="progress-header">
                    <span>Generating Night PDF...</span>
                    <span>
                      {progress.status === "saving"
                        ? "100%"
                        : `${Math.round((progress.current / progress.total) * 100)}%`}
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width:
                          progress.status === "saving"
                            ? "100%"
                            : `${(progress.current / progress.total) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="progress-status">
                    {progress.status === "saving"
                      ? "Assembling pages & compressing file..."
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
              <div className="sidebar-outline-container" style={{ display: 'flex', flexDirection: 'column', gap: '14px', animation: 'fadeIn 0.2s ease forwards' }}>
                <div className="section-title" style={{ marginBottom: '4px' }}>Table of Contents</div>
                {outline && outline.length > 0 ? (
                  <div className="outline-tree-wrapper" style={{ maxHeight: '72vh', overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {renderOutlineNodes(outline)}
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    color: 'var(--text-secondary)', 
                    padding: '36px 16px', 
                    fontSize: '12px', 
                    background: 'var(--bg-card)', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px dashed var(--border-light)',
                    lineHeight: 1.6
                  }}>
                    📭 No chapters or table of contents found in this document.
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="sidebar-placeholder">
            <Moon
              size={24}
              style={{ color: "var(--text-muted)", marginBottom: "12px" }}
            />
            <p>No document active.</p>
            <p style={{ fontSize: "11px", marginTop: "6px" }}>
              Upload a PDF in the center panel to customize reader settings.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
