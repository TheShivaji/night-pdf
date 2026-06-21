import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white hover:opacity-90">
              <span className="text-2xl">🌙</span>
              <span className="font-display text-xl font-extrabold tracking-tight">Night PDF</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link 
                to="/" 
                className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive('/') ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/faq" 
                className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive('/faq') ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                FAQ
              </Link>
              <Link 
                to="/blog" 
                className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-md shadow-white/5"
            >
              Open PDF Reader
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-white/5 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-b border-white/5 bg-zinc-950 md:hidden animate-fadeIn">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive('/') ? 'text-white bg-white/10' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/faq"
              onClick={() => setIsOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive('/faq') ? 'text-white bg-white/10' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              FAQ
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                isActive('/blog') || location.pathname.startsWith('/blog/') ? 'text-white bg-white/10' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <div className="pt-4 pb-2 px-3 border-t border-white/5">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center rounded-md bg-white py-2 text-sm font-bold text-black hover:bg-zinc-200"
              >
                Open PDF Reader
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
