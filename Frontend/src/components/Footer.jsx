import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-zinc-950 py-8 text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm tracking-tight mb-1">
              <span>🌙</span> Night PDF
            </div>
            <p className="text-xs">
              &copy; {currentYear} Night PDF. All rights reserved.
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">
              100% Client-Side PDF Processing & Reading.
            </p>
          </div>

          {/* Directory Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <Link to="/" className="transition-all hover:text-white">
              Home
            </Link>
            <Link to="/faq" className="transition-all hover:text-white">
              FAQ
            </Link>
            <Link to="/blog" className="transition-all hover:text-white">
              Blog
            </Link>
            <Link to="/privacy-policy" className="transition-all hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-all hover:text-white">
              Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
