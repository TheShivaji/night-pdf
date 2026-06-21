import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = "June 21, 2026";

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

      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/10 selection:text-white pb-20">
        {/* Hero Banner */}
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 px-6 py-16 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              Last Updated: {lastUpdated}
            </p>
            <p className="mt-6 text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully. They establish the operational context and disclaimers for using our 100% browser-based PDF utility.
            </p>
          </div>
        </section>

        {/* Overview cards */}
        <section className="mx-auto max-w-4xl px-6 py-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/20 p-5">
              <div className="rounded-lg bg-white/5 p-2 text-white border border-white/10 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Acceptable Use</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">
                  Users retain absolute rights over their PDF files. You are responsible for ensuring your files do not violate third-party copyright laws.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/20 p-5">
              <div className="rounded-lg bg-white/5 p-2 text-white border border-white/10 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">No Warranty Disclaimer</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">
                  Night PDF is provided "as is" and "as available". We do not guarantee error-free HSL inversion for every document format.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="mx-auto max-w-3xl px-6 mt-6">
          <div className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm leading-relaxed">
            
            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">1. Acceptance of Terms</h2>
              <p>
                By accessing, downloading, or using the Night PDF application (available at{" "}
                <a href="https://pdf.theshivaji.in" className="text-white underline hover:text-zinc-300">
                  pdf.theshivaji.in
                </a>
                ), you agree to comply with and be bound by these Terms of Service. If you do not agree, you must immediately terminate use of the service.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">2. Description of Service</h2>
              <p>
                Night PDF is a client-side utility program that helps users read documents in dark-mode themes. The application operates entirely locally inside the user's browser environment. The software allows reading, inverting document canvas matrices, and exporting (downloading) modified PDF files. Because of this client-only workflow, we do not provide server-side file hosting, sharing, or synchronization databases.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">3. User Responsibility & Acceptable Use</h2>
              <p>
                You represent and warrant that you hold all necessary copyrights, licenses, or permissions to read, transform, or modify any PDF files you load into the tool. You shall not load any documents containing:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Viruses, Trojans, or malicious code designed to disrupt client-side JS runtime.</li>
                <li>Content that violates copyright laws or licenses that explicitly prohibit color shifting or format modifications.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">4. Intellectual Property</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Night PDF Codebase:</strong> The structure, code logic, styling systems, and logos are the property of the project creator, unless open-sourced or licensed under standard MIT parameters.
                </li>
                <li>
                  <strong>Your Documents:</strong> We do not assert any intellectual property ownership or claims over the PDFs you load. You retain 100% ownership, control, and intellectual rights over your files.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">5. Disclaimer of Warranties</h2>
              <div className="rounded-lg border border-white/10 bg-zinc-900/50 p-4 flex gap-3 text-zinc-400 text-xs">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY EXPRESS OR IMPLIED WARRANTY OF ANY KIND. THE MAINTAINERS OF NIGHT PDF DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NONINFRINGEMENT. WE DO NOT GUARANTEE THAT THE APPLICATION WILL CORRECTLY PROCESS OR RENDER ALL PDF ENCODINGS, FONTS, OR IMAGE MAPPINGS.
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">6. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL THE MAINTAINERS OR CONTRIBUTORS OF NIGHT PDF BE LIABLE FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA, PROFITS, FILE CORRUPTION, OR BUSINESS INTERRUPTION) ARISING OUT OF THE USE OF OR INABILITY TO USE THIS APPLICATION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ALL DATA STORAGE AND PROCESSING RISKS ARE SOLELY BORNE BY THE USER.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">7. Modifications to the Service and Terms</h2>
              <p>
                We reserve the right to modify, pause, or terminate the application or update these Terms of Service at any time without notice. Continued use of the website following changes indicates your binding acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white mb-3 font-display">8. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of the jurisdiction of the maintainer, without giving effect to any principles of conflicts of law.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
