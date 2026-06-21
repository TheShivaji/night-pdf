import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Lock, EyeOff, Server, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const pillars = [
  { icon: <Lock className="w-5 h-5" />, title: 'Local-Only Processing', desc: "Every PDF operation—rendering, theme switching, pixel inversion—runs natively inside your browser sandbox using your machine's RAM." },
  { icon: <EyeOff className="w-5 h-5" />, title: 'Zero Server Uploads', desc: 'We maintain no remote storage or file databases. Your documents never leave your device, ever.' },
  { icon: <Server className="w-5 h-5" />, title: 'No Data Profiling', desc: 'We capture no reading history, no document metadata, and have no user profiles to sell to advertisers.' },
];

const sections = [
  {
    num: '01',
    title: 'Information We Do Not Collect',
    body: 'We do not collect, monitor, store, or transmit the text or metadata of any documents loaded into Night PDF. The application functions entirely locally in your web browser session. No outbound web requests containing document assets or canvas rendering coordinates are ever dispatched.',
  },
  {
    num: '02',
    title: 'Browser Storage & IndexedDB',
    body: "To support reading continuity (remembering recent files and last read pages), the application writes parameters to your browser's private local databases (IndexedDB & LocalStorage). This data is kept sandboxed on your machine. You can wipe it at any time via standard browser settings.",
  },
  {
    num: '03',
    title: 'Anonymous Analytics',
    body: 'We may utilize privacy-focused, aggregated web analytics (such as Vercel Web Analytics) to monitor generic page hits, country origins, and browser versions. These scripts do not log document details, filenames, or individual user behavior, and do not track you across external networks.',
  },
  {
    num: '04',
    title: 'Contact & Source Code',
    body: null,
    link: true,
  },
];

const flow = [
  { step: '01', title: 'Document Loading', desc: "You drop a PDF. The browser File API reads it into your tab's isolated sandbox memory (RAM). Nothing is transmitted." },
  { step: '02', title: 'Theme Rendering', desc: 'Each page is drawn onto an HTML5 canvas. The HSL lightness inversion filter processes pixels in real-time on your local GPU.' },
  { step: '03', title: 'Reading History', desc: 'Recent file metadata (title + page position) is stored in IndexedDB locally. Never synced to cloud. Clearable in one click.' },
  { step: '04', title: 'Download', desc: 'Clicking download triggers client-side PDF assembly. The themed file is saved directly to your device via a browser-generated URL.' },
];

export default function PrivacyPolicy() {
  const lastUpdated = 'June 21, 2026';

  return (
    <>
      <Helmet>
        <title>Privacy Policy | Night PDF — 100% Local Dark Mode PDF Reader</title>
        <meta name="description" content="Night PDF Privacy Policy. All processing is local. No uploads. No tracking. Your documents never leave your device." />
        <link rel="canonical" href="https://pdf.theshivaji.in/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Night PDF" />
        <meta property="og:description" content="Night PDF Privacy Policy. All processing is local. No uploads. No tracking. Your documents never leave your device." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          "name": "Privacy Policy | Night PDF",
          "url": "https://pdf.theshivaji.in/privacy-policy",
          "publisher": { "@type": "Organization", "name": "Night PDF" },
        })}</script>
      </Helmet>

      <main className="bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ── Hero ── */}
        <section className="relative isolate overflow-hidden px-6 pt-24 pb-16 text-center sm:px-8">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[480px] w-[480px] rounded-full bg-white/[0.012] blur-[100px]" />
          </div>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)', backgroundSize: '48px 48px' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-8">
              Privacy & Trust
            </span>
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent leading-none pb-2"
            >
              Privacy Policy
            </h1>
            <p className="mt-4 text-[12px] text-zinc-600">Last Updated: {lastUpdated}</p>
            <p className="mt-6 text-base text-zinc-400 max-w-lg mx-auto leading-relaxed font-light">
              Privacy is not a feature toggle — it is the core architectural foundation of Night PDF.
            </p>
          </motion.div>
        </section>

        {/* ── Pillars ── */}
        <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="group rounded-2xl border border-white/[0.07] bg-zinc-950 p-7 hover:border-white/[0.14] hover:bg-zinc-900/60 transition-all duration-200"
              >
                <div className="mb-5 h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-300 group-hover:text-white transition-colors">
                  {p.icon}
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-bold text-white mb-2">{p.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Data Flow Timeline ── */}
        <section className="mx-auto max-w-4xl px-6 sm:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/[0.07] bg-zinc-950 p-8 sm:p-12"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-600 mb-8">
              How Your Data Flows (Locally)
            </p>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-6 top-2 bottom-2 w-px bg-white/[0.06]" />
              <div className="space-y-8">
                {flow.map((item, i) => (
                  <div key={i} className="flex gap-8 relative">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-zinc-900 text-[11px] font-bold text-zinc-400">
                      {item.step}
                    </div>
                    <div className="pt-3">
                      <h4 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[14px] font-bold text-white mb-1.5">{item.title}</h4>
                      <p className="text-[13px] text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Legal Sections ── */}
        <section className="mx-auto max-w-4xl px-6 sm:px-8 pb-16 space-y-4">
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-white/[0.07] bg-zinc-950 p-8"
            >
              <div className="flex items-start gap-5">
                <span className="text-[11px] font-bold text-zinc-700 font-mono pt-0.5 shrink-0">{s.num}</span>
                <div>
                  <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[16px] font-bold text-white mb-3">{s.title}</h2>
                  {s.link ? (
                    <p className="text-[13px] text-zinc-500 leading-relaxed">
                      For questions about our client-side design, reach the project maintainer on{' '}
                      <a href="https://github.com/TheShivaji" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/20 underline-offset-2 hover:decoration-white/60 transition-all">
                        github.com/TheShivaji
                      </a>.
                    </p>
                  ) : (
                    <p className="text-[13px] text-zinc-500 leading-relaxed">{s.body}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto max-w-4xl px-6 sm:px-8 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 p-10 sm:p-14 flex flex-col sm:flex-row items-center justify-between gap-8"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/[0.015] blur-3xl" />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-2xl font-extrabold text-white mb-2">
                Your documents stay yours.
              </h2>
              <p className="text-[13px] text-zinc-500 max-w-sm">Open Night PDF — private, offline, and free. No account required.</p>
            </div>
            <Link
              to="/"
              className="relative shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black shadow-xl shadow-white/10 hover:bg-zinc-100 transition-all active:scale-95"
            >
              Open PDF Reader <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}
