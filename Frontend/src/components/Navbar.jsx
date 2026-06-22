import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/blog') return location.pathname.startsWith('/blog');
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex h-[68px] items-center justify-between">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="group flex items-center gap-2.5 shrink-0"
              aria-label="Night PDF Home"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.07] border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors duration-200">
                <img src="/logo-icon.svg" alt="NightPDF Logo" className="w-5 h-5 text-white" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.2))' }} />
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/5" />
              </span>
              <span
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-[17px] font-extrabold tracking-tight text-white"
              >
                Night<span className="text-zinc-400">PDF</span>
              </span>
            </Link>

            {/* ── Desktop Nav Pills ── */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 backdrop-blur-sm">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150"
                    style={{ color: active ? '#fff' : '#a1a1aa' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12]"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 hover:text-white transition-colors">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-black shadow-lg shadow-white/10 hover:bg-zinc-100 transition-all duration-200 active:scale-95"
              >
                Upload PDF
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown Drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl md:hidden"
            >
              <div className="px-5 py-5 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive(item.path)
                        ? 'bg-white/[0.07] text-white border border-white/[0.1]'
                        : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-white/[0.06]">
                  <Link
                    to="/"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black hover:bg-zinc-100 transition-colors"
                  >
                    Upload PDF
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
