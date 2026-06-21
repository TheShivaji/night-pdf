import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black py-16 text-zinc-500 font-sans">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Pitch */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-lg tracking-tight">
              <span className="text-xl">🌙</span> Night PDF
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
              A premium, offline-capable utility that converts bright, eye-straining PDFs into gorgeous dark, sepia, and custom themes 100% locally.
            </p>
            <p className="text-[10px] text-zinc-600 mt-2">
              &copy; {currentYear} Night PDF. All rights reserved.
            </p>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  PDF Reader Workspace
                </Link>
              </li>
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Custom Theme Creator
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/faq" className="transition-colors hover:text-white">
                  FAQ & Help Center
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-white">
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/privacy-policy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
