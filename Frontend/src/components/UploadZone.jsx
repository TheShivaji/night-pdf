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
      className={`relative group w-full max-w-2xl mx-auto p-4 sm:px-6 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition-all duration-200 ease-out ${
        isDragging 
          ? 'border-white bg-white/10' 
          : 'border-white/[0.08] bg-zinc-950 hover:-translate-y-[2px] hover:border-white/[0.15] hover:bg-zinc-900'
      }`}
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
        className="hidden"
      />
      
      <div className="flex items-center gap-4">
        <div className={`p-2.5 rounded-xl transition-colors ${isDragging ? 'bg-white text-black' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}`}>
          <UploadCloud size={20} />
        </div>
        <div className="text-left">
          <h3 className="font-display font-bold text-white text-base">Upload PDF</h3>
          <p className="text-zinc-400 text-[13px]">Drag & drop or click to browse</p>
        </div>
      </div>
      
      <div className="hidden sm:block text-right">
        <span className="text-zinc-500 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/5 bg-white/5">
          Up to 50MB
        </span>
      </div>
      
      {errorMsg && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-red-500 text-xs font-medium whitespace-nowrap">
          ⚠️ {errorMsg}
        </div>
      )}
    </div>
  );
}
