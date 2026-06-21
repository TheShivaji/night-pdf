import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Smartphone, CheckCircle, ChevronRight, BookOpen, Check } from 'lucide-react';

export default function ConvertPdfOnMobile() {
  const publishDate = "June 5, 2026";
  const title = "How to Convert PDF to Dark Mode on Mobile: Android and iOS Guide";
  const description = "Want to read documents on your phone at night? Learn how to convert PDF to dark mode on mobile using browsers, dedicated apps, and Progressive Web Apps.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/convert-pdf-to-dark-mode-on-mobile";

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScrollable = documentHeight - windowHeight;
      if (totalScrollable > 0) {
        setScrollPercent((scrollTop / totalScrollable) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const tocItems = [
    { id: "intro", label: "1. Mobile Reading Glare" },
    { id: "ios", label: "2. iOS (iPhone & iPad) Guide" },
    { id: "android", label: "3. Android Devices Guide" },
    { id: "pwa", label: "4. The PWA Offline Solution" },
    { id: "faq", label: "5. Frequently Asked Questions" }
  ];

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

      {/* Reading Progress Indicator */}
      <div className="fixed top-20 left-0 w-full h-[2px] bg-zinc-950 z-50">
        <div 
          className="h-full bg-white transition-all duration-75" 
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      <main className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white pb-32">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-24 pb-16 sm:px-8 border-b border-white/5 bg-gradient-to-b from-zinc-950 via-black to-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-4xl relative z-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-5">
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-semibold text-zinc-300">
                PDF Tools
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 7 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              Convert PDF to Dark Mode on Mobile
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-zinc-400 font-light leading-relaxed">
              Reading bright PDF documents on mobile screens late at night causes quick eye fatigue and sleep disruptions. Learn how to convert PDFs on iOS and Android devices using native apps and offline PWAs.
            </p>
          </div>
        </section>

        {/* Article Layout Container */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 flex gap-16 relative">
          
          {/* Sticky Left Table of Contents */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 p-6 rounded-2xl border border-white/5 bg-zinc-950">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-400 mb-5">
                On this page
              </h3>
              <nav className="space-y-3.5">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs text-zinc-500 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Reading Core Column */}
          <div className="flex-1 max-w-[800px] space-y-12">
            
            <section id="intro" className="scroll-mt-32 space-y-5">
              <p className="text-zinc-300 leading-relaxed font-light">
                Smartphones and tablets have become our primary reading devices for ebooks, academic studies, and business memos. However, reading PDFs on a mobile device presents unique challenges. Because mobile screens are physically closer to our eyes than desktop monitors, their luminous output and blue light concentration feel significantly more intense.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Additionally, many standard mobile PDF viewers lack simple dark mode settings, displaying documents with bright white backgrounds that strain your eyes in bed. This guide walks you through the best methods to convert PDF to dark mode on mobile using iOS and Android options.
              </p>
            </section>

            {/* iOS Guide */}
            <section id="ios" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                2. How to Convert PDFs to Dark Mode on iOS (iPhone & iPad)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Apple devices feature excellent accessibility toggles, though they are often buried in settings.
              </p>
              
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-3">
                <h4 className="font-display font-bold text-white text-sm">Method A: iOS Smart Invert</h4>
                <p className="text-xs text-zinc-400 font-light">
                  This system-wide tool reverses display colors while leaving images and media in their original format.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 font-light space-y-1">
                  <li>Open <strong>Settings</strong> &gt; <strong>Accessibility</strong> &gt; <strong>Display & Text Size</strong>.</li>
                  <li>Toggle on <strong>Smart Invert</strong>.</li>
                  <li>Open your PDF in Apple Books or Safari. Your page backgrounds will invert to black.</li>
                </ol>
              </div>

              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-3">
                <h4 className="font-display font-bold text-white text-sm">Method B: Adobe Acrobat Mobile App</h4>
                <p className="text-xs text-zinc-400 font-light">
                  Adobe's free iOS app features a dedicated liquid layout and view settings.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 font-light space-y-1">
                  <li>Download Adobe Acrobat from the App Store and open your PDF.</li>
                  <li>Tap the **View Settings** (page layout icon) on the top toolbar.</li>
                  <li>Toggle on **Night Mode**. The document background will switch to dark gray.</li>
                </ol>
              </div>
            </section>

            {/* Android Guide */}
            <section id="android" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                3. How to Convert PDFs to Dark Mode on Android
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Android offers several ways to view PDFs in dark themes depending on your brand (Samsung, Pixel, Xiaomi, etc.) and software suite.
              </p>
              
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-3">
                <h4 className="font-display font-bold text-white text-sm">Method A: Samsung Notes (Samsung Devices)</h4>
                <p className="text-xs text-zinc-400 font-light">
                  Samsung Notes is one of the best PDF readers on Android for annotations and night reading.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 font-light space-y-1">
                  <li>Import your PDF file into Samsung Notes.</li>
                  <li>Tap the three-dot menu icon and select <strong>Page Template</strong>.</li>
                  <li>Choose a dark template or enable the system-wide Dark Mode. Samsung Notes will automatically darken the document background.</li>
                </ol>
              </div>

              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-3">
                <h4 className="font-display font-bold text-white text-sm">Method B: Android Developer Settings (Force Dark Mode)</h4>
                <p className="text-xs text-zinc-400 font-light">
                  You can force all apps on Android (including basic PDF readers) to render in dark mode.
                </p>
                <ol className="list-decimal pl-5 text-xs text-zinc-400 font-light space-y-1">
                  <li>Go to <strong>Settings</strong> &gt; <strong>About Phone</strong> and tap <strong>Build Number</strong> seven times.</li>
                  <li>Go back to settings, open <strong>Developer Options</strong>, and search for <strong>Force Dark Mode</strong>.</li>
                  <li>Toggle this setting on. Your default PDF readers will now show inverted white backgrounds.</li>
                </ol>
              </div>
            </section>

            {/* PWA Advantage */}
            <section id="pwa" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                4. The PWA Advantage: Local Offline Reading
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Struggling with menu trees and heavy application sizes? You can use **Night PDF** as a Progressive Web App (PWA) on your phone.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Simply visit <a href="https://pdf.theshivaji.in" className="text-white underline">pdf.theshivaji.in</a> in Safari or Chrome on your phone. Tap the share sheet on iOS and select "Add to Home Screen", or click the "Install App" button in Chrome for Android. Once installed, it runs as a standalone app with no address bar, letting you read PDFs offline in AMOLED Black, Sepia, or custom themes.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                To learn more about optimizing screen parameters for night reading, visit our guide on <Link to="/blog/how-to-read-pdf-at-night" className="text-white underline hover:text-zinc-200">how to read PDFs at night without eye strain</Link>.
              </p>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Does mobile dark mode save battery?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Yes, on devices with OLED, AMOLED, or Super Retina screens (including most iPhones and premium Android phones). Because black pixels turn off completely, you save substantial battery compared to LCD screens.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Can I open local files inside a PWA when offline?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Yes. PWAs cache their assets locally, meaning the application logic is loaded from your device. When you select a PDF file, your browser reads it directly from your local filesystem—no internet connection is required.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Why are my textbook colors distorted when using Smart Invert?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Smart Invert attempts to detect and preserve image media, but it can fail on complex vector graphics and tables. To maintain diagram color accuracy, use readers like Night PDF that apply selective lightness shifts instead of blanket color inversion.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Articles Section */}
            <section className="pt-10 border-t border-white/5 space-y-6">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-500">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/blog/best-pdf-dark-mode-tools" 
                  className="group rounded-2xl border border-white/5 bg-zinc-950 p-6 hover:border-white/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">PDF Tools</span>
                    <h4 className="font-display font-bold text-white text-sm mt-1 group-hover:text-zinc-300 transition-colors">Best PDF Dark Mode Tools</h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white mt-4">
                    Read Article <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
                <Link 
                  to="/blog/amoled-vs-sepia" 
                  className="group rounded-2xl border border-white/5 bg-zinc-950 p-6 hover:border-white/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Display Tech</span>
                    <h4 className="font-display font-bold text-white text-sm mt-1 group-hover:text-zinc-300 transition-colors">AMOLED vs Sepia Mode</h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white mt-4">
                    Read Article <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </section>

            {/* CTA Block After Article */}
            <div className="rounded-3xl border border-white/5 bg-gradient-to-b from-zinc-900/50 to-black p-10 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute -right-24 -top-24 w-48 h-48 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                Ready to Read PDFs Without Eye Strain?
              </h3>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-white" /> 100% Private
                </span>
                <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-white" /> Dark Mode
                </span>
                <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-white" /> Works Offline
                </span>
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-xs font-bold text-black hover:bg-zinc-200 transition-all active:scale-98"
                >
                  Open Night PDF
                </Link>
              </div>
            </div>

          </div>
          
        </div>
      </main>
    </>
  );
}
