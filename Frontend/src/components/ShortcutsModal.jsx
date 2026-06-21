import React, { useEffect } from 'react';
import { X, Command } from 'lucide-react';

export default function ShortcutsModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'T', label: 'Next Theme' },
    { key: '+', label: 'Zoom In' },
    { key: '-', label: 'Zoom Out' },
    { key: '←', label: 'Previous Page' },
    { key: '→', label: 'Next Page' },
    { key: 'F', label: 'Toggle Fullscreen' },
    { key: '?', label: 'Show Shortcuts' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-[#111113] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Command size={18} className="text-zinc-400" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-5 flex flex-col gap-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-400">{s.label}</span>
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-zinc-300 min-w-[28px] text-center">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-white/[0.02] border-t border-white/5 text-center text-xs text-zinc-500">
          Press Escape to close
        </div>
      </div>
    </div>
  );
}
