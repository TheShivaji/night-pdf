import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, EyeOff, Lock, Server, Sparkles, Cpu, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
        <title>Privacy Policy | Night PDF - 100% Local Dark Mode PDF Reader</title>
        <meta name="description" content="Read the Night PDF Privacy Policy. Understand how our client-side technology ensures that your documents never leave your device. Complete offline local processing." />
        <link rel="canonical" href="https://pdf.theshivaji.in/privacy-policy" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Night PDF - 100% Local Dark Mode PDF Reader" />
        <meta property="og:description" content="Read the Night PDF Privacy Policy. Understand how our client-side technology ensures that your documents never leave your device. Complete offline local processing." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy | Night PDF",
            "description": "Read the Night PDF Privacy Policy. Understand how our client-side technology ensures that your documents never leave your device. Complete offline local processing.",
            "url": "https://pdf.theshivaji.in/privacy-policy",
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
              <Shield className="w-3 h-3 text-zinc-400" /> Compliance & Protection
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xs text-zinc-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-8 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
              At Night PDF, privacy is not a feature toggle—it is the core architectural foundation of our software. Learn how we guarantee absolute confidentiality for your documents.
            </p>
          </motion.div>
        </section>

        {/* Feature Cards Section */}
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
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">Local Processing</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                All rendering, theme switching, and document color modifications run natively inside your browser sandbox. File access is handled directly in your machine's system memory (RAM).
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">No Server Uploads</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                We maintain no remote databases or storage systems. Since we cannot accept file uploads, your sensitive textbook materials, contracts, and ebooks never leave your device.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">Complete Privacy</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                Because we do not capture or index your reading history, we have zero profiles to sell. You retain absolute ownership and control over your data footprint.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Local-flow Timeline Layout */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12"
          >
            <h2 className="font-display text-xl font-bold text-white mb-10 text-center">
              How Night PDF Works Locally: Step-by-Step Data Flow
            </h2>

            <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-10">
              
              {/* Step 1 */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 rounded-full border-2 border-white bg-black" />
                <h4 className="font-display font-bold text-white text-sm">Step 1: Document Loading</h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  When you select or drop a PDF into the browser upload box, the browser uses the HTML5 File API to read it. The file contents are loaded into the browser tab's isolated sandbox memory (RAM).
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 rounded-full border-2 border-white bg-black" />
                <h4 className="font-display font-bold text-white text-sm">Step 2: Theme Rendering</h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  The local rendering engine draws each PDF page onto an HTML5 canvas. The HSL lightness inversion filter updates the canvas pixels dynamically in real-time, executing purely on your local GPU.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 rounded-full border-2 border-white bg-black" />
                <h4 className="font-display font-bold text-white text-sm">Step 3: History Persistence</h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  If enabled, your recent file titles and current page indexes are stored inside IndexedDB locally. This data never syncs with cloud accounts, and can be cleared instantly with one click.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative pl-8">
                <div className="absolute -left-[9px] top-1.5 flex h-4 w-4 rounded-full border-2 border-white bg-black" />
                <h4 className="font-display font-bold text-white text-sm">Step 4: Compilation & Download</h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  Clicking the download button triggers a client-side assembly of PDF bytes. The final eye-friendly document is saved directly to your device via a browser-generated URL.
                </p>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Content Details Grid */}
        <section className="mx-auto max-w-4xl px-6 space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">1. Information We Do Not Collect</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              We do not collect, monitor, store, or transmit the text or metadata of any documents loaded into Night PDF. The application functions entirely locally in your web browser session. No outbound web requests containing document assets or canvas rendering coordinates are ever dispatched.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">2. Browser Storage & IndexedDB</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              To support modern reading flows (such as remembering recent files and last read pages), the application writes parameters to your browser's private local databases (IndexedDB & LocalStorage). This data is kept sandboxed on your machine. You can wipe this cache at any time using standard browser settings.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">3. Third-Party Monitoring</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              We may utilize privacy-focused, aggregated web analytics tools (like Vercel Web Analytics or cloud logging scripts) to monitor generic page hits, country origins, and browser versions. These scripts do not log document details, filenames, or unique reader habits, and do not track you across other external networks.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 space-y-4"
          >
            <h2 className="font-display text-lg font-bold text-white">4. Contacts & Repositories</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              For any questions regarding our client-side design, you can reach out to the project repository maintainer via GitHub at{" "}
              <a 
                href="https://github.com/TheShivaji" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white underline hover:text-zinc-300 transition-colors"
              >
                github.com/TheShivaji
              </a>.
            </p>
          </motion.div>

        </section>

      </main>
    </>
  );
}
