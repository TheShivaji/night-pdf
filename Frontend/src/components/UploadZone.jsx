import React, { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';

export default function UploadZone({ onFileSelected, errorMsg }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      onFileSelected(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelected(file);
    }
  };

  return (
    <div 
      className={`upload-zone main-upload ${isDragging ? 'drag-active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="application/pdf" 
        style={{ display: 'none' }}
      />
      <div className="empty-state-icon">
        <UploadCloud size={32} />
      </div>
      <h3>Start reading eye-friendly PDFs</h3>
      <p className="upload-text">Drag & drop your PDF here or click to browse</p>
      <p className="upload-subtext">PDF files up to 50MB supported</p>
      
      {errorMsg && (
        <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: 500, marginTop: '12px' }}>
          ⚠️ {errorMsg}
        </div>
      )}
    </div>
  );
}
