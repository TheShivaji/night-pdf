import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Check, X, ShieldAlert, BookOpen, ChevronRight } from 'lucide-react';

export default function BestPdfDarkModeTools() {
  const publishDate = "June 18, 2026";
  const title = "Best PDF Dark Mode Tools: Online, Offline, and Browser Readers Compared";
  const description = "Looking for the best PDF dark mode tools? Compare top PDF readers, web converters, and browser extensions for night reading with detailed pros and cons.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/best-pdf-dark-mode-tools";

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
    "datePublished": "2026-06-18",
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
    { id: "intro", label: "1. The PDF Dark Mode Challenge" },
    { id: "nightpdf", label: "2. Night PDF (Web / PWA)" },
    { id: "adobe", label: "3. Adobe Acrobat Reader" },
    { id: "foxit", label: "4. Foxit PDF Reader" },
    { id: "extensions", label: "5. Browser Extensions" },
    { id: "warning", label: "6. Online Privacy Warnings" },
    { id: "faq", label: "7. Frequently Asked Questions" }
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
                <Clock className="w-3.5 h-3.5" /> 9 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              Best PDF Dark Mode Tools Compared
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-zinc-400 font-light leading-relaxed">
              Struggling to read bright PDFs on your screens? We review the top desktop software, web tools, and browser extensions for converting PDF files into eye-friendly dark and sepia modes.
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
                Most standard e-readers and office suites come with dark mode out of the box, but PDFs remain a persistent challenge. Because PDF files are compiled as rigid layout containers where color coordinates and positions are fixed, simply inverting the display doesn't work. Doing so frequently results in inverted colors on diagrams, unreadable black text on dark backgrounds, or pixelated images.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                To solve this, developers have created various tools—ranging from offline desktop suites and browser extensions to web-based processors. Below, we break down and compare the best PDF dark mode tools available in 2026.
              </p>
            </section>

            {/* Tool 1 */}
            <section id="nightpdf" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                2. Night PDF (Web / PWA)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Night PDF is a modern web-based Progressive Web App designed specifically to address the compromises of cloud-based converters and screen shaders. Rather than applying a blanket invert filter, Night PDF runs HSL selective color lightness shift calculations directly in the browser's GPU.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-400" /> Pros
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>100% Client-side: Your private files never upload to any remote server.</li>
                    <li>8 gorgeous custom eye-friendly themes including AMOLED Black and Sepia.</li>
                    <li>Native transparent text selection and copy support (maintains search index).</li>
                    <li>Progressive Web App support: works entirely offline once cached.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-zinc-400" /> Cons
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>Does not support editing or reflowing original PDF text coordinates.</li>
                    <li>Performance is limited by the system's local RAM for extremely large files (1GB+).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tool 2 */}
            <section id="adobe" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                3. Adobe Acrobat Reader (Desktop App)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Adobe Acrobat remains the enterprise benchmark for document interaction. Tucked deep in its accessibility preferences is a color-shifting engine designed for vision-impaired users. By navigating to <em>Edit &gt; Preferences &gt; Accessibility</em>, users can check "Replace Document Colors" and choose custom high-contrast color pairs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-400" /> Pros
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>Extremely robust: easily handles multi-gigabyte blueprints and manuals.</li>
                    <li>Comprehensive editing, annotation, and digital signing capabilities.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-zinc-400" /> Cons
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>Convoluted setting navigation; requires multiple menu clicks.</li>
                    <li>Often distorts colored vector lines and charts in technical sheets.</li>
                    <li>Highly bloated desktop footprint; constant updates and license prompts.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tool 3 */}
            <section id="foxit" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                4. Foxit PDF Reader (Desktop App)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Foxit PDF Reader is a popular lightweight desktop alternative to Adobe. It features a dedicated night mode toggle situated directly in the View menu, making it far easier to activate than Acrobat's counterpart.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-400" /> Pros
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>One-click toggle located on the top ribbon menu.</li>
                    <li>Custom color profiles available for background and text values.</li>
                    <li>Relatively fast loading times compared to Adobe Acrobat.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-zinc-400" /> Cons
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>Desktop-only; lacks robust synchronization with mobile layouts.</li>
                    <li>Recent versions include promotional ads and upsells to paid editions.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tool 4 */}
            <section id="extensions" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                5. Browser Extensions (e.g. Dark Reader)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                For users who prefer reading PDFs inside Chrome or Firefox tabs, dark mode extensions like <em>Dark Reader</em> apply global CSS filter sheets. These extensions attempt to detect the document context and reverse light intensities.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-zinc-400" /> Pros
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>Works seamlessly across all web pages and inline PDFs.</li>
                    <li>Highly customizable contrast, brightness, and grayscale sliders.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-zinc-400" /> Cons
                  </h4>
                  <ul className="space-y-2.5 text-xs text-zinc-400 font-light leading-relaxed">
                    <li>Severe scrolling lag on medium-to-large PDFs due to CSS filter recalculations.</li>
                    <li>Struggles with color accuracy: often converts diagrams into inverted negatives.</li>
                    <li>Can conflict with native browser PDF reader controls.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy Warning Callout */}
            <section id="warning" className="scroll-mt-32">
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 flex gap-4 text-sm text-zinc-400 font-light leading-relaxed">
                <ShieldAlert className="w-6 h-6 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">Security Alert:</strong> Many basic web search results point to cloud converters where you upload a PDF to get an inverted version back. Storing legal papers, business audits, or private records on third-party servers raises severe data leak vulnerabilities. Always prefer offline apps or client-side web tools that process files locally.
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Can dark mode tools convert scanned image-only PDFs?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Yes. Night PDF and screen filters can invert scanned images because they process pixels on the rendering canvas. However, standard text search and selection will not work on scanned files unless you run an OCR (Optical Character Recognition) processor first.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Why do some dark mode converters run so slowly on large PDF files?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    PDFs are complex and render on request. Storing entire inverted pixel coordinates of a 500-page book consumes gigabytes of memory. Night PDF resolves this by only rendering the currently active pages in RAM, freeing memory dynamically as you scroll.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Does converting a PDF to dark mode reduce the file's resolution?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    It depends on the tool. Many web converters rasterize pages to low-quality JPEG images to apply the inversion, resulting in blurry text. Night PDF processes vector layers at 2.0x or 3.0x scale (High-DPI), maintaining pixel-perfect sharpness during rendering.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Articles Section */}
            <section className="pt-10 border-t border-white/5 space-y-6">
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-zinc-500">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/blog/how-to-read-pdf-at-night" 
                  className="group rounded-2xl border border-white/5 bg-zinc-950 p-6 hover:border-white/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Reading Tips</span>
                    <h4 className="font-display font-bold text-white text-sm mt-1 group-hover:text-zinc-300 transition-colors">How to Read PDFs at Night</h4>
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
