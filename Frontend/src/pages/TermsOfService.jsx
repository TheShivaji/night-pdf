import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle2, AlertTriangle, Scale, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  const lastUpdated = "June 21, 2026";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <Helmet>
        <title>Terms of Service | Night PDF - Eye-Friendly PDF Reader</title>
        <meta name="description" content="Read the Terms of Service for Night PDF. Understand the terms, disclaimer sections, local execution clauses, and responsibilities governing use of our PDF converter." />
        <link rel="canonical" href="https://pdf.theshivaji.in/terms" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/terms" />
        <meta property="og:title" content="Terms of Service | Night PDF - Eye-Friendly PDF Reader" />
        <meta property="og:description" content="Read the Terms of Service for Night PDF. Understand the terms, disclaimer sections, local execution clauses, and responsibilities governing use of our PDF converter." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service | Night PDF",
            "description": "Read the Terms of Service for Night PDF. Understand the terms, disclaimer sections, local execution clauses, and responsibilities governing use of our PDF converter.",
            "url": "https://pdf.theshivaji.in/terms",
            "publisher": {
              "@type": "Organization",
              "name": "Night PDF"
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white pb-32">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-24 pb-16 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 mb-8 shadow-sm">
              <Scale className="w-3 h-3 text-zinc-400" /> Terms & Framework
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="mt-4 text-xs text-zinc-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-8 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
              Please read these terms carefully. They establish the operational context, legal responsibilities, and disclaimers for using our local PDF utility.
            </p>
          </motion.div>
        </section>

        {/* Info Cards Section */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <motion.div 
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">Acceptable Content</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                You retain complete responsibility for any files processed in the reader. Ensure you hold valid copyrights or permissions to transform and read loaded PDF documents.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">Local Sandbox</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                All functions operate on client-side JS runtime. The maintainers do not manage cloud logs or host PDF databases, protecting your documents from server intercepts.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">No Warranty</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                Night PDF is provided "as is" without warranty of any kind. We do not guarantee error-free rendering or color inversion compatibility for all PDF encodings.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Legal Sections in Modern Containers */}
        <section className="mx-auto max-w-4xl px-6 space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              By accessing, loading files into, or using the Night PDF web application (available at `https://pdf.theshivaji.in`), you agree to comply with and be bound by these Terms of Service. If you do not accept these parameters, you must cease using the utility.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">2. Scope of Service</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Night PDF operates as a client-side reader. It renders, processes, and shifts PDF pixel maps locally using browser canvas parameters. Because all processing is client-only, we do not host, store, share, or sync your document files.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">3. User Commitments</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              You warrant that you hold all necessary licenses and copyrights to modify the visual properties of any documents you import. You shall not input files intended to disrupt client-side JS runtime or load files that violate copyrights or licensing terms.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">4. Intellectual Property</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              The layout, styling design system, codebase, and brand assets of Night PDF remain the property of the project maintainer, unless open-sourced or licensed under MIT parameters. We claim no ownership over the contents of files you read or transform.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">5. Disclaimers & Liability Limits</h2>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-5 flex gap-4 text-xs text-zinc-400">
              <AlertTriangle className="w-5 h-5 text-zinc-400 shrink-0" />
              <div className="leading-relaxed">
                <strong>Disclaimer of Warranties:</strong> THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL THE MAINTAINERS BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING LOSS OF DATA, FILE CORRUPTION, OR BUSINESS INTERRUPTION) ARISING OUT OF THE USE OF OR INABILITY TO USE THIS APPLICATION.
              </div>
            </div>
          </motion.div>

        </section>

      </main>
    </>
  );
}
