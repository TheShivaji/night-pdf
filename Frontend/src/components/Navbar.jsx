import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity">
              <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">🌙</span>
              <span className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                Night PDF
              </span>
            </Link>
          </div>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-1 bg-zinc-900/40 border border-white/5 rounded-full p-1.5 px-2">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="relative rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    {active && (
                      <motion.span
                        layoutId="activeNavBg"
                        className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Action Button */}
          <div className="hidden md:block">
            <Link 
              to="/" 
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200 active:scale-98 shadow-lg shadow-white/5"
            >
              Open PDF Reader
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10 focus:outline-none transition-all"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-20 left-0 w-full border-b border-white/5 bg-zinc-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-2 px-6 pb-6 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition-all ${
                    isActive(item.path) 
                      ? 'text-white bg-white/5 border border-white/10' 
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white py-3 text-sm font-bold text-black hover:bg-zinc-200"
                >
                  Open PDF Reader
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
