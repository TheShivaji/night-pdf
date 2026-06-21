import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const summaryCards = [
  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Acceptable Content', desc: 'You hold full responsibility for files you process. Ensure you own valid copyrights for every document loaded.' },
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Local Sandbox', desc: "All functions operate on client-side JS. We don't manage cloud logs or host PDF databases." },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'No Warranty', desc: 'Night PDF is provided "as is" without guarantee of error-free rendering or inversion compatibility.' },
];

const legalSections = [
  {
    num: '01',
    title: 'Acceptance of Terms',
    body: 'By accessing, loading files into, or using the Night PDF web application (available at https://pdf.theshivaji.in), you agree to comply with and be bound by these Terms of Service. If you do not accept these parameters, you must cease using the utility.',
    warning: false,
  },
  {
    num: '02',
    title: 'Scope of Service',
    body: 'Night PDF operates as a client-side reader. It renders, processes, and shifts PDF pixel maps locally using browser canvas parameters. Because all processing is client-only, we do not host, store, share, or sync your document files.',
    warning: false,
  },
  {
    num: '03',
    title: 'User Commitments',
    body: 'You warrant that you hold all necessary licenses and copyrights to modify the visual properties of any documents you import. You shall not input files intended to disrupt client-side JS runtime or load files that violate copyright or licensing terms.',
    warning: false,
  },
  {
    num: '04',
    title: 'Intellectual Property',
    body: 'The layout, styling, codebase, and brand assets of Night PDF remain the property of the project maintainer unless open-sourced or licensed under MIT parameters. We claim no ownership over the contents of files you read or transform.',
    warning: false,
  },
  {
    num: '05',
    title: 'Disclaimers & Liability Limits',
    body: 'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL THE MAINTAINERS BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING LOSS OF DATA, FILE CORRUPTION, OR BUSINESS INTERRUPTION) ARISING OUT OF THE USE OF OR INABILITY TO USE THIS APPLICATION.',
    warning: true,
  },
];

export default function TermsOfService() {
  const lastUpdated = 'June 21, 2026';

  return (
    <>
      <Helmet>
        <title>Terms of Service | Night PDF — Eye-Friendly PDF Reader</title>
        <meta name="description" content="Terms of Service for Night PDF. Understand the terms, disclaimers, local-execution clauses, and responsibilities governing use of our PDF converter." />
        <link rel="canonical" href="https://pdf.theshivaji.in/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/terms" />
        <meta property="og:title" content="Terms of Service | Night PDF" />
        <meta property="og:description" content="Terms of Service for Night PDF. Understand the terms, disclaimers, local-execution clauses, and responsibilities governing use of our PDF converter." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          "name": "Terms of Service | Night PDF",
          "url": "https://pdf.theshivaji.in/terms",
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
              Legal Framework
            </span>
            <h1
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent leading-none pb-2"
            >
              Terms of Service
            </h1>
            <p className="mt-4 text-[12px] text-zinc-600">Last Updated: {lastUpdated}</p>
            <p className="mt-6 text-base text-zinc-400 max-w-lg mx-auto leading-relaxed font-light">
              Please read these terms carefully before using Night PDF. They establish the operational context, legal responsibilities, and disclaimers.
            </p>
          </motion.div>
        </section>

        {/* ── Summary Cards ── */}
        <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {summaryCards.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="group rounded-2xl border border-white/[0.07] bg-zinc-950 p-7 hover:border-white/[0.14] hover:bg-zinc-900/60 transition-all duration-200"
              >
                <div className="mb-5 h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-300 group-hover:text-white transition-colors">
                  {c.icon}
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[15px] font-bold text-white mb-2">{c.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Legal Sections ── */}
        <section className="mx-auto max-w-4xl px-6 sm:px-8 pb-16 space-y-4">
          {legalSections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl border p-8 ${s.warning ? 'border-amber-500/20 bg-amber-950/10' : 'border-white/[0.07] bg-zinc-950'}`}
            >
              <div className="flex items-start gap-5">
                <span className="text-[11px] font-bold text-zinc-700 font-mono pt-0.5 shrink-0">{s.num}</span>
                <div>
                  <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-[16px] font-bold text-white mb-3">
                    {s.title}
                  </h2>
                  {s.warning ? (
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" />
                      <p className="text-[12px] text-zinc-500 leading-relaxed font-mono">{s.body}</p>
                    </div>
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
                Ready to read better?
              </h2>
              <p className="text-[13px] text-zinc-500 max-w-sm">Night PDF is free, local, and respects your privacy. No account needed.</p>
            </div>
            <div className="relative flex flex-wrap gap-3 shrink-0">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[13px] font-bold text-black shadow-xl shadow-white/10 hover:bg-zinc-100 transition-all active:scale-95"
              >
                Open PDF Reader <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/privacy-policy"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-[13px] font-semibold text-zinc-300 hover:bg-white/[0.07] transition-all"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
