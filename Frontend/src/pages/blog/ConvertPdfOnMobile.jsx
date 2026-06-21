import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Smartphone, Check, HelpCircle } from 'lucide-react';

export default function ConvertPdfOnMobile() {
  const publishDate = "June 5, 2026";
  const title = "How to Convert PDF to Dark Mode on Mobile: Android and iOS Guide";
  const description = "Want to read documents on your phone at night? Learn how to convert PDF to dark mode on mobile using browsers, dedicated apps, and Progressive Web Apps.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/convert-pdf-to-dark-mode-on-mobile";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": "2026-06-05",
    "author": {
      "@type": "Person",
      "name": "TheShivaji",
      "url": "https://github.com/TheShivaji"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Night PDF",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pdf.theshivaji.in/cover-preview.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        
        {/* Schema Script */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/10 selection:text-white pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 px-6 py-20 sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-4">
              <span className="rounded-full bg-rose-500/10 border border-rose-500/25 px-2.5 py-0.5 font-semibold text-rose-400">
                PDF Tools
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 7 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              Convert PDF to Dark Mode on Mobile Devices
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-3xl">
              Reading bright PDF documents on mobile screens late at night causes quick eye fatigue and sleep disruptions. Learn how to convert PDFs on iOS and Android devices using native apps and offline PWAs.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col lg:flex-row gap-12">
          
          {/* Main content column */}
          <article className="flex-1 prose prose-invert max-w-none text-zinc-300 space-y-8 text-sm sm:text-base leading-relaxed">
            
            <p>
              Smartphones and tablets have become our primary reading devices for ebooks, academic studies, and business memos. However, reading PDFs on a mobile device presents unique challenges. Because mobile screens are physically closer to our eyes than desktop monitors, their luminous output and blue light concentration feel significantly more intense.
            </p>
            <p>
              Additionally, many standard mobile PDF viewers lack simple dark mode settings, displaying documents with bright white backgrounds that strain your eyes in bed. This guide walks you through the best methods to **convert PDF to dark mode on mobile** using iOS and Android options.
            </p>

            {/* iOS Guide */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display border-b border-white/5 pb-2">
                1. How to Convert PDFs to Dark Mode on iOS (iPhone & iPad)
              </h2>
              <p>
                Apple devices feature excellent accessibility toggles, though they are often buried in settings.
              </p>
              
              <div className="rounded-xl border border-white/5 bg-zinc-900/30 p-5 space-y-3">
                <h4 className="font-semibold text-white text-sm">Method A: iOS Smart Invert</h4>
                <p className="text-xs text-zinc-400">
                  This system-wide tool reverses display colors while leaving images and media in their original format.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-1">
                  <li>Open <strong>Settings</strong> &gt; <strong>Accessibility</strong> &gt; <strong>Display & Text Size</strong>.</li>
                  <li>Toggle on <strong>Smart Invert</strong>.</li>
                  <li>Open your PDF in Apple Books or Safari. Your page backgrounds will invert to black.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-white/5 bg-zinc-900/30 p-5 space-y-3">
                <h4 className="font-semibold text-white text-sm">Method B: Adobe Acrobat Mobile App</h4>
                <p className="text-xs text-zinc-400">
                  Adobe's free iOS app features a dedicated liquid layout and view settings.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-1">
                  <li>Download Adobe Acrobat from the App Store and open your PDF.</li>
                  <li>Tap the **View Settings** (page layout icon) on the top toolbar.</li>
                  <li>Toggle on **Night Mode**. The document background will switch to dark gray.</li>
                </ol>
              </div>
            </section>

            {/* Android Guide */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display border-b border-white/5 pb-2">
                2. How to Convert PDFs to Dark Mode on Android
              </h2>
              <p>
                Android offers several ways to view PDFs in dark themes depending on your brand (Samsung, Pixel, Xiaomi, etc.) and software suite.
              </p>
              
              <div className="rounded-xl border border-white/5 bg-zinc-900/30 p-5 space-y-3">
                <h4 className="font-semibold text-white text-sm">Method A: Samsung Notes (Samsung Devices)</h4>
                <p className="text-xs text-zinc-400">
                  Samsung Notes is one of the best PDF readers on Android for annotations and night reading.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-1">
                  <li>Import your PDF file into Samsung Notes.</li>
                  <li>Tap the three-dot menu icon and select <strong>Page Template</strong>.</li>
                  <li>Choose a dark template or enable the system-wide Dark Mode. Samsung Notes will automatically darken the document background while keeping colored pen strokes legible.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-white/5 bg-zinc-900/30 p-5 space-y-3">
                <h4 className="font-semibold text-white text-sm">Method B: Android Developer Settings (Force Dark Mode)</h4>
                <p className="text-xs text-zinc-400">
                  You can force all apps on Android (including basic PDF readers) to render in dark mode.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 space-y-1">
                  <li>Go to <strong>Settings</strong> &gt; <strong>About Phone</strong> and tap <strong>Build Number</strong> seven times to enable Developer Options.</li>
                  <li>Go back to settings, open <strong>Developer Options</strong>, and search for <strong>Force Dark Mode</strong> (or Override Force-Dark).</li>
                  <li>Toggle this setting on. Your default PDF readers will now show inverted white backgrounds.</li>
                </ol>
              </div>
            </section>

            {/* PWA Advantage */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display border-b border-white/5 pb-2">
                3. The PWA Advantage: Local Offline Reading
              </h2>
              <p>
                Struggling with menu trees and heavy application sizes? You can use **Night PDF** as a Progressive Web App (PWA) on your phone.
              </p>
              <p>
                Simply visit <a href="https://pdf.theshivaji.in" className="text-white underline">pdf.theshivaji.in</a> in Safari or Chrome on your phone. Tap the share sheet on iOS and select "Add to Home Screen", or click the "Install App" button in Chrome for Android. Once installed, it runs as a standalone app with no address bar, letting you read PDFs offline in AMOLED Black, Sepia, or custom themes.
              </p>
              <p>
                To learn more about optimizing screen parameters for night reading, visit our guide on <Link to="/blog/how-to-read-pdf-at-night" className="text-white underline hover:text-zinc-300">how to read PDFs at night without eye strain</Link>.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="space-y-6 pt-6 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-5">
                  <h4 className="font-semibold text-white mb-2">Does mobile dark mode save battery?</h4>
                  <p className="text-sm text-zinc-400">
                    Yes, on devices with OLED, AMOLED, or Super Retina screens (including most iPhones and premium Android phones). Because black pixels turn off completely, you save substantial battery compared to LCD screens.
                  </p>
                </div>
                
                <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-5">
                  <h4 className="font-semibold text-white mb-2">Can I open local files inside a PWA when offline?</h4>
                  <p className="text-sm text-zinc-400">
                    Yes. PWAs cache their assets locally, meaning the application logic is loaded from your device. When you select a PDF file, your browser reads it directly from your local filesystem—no internet connection is required.
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-5">
                  <h4 className="font-semibold text-white mb-2">Why are my textbook colors distorted when using Smart Invert?</h4>
                  <p className="text-sm text-zinc-400">
                    Smart Invert attempts to detect and preserve image media, but it can fail on complex vector graphics and tables. To maintain diagram color accuracy, use readers like Night PDF that apply selective lightness shifts instead of blanket color inversion.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-8 text-center mt-12 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="font-display text-xl font-bold text-white">
                Read Eye-Friendly PDFs on the Go
              </h3>
              <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto">
                No downloads or app store installs needed. Run our offline-first PWA reader on your phone and convert your PDFs in seconds.
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200"
                >
                  Open PDF Reader
                </Link>
              </div>
            </div>

          </article>
          
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="sticky top-24 rounded-xl border border-white/5 bg-zinc-900/20 p-6">
              <h3 className="font-semibold text-white text-sm mb-4">Related Guides</h3>
              <ul className="space-y-3 text-xs">
                <li>
                  <Link to="/blog/best-pdf-dark-mode-tools" className="text-zinc-400 hover:text-white transition-colors block">
                    ➔ Review of Best Dark PDF Tools
                  </Link>
                </li>
                <li>
                  <Link to="/blog/amoled-vs-sepia" className="text-zinc-400 hover:text-white transition-colors block">
                    ➔ AMOLED vs Sepia Comfort Guide
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-zinc-400 hover:text-white transition-colors block">
                    ➔ Reader Workspace General FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}
