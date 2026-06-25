import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const articles = [
  {
    title: 'How to Read API Documentation & PDFs in Dark Mode Comfortably',
    slug: 'read-api-documentation-pdf-dark-mode',
    category: 'Developer Guides',
    readTime: '10 min read',
    date: 'Jun 24, 2026',
    excerpt: 'Tired of blinding white API manuals? Learn how to read developer manuals, AWS documentation, and Stripe diagrams in dark mode without breaking colors or layout.',
    accent: '#6366f1',
    accentBg: 'rgba(99,102,241,0.06)',
  },
  {
    title: 'How to Read PDF at Night Without Eye Strain',
    slug: 'how-to-read-pdf-at-night',
    category: 'Reading Tips',
    readTime: '5 min read',
    date: 'Jun 21, 2026',
    excerpt: 'Reading bright PDFs in dark rooms causes severe eye strain and fatigue. Learn the best settings, lighting advice, and inversion tools for late-night reading sessions.',
    accent: '#f59e0b',
    accentBg: 'rgba(245,158,11,0.06)',
  },
  {
    title: 'Best PDF Dark Mode Converter Tools (Online & Offline)',
    slug: 'best-pdf-dark-mode-tools',
    category: 'PDF Tools',
    readTime: '6 min read',
    date: 'Jun 18, 2026',
    excerpt: 'A comprehensive comparison of the best PDF dark mode converters, browser extensions, and readers. Discover which tool handles smart color preservation best.',
    accent: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.06)',
  },
  {
    title: 'AMOLED Black vs Sepia Mode: Which is Better for Your Eyes?',
    slug: 'amoled-vs-sepia',
    category: 'Display Tech',
    readTime: '4 min read',
    date: 'Jun 15, 2026',
    excerpt: 'Should you use pure black AMOLED dark mode or warm sepia for night reading? We analyze screen tech, blue light emission, and visual contrast to find the optimal theme.',
    accent: '#a855f7',
    accentBg: 'rgba(168,85,247,0.06)',
  },
  {
    title: '5 Scientific Ways to Reduce Eye Strain While Reading PDFs',
    slug: 'reduce-eye-strain-while-reading-pdf',
    category: 'Health & Eye Care',
    readTime: '5 min read',
    date: 'Jun 10, 2026',
    excerpt: 'Long hours studying PDFs can lead to Computer Vision Syndrome (CVS). Implement these evidence-based guidelines to safeguard your vision health.',
    accent: '#10b981',
    accentBg: 'rgba(16,185,129,0.06)',
  },
  {
    title: 'How to Convert PDF to Dark Mode on Mobile (Android & iOS)',
    slug: 'convert-pdf-to-dark-mode-on-mobile',
    category: 'PDF Tools',
    readTime: '4 min read',
    date: 'Jun 05, 2026',
    excerpt: 'Reading PDFs on phone screens at night is frustrating. Learn how to convert PDFs to dark mode on Android and iOS using clean browser shortcuts.',
    accent: '#f43f5e',
    accentBg: 'rgba(244,63,94,0.06)',
  },
  {
    title: 'Dark Mode vs Light Mode: The Science of Reading Comprehension',
    slug: 'dark-mode-vs-light-mode-reading',
    category: 'Display Tech',
    readTime: '7 min read',
    date: 'May 28, 2026',
    excerpt: 'Does white text on black harm reading speed or comprehension? We dissect clinical studies on typography contrast, glare, and information retention.',
    accent: '#06b6d4',
    accentBg: 'rgba(6,182,212,0.06)',
  },
];

export default function BlogListing() {
  const [featured, ...rest] = articles;

  return (
    <>
      <Helmet>
        <title>Blog — Night PDF | Eye-Friendly Reading Guides & PDF Dark Mode Tips</title>
        <meta name="description" content="Read expert guides on reducing eye strain, comparing AMOLED black and sepia themes, converting PDFs on mobile, and reading PDFs comfortably at night." />
        <link rel="canonical" href="https://pdf.theshivaji.in/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/blog" />
        <meta property="og:title" content="Blog — Night PDF | Eye-Friendly Reading Guides" />
        <meta property="og:description" content="Read expert guides on reducing eye strain, comparing AMOLED black and sepia themes, converting PDFs on mobile, and reading PDFs comfortably at night." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Night PDF Blog",
          "url": "https://pdf.theshivaji.in/blog",
          "publisher": { "@type": "Organization", "name": "Night PDF" },
        })}</script>
      </Helmet>

      <main className="bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ── Hero ── */}
        <section className="relative isolate overflow-hidden px-6 pt-24 pb-16 text-center sm:px-8">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[700px] rounded-full bg-white/[0.012] blur-[140px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize: '52px 52px' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-8">
              Publications
            </span>
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent leading-none pb-2"
            >
              Eye-Friendly<br />Reading Guides
            </h1>
            <p className="mt-7 text-base text-zinc-400 max-w-lg mx-auto leading-relaxed font-light">
              Science-backed insights, device setups, and software guides to help you read PDFs comfortably in the dark.
            </p>
          </motion.div>
        </section>

        {/* ── Featured Article ── */}
        <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-10">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Featured</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to={`/blog/${featured.slug}`}
              className="group relative flex flex-col md:flex-row gap-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 hover:border-white/[0.16] transition-all duration-300"
            >
              {/* Left accent stripe */}
              <div className="hidden md:block w-1.5 shrink-0 rounded-l-3xl" style={{ background: featured.accent, opacity: 0.7 }} />

              {/* Content */}
              <div className="flex-1 p-9 sm:p-12">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide"
                    style={{ background: featured.accentBg, color: featured.accent, border: `1px solid ${featured.accent}28` }}
                  >
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-zinc-600">
                    <Calendar className="w-3.5 h-3.5" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-[12px] text-zinc-600">
                    <Clock className="w-3.5 h-3.5" /> {featured.readTime}
                  </span>
                </div>
                <h2
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className="text-2xl sm:text-3xl font-extrabold text-white leading-snug group-hover:text-zinc-100 transition-colors"
                >
                  {featured.title}
                </h2>
                <p className="mt-4 text-[14px] text-zinc-400 leading-relaxed max-w-xl">
                  {featured.excerpt}
                </p>
                <span className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold text-black shadow-lg shadow-white/10 group-hover:bg-zinc-100 transition-all active:scale-95">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>

              {/* Right visual block */}
              <div
                className="md:w-80 lg:w-96 min-h-[220px] flex items-center justify-center relative overflow-hidden shrink-0"
                style={{ background: featured.accentBg }}
              >
                <span className="text-7xl opacity-30">🌙</span>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950/80" />
              </div>
            </Link>
          </motion.div>
        </section>

        {/* ── Articles Grid ── */}
        <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-28">
          <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 mb-8">All Guides</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-white/[0.07] bg-zinc-950 hover:border-white/[0.14] hover:-translate-y-1 transition-all duration-250 overflow-hidden"
                >
                  {/* Top accent bar */}
                  <div className="h-0.5 w-full" style={{ background: article.accent, opacity: 0.5 }} />

                  <div className="flex-1 p-7">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: article.accentBg, color: article.accent, border: `1px solid ${article.accent}22` }}
                      >
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-zinc-600">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h3
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className="text-[16px] font-bold text-white leading-snug group-hover:text-zinc-100 transition-colors mb-3"
                    >
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="px-7 pb-6 flex items-center gap-1.5 text-[12px] font-semibold text-zinc-400 group-hover:text-white transition-colors">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
