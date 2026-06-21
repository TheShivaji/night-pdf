import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.04] bg-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-10 flex flex-col items-center text-center gap-6">
        
        {/* Brand */}
        <Link to="/" className="inline-flex items-center gap-2" aria-label="Night PDF">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm">🌙</span>
          <span style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-extrabold tracking-tight text-white">
            Night<span className="text-zinc-600">PDF</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <Link to="/faq" className="text-[13px] font-medium text-zinc-500 hover:text-white transition-colors">FAQ</Link>
          <Link to="/blog" className="text-[13px] font-medium text-zinc-500 hover:text-white transition-colors">Blog</Link>
          <Link to="/privacy-policy" className="text-[13px] font-medium text-zinc-500 hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="text-[13px] font-medium text-zinc-500 hover:text-white transition-colors">Terms</Link>
        </div>

        {/* Copyright */}
        <div className="text-[12px] font-medium text-zinc-600 mt-2">
          © {year} NightPDF
        </div>
        
      </div>
    </footer>
  );
}
