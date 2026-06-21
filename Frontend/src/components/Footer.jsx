import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      heading: 'Product',
      links: [
        { label: 'PDF Reader', to: '/' },
        { label: 'Custom Themes', to: '/' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Blog', to: '/blog' },
        { label: 'FAQ', to: '/faq' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', to: '/privacy-policy' },
        { label: 'Terms of Service', to: '/terms' },
      ],
    },
  ];

  return (
    <footer className="w-full border-t border-white/[0.06] bg-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-14">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Brand block */}
          <div className="max-w-xs">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5" aria-label="Night PDF">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-base">🌙</span>
              <span
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="text-[16px] font-extrabold tracking-tight text-white"
              >
                Night<span className="text-zinc-500">PDF</span>
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-zinc-500">
              Convert bright PDFs into eye-friendly dark, sepia, and AMOLED themes—100% in your browser. No uploads, no tracking.
            </p>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {cols.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-600">
                  {col.heading}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-[13px] text-zinc-500 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + bottom */}
        <div className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-zinc-700">
            © {year} Night PDF. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-800 font-mono tracking-wide">
            Built with ❤️ for readers who care about their eyes.
          </p>
        </div>
      </div>
    </footer>
  );
}
