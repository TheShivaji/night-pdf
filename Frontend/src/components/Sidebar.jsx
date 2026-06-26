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
  Settings,
  ChevronRight,
  BookOpen,
  Clock,
  LayoutTemplate,
} from "lucide-react";
import { THEME_PRESETS } from "../utils/themeEngine";
import { DOCUMENT_PROFILES } from "../processors/DocumentProfiler";

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
  themeStrength = 100,
  setThemeStrength,
  adaptiveThreshold = 50,
  setAdaptiveThreshold,
  docProfile = 'mixed',
  setDocProfile,
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
  exportSmartTheme = false,
  setExportSmartTheme,
  downloadMode,
  setDownloadMode,
  pagesToConvertStr,
  setPagesToConvertStr,
  outline,
  setCurrentPage,
  recentFiles,
  onDeleteRecent,
  onFileSelected,
}) {
  const [activeTab, setActiveTab] = useState("settings");

  const renderOutlineNodes = (nodes, depth = 0) => {
    if (!nodes || nodes.length === 0) return null;
    return (
      <ul
        style={{
          listStyle: "none",
          paddingLeft: depth > 0 ? "12px" : 0,
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          margin: 0,
        }}
      >
        {nodes.map((node, idx) => {
          const hasChildren = node.items && node.items.length > 0;
          return (
            <li
              key={`${node.title}-${idx}`}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                className="outline-item-row"
                onClick={() => {
                  if (node.pageNum) {
                    setCurrentPage(node.pageNum);
                    if (isMobile) setIsSidebarOpen(false); // Close sidebar on mobile
                  }
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 10px",
                  borderRadius: "var(--radius-sm)",
                  cursor: node.pageNum ? "pointer" : "default",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border-light)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (node.pageNum) {
                    e.currentTarget.style.background = "var(--bg-card-hover)";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (node.pageNum) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.02)";
                    e.currentTarget.style.borderColor = "var(--border-light)";
                  }
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: node.pageNum ? "#fff" : "var(--text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flex: 1,
                    marginRight: "8px",
                  }}
                >
                  {hasChildren ? "📁 " : "📄 "} {node.title}
                </span>
                {node.pageNum && (
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--text-secondary)",
                      background: "rgba(255,255,255,0.06)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
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
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const handleCustomThemeChange = (key, val) => {
    const updated = { ...customTheme, [key]: val };
    if (key === "bgHex") {
      updated.bg = hexToRgb(val);
    } else if (key === "fgHex") {
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
        </div>
        {/* Product Identity Block (Empty State Only) */}
        {!pdfDoc && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Eye-Friendly PDF Reader
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#10b981" }}>✓</span> 100% Local
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#10b981" }}>✓</span> No Uploads
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ color: "#10b981" }}>✓</span> Works Offline
              </div>
            </div>
          </div>
        )}
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
            <div
              className="sidebar-tabs"
              style={{
                display: "flex",
                gap: "8px",
                borderBottom: "1px solid var(--border-light)",
                paddingBottom: "12px",
                marginTop: "14px",
                marginBottom: "16px",
              }}
            >
              <button
                className={`sidebar-tab-btn ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
                style={{
                  flex: 1,
                  padding: "8px",
                  background:
                    activeTab === "settings"
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  border:
                    activeTab === "settings"
                      ? "1px solid var(--border-active)"
                      : "1px solid transparent",
                  borderRadius: "var(--radius-sm)",
                  color:
                    activeTab === "settings" ? "#fff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  outline: "none",
                }}
              >
                ⚙️ Settings
              </button>
              <button
                className={`sidebar-tab-btn ${activeTab === "outline" ? "active" : ""}`}
                onClick={() => setActiveTab("outline")}
                style={{
                  flex: 1,
                  padding: "8px",
                  background:
                    activeTab === "outline"
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  border:
                    activeTab === "outline"
                      ? "1px solid var(--border-active)"
                      : "1px solid transparent",
                  borderRadius: "var(--radius-sm)",
                  color:
                    activeTab === "outline" ? "#fff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  outline: "none",
                }}
              >
                📖 Chapters
              </button>
            </div>

            {activeTab === "settings" ? (
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
                      className={`theme-card ${selectedTheme === "custom" ? "active" : ""}`}
                      onClick={() => {
                        setSelectedTheme("custom");
                      }}
                    >
                      <div className="theme-preview">
                        <div
                          className="theme-preview-bg"
                          style={{
                            background: `linear-gradient(135deg, ${customTheme.bgHex} 50%, ${customTheme.fgHex} 50%)`,
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <div className="theme-name">Custom Theme</div>
                    </div>
                  </div>

                  {/* Custom Theme Color Pickers */}
                  {selectedTheme === "custom" && (
                    <div
                      className="custom-theme-pickers control-row"
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--text-secondary)",
                            textTransform: "uppercase",
                          }}
                        >
                          Color Settings
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <label
                            style={{
                              fontSize: "10px",
                              color: "var(--text-muted)",
                              fontWeight: 600,
                            }}
                          >
                            Background
                          </label>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <input
                              type="color"
                              value={customTheme.bgHex}
                              onChange={(e) =>
                                handleCustomThemeChange("bgHex", e.target.value)
                              }
                              style={{
                                width: "32px",
                                height: "32px",
                                border: "1px solid var(--border-light)",
                                borderRadius: "4px",
                                cursor: "pointer",
                                padding: 0,
                                background: "none",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "11px",
                                color: "var(--text-secondary)",
                                fontFamily: "monospace",
                              }}
                            >
                              {customTheme.bgHex}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                          }}
                        >
                          <label
                            style={{
                              fontSize: "10px",
                              color: "var(--text-muted)",
                              fontWeight: 600,
                            }}
                          >
                            Text Color
                          </label>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <input
                              type="color"
                              value={customTheme.fgHex}
                              onChange={(e) =>
                                handleCustomThemeChange("fgHex", e.target.value)
                              }
                              style={{
                                width: "32px",
                                height: "32px",
                                border: "1px solid var(--border-light)",
                                borderRadius: "4px",
                                cursor: "pointer",
                                padding: 0,
                                background: "none",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "11px",
                                color: "var(--text-secondary)",
                                fontFamily: "monospace",
                              }}
                            >
                              {customTheme.fgHex}
                            </span>
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
                              brightness === 0
                                ? "var(--text-muted)"
                                : "#ffffff",
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
                          onChange={(e) =>
                            setBrightness(parseInt(e.target.value))
                          }
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
                            color:
                              contrast === 0 ? "var(--text-muted)" : "#ffffff",
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
                        <Sliders
                          size={14}
                          style={{ color: "var(--text-muted)" }}
                        />
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={contrast}
                          onChange={(e) =>
                            setContrast(parseInt(e.target.value))
                          }
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
                            color:
                              boldness === 0 ? "var(--text-muted)" : "#ffffff",
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
                        <Sliders
                          size={14}
                          style={{ color: "var(--text-muted)" }}
                        />
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.2"
                          value={boldness}
                          onChange={(e) =>
                            setBoldness(parseFloat(e.target.value))
                          }
                          className="slider-input"
                          disabled={isProcessing}
                          style={{ flex: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings (Processing Mode) */}
                <div className="flex flex-col gap-4">
                  <div className="section-title">Enterprise Smart Preservation</div>
                  
                  {/* Smart Document Profile Selector */}
                  <div className="control-row">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] text-slate-400">Document Profile</span>
                      <span className="text-[11px] text-blue-400 font-bold">{DOCUMENT_PROFILES[docProfile]?.name || 'Mixed'}</span>
                    </div>
                    <select
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded p-1.5 focus:outline-none focus:border-blue-500"
                      value={docProfile}
                      onChange={(e) => {
                        const prof = DOCUMENT_PROFILES[e.target.value];
                        setDocProfile(e.target.value);
                        if (prof) {
                          if (setAdaptiveThreshold) setAdaptiveThreshold(prof.threshold);
                          if (setThemeStrength) setThemeStrength(prof.strength);
                        }
                      }}
                      disabled={isProcessing}
                    >
                      {Object.values(DOCUMENT_PROFILES).map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rendering Mode Cards */}
                  <div className="control-row">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] text-slate-400">Rendering Strategy</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-900/50 p-1 rounded border border-slate-800">
                      <button
                        className={`flex flex-col items-center justify-center p-2 rounded text-center transition-all ${mode === "smart" ? "bg-blue-600 text-white shadow-md font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                        onClick={() => setMode("smart")}
                        disabled={isProcessing}
                        title="Intelligent 8x8 block heatmap classification (Protects Images & Charts)"
                      >
                        <Sparkles size={14} className="mb-1" />
                        <span className="text-[10px]">Smart</span>
                      </button>
                      <button
                        className={`flex flex-col items-center justify-center p-2 rounded text-center transition-all ${mode === "standard" || mode === "duotone" ? "bg-blue-600 text-white shadow-md font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                        onClick={() => setMode("standard")}
                        disabled={isProcessing}
                        title="Standard duotone grayscale interpolation"
                      >
                        <Contrast size={14} className="mb-1" />
                        <span className="text-[10px]">Duotone</span>
                      </button>
                      <button
                        className={`flex flex-col items-center justify-center p-2 rounded text-center transition-all ${mode === "original" ? "bg-blue-600 text-white shadow-md font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                        onClick={() => setMode("original")}
                        disabled={isProcessing}
                        title="Keep original document colors untouched"
                      >
                        <Eye size={14} className="mb-1" />
                        <span className="text-[10px]">Original</span>
                      </button>
                    </div>
                  </div>

                  {/* Theme Intensity & Adaptive Threshold Sliders */}
                  {mode === 'smart' && (
                    <>
                      <div className="control-row">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] text-slate-400">Theme Intensity</span>
                          <span className="text-[11px] text-blue-400 font-mono">{themeStrength}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={themeStrength}
                          onChange={(e) => setThemeStrength && setThemeStrength(Number(e.target.value))}
                          className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded"
                          disabled={isProcessing}
                        />
                      </div>

                      <div className="control-row">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[11px] text-slate-400" title="Adjust classification sensitivity heuristic">Classification Sensitivity</span>
                          <span className="text-[11px] text-blue-400 font-mono">{adaptiveThreshold}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={adaptiveThreshold}
                          onChange={(e) => setAdaptiveThreshold && setAdaptiveThreshold(Number(e.target.value))}
                          className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded"
                          disabled={isProcessing}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Quality & Download Actions */}
                <div
                  className="download-section"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
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
                      <option value={1.0}>
                        Normal Quality (1x Scale) - Fast
                      </option>
                      <option value={1.5}>Medium Quality (1.5x Scale)</option>
                      <option value={2.0}>
                        High Quality (2x Scale) - Recommended
                      </option>
                      <option value={2.5}>
                        Super High Quality (2.5x Scale)
                      </option>
                      <option value={3.0}>
                        Ultra Crisp (3x Scale) - Heavy File
                      </option>
                    </select>
                  </div>

                  {/* Conversion Mode / Page Range Select */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Pages to Convert
                    </span>
                    <div
                      className="toggle-group"
                      style={{ display: "flex", padding: "2px", gap: "2px" }}
                    >
                      <button
                        className={`toggle-option ${downloadMode === "all" ? "active" : ""}`}
                        onClick={() => setDownloadMode("all")}
                        disabled={isProcessing}
                        style={{
                          padding: "6px 2px",
                          fontSize: "11px",
                          flex: 1,
                        }}
                      >
                        All Pages ({numPages})
                      </button>
                      <button
                        className={`toggle-option ${downloadMode === "range" ? "active" : ""}`}
                        onClick={() => setDownloadMode("range")}
                        disabled={isProcessing}
                        style={{
                          padding: "6px 2px",
                          fontSize: "11px",
                          flex: 1,
                        }}
                      >
                        Custom Range
                      </button>
                    </div>

                    {downloadMode === "range" && (
                      <div style={{ marginTop: "4px" }}>
                        <input
                          type="text"
                          className="text-input"
                          placeholder="e.g. 1-5, 8, 11-15"
                          value={pagesToConvertStr}
                          onChange={(e) => setPagesToConvertStr(e.target.value)}
                          disabled={isProcessing}
                          style={{
                            width: "100%",
                            padding: "10px 12px",
                            background: "var(--bg-input)",
                            border: "1px solid var(--border-light)",
                            borderRadius: "var(--radius-sm)",
                            color: "#fff",
                            fontSize: "12px",
                            outline: "none",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "10px",
                            color: "var(--text-muted)",
                            marginTop: "4px",
                            lineHeight: 1.4,
                          }}
                        >
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
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-slate-900/60 p-2 rounded border border-slate-800">
                        <input
                          type="checkbox"
                          checked={exportSmartTheme}
                          onChange={(e) => setExportSmartTheme && setExportSmartTheme(e.target.checked)}
                          className="accent-blue-500 rounded w-3.5 h-3.5"
                        />
                        <span>Export with Smart Theme (Baked Colors)</span>
                      </label>
                      <button className="action-btn" onClick={handleDownload}>
                        <Download size={16} />
                        {!exportSmartTheme ? "Download Original PDF" : "Download Smart Dark PDF"}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div
                className="sidebar-outline-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  animation: "fadeIn 0.2s ease forwards",
                }}
              >
                <div className="section-title" style={{ marginBottom: "4px" }}>
                  Table of Contents
                </div>
                {outline && outline.length > 0 ? (
                  <div
                    className="outline-tree-wrapper"
                    style={{
                      maxHeight: "72vh",
                      overflowY: "auto",
                      paddingRight: "4px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {renderOutlineNodes(outline)}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      color: "var(--text-secondary)",
                      padding: "36px 16px",
                      fontSize: "12px",
                      background: "var(--bg-card)",
                      borderRadius: "var(--radius-md)",
                      border: "1px dashed var(--border-light)",
                      lineHeight: 1.6,
                    }}
                  >
                    📭 No chapters or table of contents found in this document.
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div
            className="sidebar-dashboard"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              paddingBottom: "32px",
              animation: "fadeIn 0.3s ease forwards",
            }}
          >
            {/* Recent Documents */}
            {recentFiles && recentFiles.length > 0 && (
              <div className="dashboard-section">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Clock size={14} style={{ color: "var(--text-secondary)" }} />
                  <h3
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Recent Documents
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {recentFiles.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        const fileObj = new File([item.data], item.name, {
                          type: "application/pdf",
                        });
                        onFileSelected(fileObj, item.currentPage || 1);
                      }}
                      style={{
                        padding: "8px 12px",
                        background: "transparent",
                        border: "1px solid transparent",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--bg-card)";
                        e.currentTarget.style.borderColor =
                          "var(--border-light)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FileText
                            size={14}
                            style={{ color: "var(--text-secondary)" }}
                          />
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#fff",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "var(--text-muted)",
                              marginTop: "2px",
                            }}
                          >
                            Page {item.currentPage || 1} of {item.totalPages}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => onDeleteRecent(item.id, e)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-muted)",
                          cursor: "pointer",
                          padding: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#ef4444";
                          e.currentTarget.style.background =
                            "rgba(239, 68, 68, 0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "var(--text-muted)";
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Theme Presets */}
            <div
              className="dashboard-section"
              style={{
                marginTop: recentFiles && recentFiles.length > 0 ? "0" : "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <h3
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-secondary)",
                  }}
                >
                  Theme Presets
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  {
                    name: "AMOLED Black",
                    color: "#000000",
                    border: "rgba(255,255,255,0.2)",
                  },
                  { name: "Sepia", color: "#f4ecd8", border: "transparent" },
                  {
                    name: "Dark Gray",
                    color: "#1c1c1e",
                    border: "rgba(255,255,255,0.1)",
                  },
                  {
                    name: "Custom Theme",
                    color: "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
                    border: "rgba(255,255,255,0.1)",
                  },
                ].map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "4px 0",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: t.color,
                        border: `1px solid ${t.border}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reading Modes */}
            <div className="dashboard-section">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <h3
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-secondary)",
                  }}
                >
                  Reading Modes
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  "Eye-Friendly Reading",
                  "AMOLED Optimized",
                  "Offline Access",
                  "Local Processing",
                ].map((mode, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "4px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {mode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
