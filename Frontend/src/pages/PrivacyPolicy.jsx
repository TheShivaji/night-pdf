import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, EyeOff, Lock, Server } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "June 21, 2026";

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

      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/10 selection:text-white pb-20">
        {/* Hero Banner */}
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 px-6 py-16 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              At Night PDF, privacy is not a setting—it is the foundation of our architecture. Because all conversion logic executes locally, your documents never touch a server.
            </p>
          </div>
        </section>

        {/* Pillars of local privacy */}
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-semibold text-white text-sm">Local Execution</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Everything runs inside your browser using JavaScript and HTML5 Canvas.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white">
                <EyeOff className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-semibold text-white text-sm">No Server Uploads</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                We have no backend storage servers. Files are read straight from your RAM.
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-zinc-900/20 p-6 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-semibold text-white text-sm">Zero Data Sales</h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Since we do not collect or transmit documents, we have nothing to sell or share.
              </p>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="mx-auto max-w-3xl px-6 mt-6">
          <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm leading-relaxed">
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">1. Information We Do Not Collect</h2>
              <p>
                We do not collect, store, index, or transmit the contents of any PDF files you load into Night PDF. When you load a PDF, the file is read and processed in your device's random-access memory (RAM) and rendered visually using the HTML5 Canvas API. No remote connection is established to transfer the document or its text layer data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">2. Browser-Based Data & Local Storage</h2>
              <p>
                To provide a premium and fluid reading experience, Night PDF uses local browser technologies such as IndexedDB and LocalStorage:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  <strong>Recent Files Checklist:</strong> A list of your recently opened PDF filenames, file sizes, and your last read page index is stored in your browser's private database (IndexedDB) locally on your device.
                </li>
                <li>
                  <strong>PWA Service Worker:</strong> Our offline caching worker stores static resources (JavaScript, CSS, fonts, SVG graphics) locally in browser Cache Storage to allow fully offline functionality.
                </li>
              </ul>
              <p className="mt-3">
                All of this data remains strictly on your device. You can clear this information instantly at any time by clearing your browser's site settings or by clicking "Clear File History" inside the application.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">3. Third-Party Services and Analytics</h2>
              <p>
                We may use lightweight, privacy-focused web analytics services (such as Vercel Web Analytics or cloud logging scripts) to monitor high-level metrics like pageviews, generic location (country level), and browser types. These analytics do not record document details, individual text entries, or private reader metadata, and do not track your activity across other sites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">4. Children's Privacy</h2>
              <p>
                Because Night PDF does not collect any personal information or document data, our application is inherently safe for children, students, and users of all age ranges.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">5. Security of Processing</h2>
              <p>
                By executing all document theme inversion operations inside the sandbox of your local browser session, your documents are shielded from external web intercepts and server-side hacks. This makes Night PDF significantly more secure for legal contracts, corporate briefs, and private study notes than any server-based conversion tool.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">6. Your Rights</h2>
              <p>
                You have full control over your data. Since all files remain in your possession, you exercise absolute rights over deletion, correction, and transfer simply by closing the tab or purging your local browser cookies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">7. Contact Information</h2>
              <p>
                If you have questions or feedback regarding this privacy-first architecture, please reach out to the project repository maintainer via GitHub at{" "}
                <a 
                  href="https://github.com/TheShivaji" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white underline hover:text-zinc-300 transition-colors"
                >
                  github.com/TheShivaji
                </a>.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
