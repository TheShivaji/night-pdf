import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Eye, ChevronRight, BookOpen, Check } from 'lucide-react';

export default function DarkModeVsLightMode() {
  const publishDate = "May 28, 2026";
  const title = "Dark Mode vs Light Mode Reading: The Science of Visual Comfort & Comprehension";
  const description = "Which mode is best for studying? Read our review of Dark Mode vs Light Mode reading, covering reading speed, ocular health, and text comprehension.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/dark-mode-vs-light-mode-reading";

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
    "datePublished": "2026-05-28",
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
    { id: "intro", label: "1. The Contrast Polarities" },
    { id: "light", label: "2. Positive Contrast Polarity" },
    { id: "dark", label: "3. Negative Contrast Polarity" },
    { id: "hybrid", label: "4. The Hybrid Mode Solution" },
    { id: "guidelines", label: "5. Environment Guidelines" },
    { id: "faq", label: "6. Frequently Asked Questions" }
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
                Display Tech
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              Dark Mode vs Light Mode Reading: The Science
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-zinc-400 font-light leading-relaxed">
              Does reading in dark mode harm your retention, or does light mode cause worse ocular strain? We analyze contrast polarity research, astigmatism factors, and optimal settings for reading.
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
                The debate between dark mode and light mode is often framed around personal preference. However, clinical researchers and optical engineers have studied the effects of screen polarity on eye health and cognitive performance for decades.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                In optical science, display setups are divided into two categories: <strong>Positive Contrast Polarity</strong> (Light Mode: dark characters on a light background) and <strong>Negative Contrast Polarity</strong> (Dark Mode: light characters on a dark background). Below, we analyze the biological advantages and trade-offs of each system.
              </p>
            </section>

            {/* Positive Polarity */}
            <section id="light" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                2. Light Mode (Positive Polarity)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Light mode reflects our historical experience reading printed paper—dark ink printed on a light background.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>The Science of Visual Acuity:</strong> When staring at a bright white screen, a large amount of light enters the eye. This light forces the pupil to constrict. Just like narrowing a camera lens aperture increases depth of field, pupillary constriction sharpens the edges of text, making characters easier to resolve.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>Comprehension and Speed:</strong> Multiple clinical studies confirm that in well-lit office environments, reading speed and text comprehension are slightly higher in positive polarity. Because the text is sharp and legible, the brain expends less cognitive energy decoding individual letters.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>The Downside: Screen Glare and Fatigue.</strong> In dimly lit rooms, positive polarity screens emit excessive light. This causes glare, forces the ciliary muscles to contract constantly, and suppresses melatonin secretion, disrupting your sleep cycle.
              </p>
            </section>

            {/* Negative Polarity */}
            <section id="dark" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                3. Negative Contrast Polarity (Dark Mode)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Dark mode displays light text on a dark gray or AMOLED black canvas.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>The Science of Relaxed Pupils:</strong> Because the background emits minimal light, the pupil dilates. This reduces ciliary muscle contraction in dimly lit rooms, relaxing the eye and lowering the risk of accommodation spasms.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>The Downside: Halation and Astigmatism.</strong> Staring at light text on a dark background can cause **halation** (a glowing blur around letters). Because the pupil dilates in dark mode, any minor astigmatism is magnified, making text look slightly fuzzy. The eye must work harder to resolve these blurry edges, which can lead to fatigue.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                For tools to manage these contrast ratios, read our comparison of the <Link to="/blog/best-pdf-dark-mode-tools" className="text-white underline hover:text-zinc-200">best PDF dark mode tools</Link>.
              </p>
            </section>

            {/* Hybrid Solutions */}
            <section id="hybrid" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                4. The Hybrid Mode Solution: Sepia & Dark Slate
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                If light mode is too bright and dark mode causes halation, hybrid options are often the best choice:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300 font-light text-sm">
                <li>
                  <strong>Sepia Mode:</strong> Mimics positive polarity but replaces harsh blue-white colors with a warm cream or tan tone, significantly reducing glare.
                </li>
                <li>
                  <strong>Dark Slate / Charcoal:</strong> Replaces pure AMOLED black with a dark gray background. This reduces the extreme contrast boundary, eliminating text halation.
                </li>
              </ul>
              <p className="text-zinc-300 leading-relaxed font-light">
                Compare both of these modes in our guide on <Link to="/blog/amoled-vs-sepia" className="text-white underline hover:text-zinc-200">AMOLED vs Sepia mode for reading</Link>.
              </p>
            </section>

            {/* Guidelines Box */}
            <section id="guidelines" className="scroll-mt-32">
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-3">
                <h4 className="font-display font-bold text-white text-sm">Environment Guidelines Checklist:</h4>
                <ul className="list-disc pl-5 text-xs text-zinc-400 font-light space-y-1.5 leading-relaxed">
                  <li><strong>Well-lit Offices:</strong> Use positive contrast themes (Light Mode or Sepia) to maintain visual clarity and reading speed.</li>
                  <li><strong>Dimly-lit Environments:</strong> Switch to warm Sepia to reduce blue light glare while retaining high contrast margins.</li>
                  <li><strong>Bedrooms or Pitch Darkness:</strong> Choose dark themes (Slate Gray or AMOLED black) to lower ambient luminance and safeguard sleep cycles.</li>
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Does reading in dark mode decrease reading speed?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Yes, minor speed drops have been documented in clinical studies. Because dilated pupils collect more peripheral light, text boundaries appear slightly less sharp, slowing word recognition by a small percentage.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Is dark mode bad for astigmatism?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Yes, it can cause strain. Astigmatism is an irregular curvature of the cornea or lens, which causes light distortion. A dilated pupil under dark mode settings makes this distortion more noticeable, causing white text on black backgrounds to bleed or appear blurry.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">What color combination is best for reading on screens?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Warm cream backgrounds with dark gray or dark brown text are optimal. This setup provides high contrast polarity without the blue-white glare that suppresses sleep hormones.
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
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
                <Link 
                  to="/blog/best-pdf-dark-mode-tools" 
                  className="group rounded-2xl border border-white/5 bg-zinc-950 p-6 hover:border-white/10 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">PDF Tools</span>
                    <h4 className="font-display font-bold text-white text-sm mt-1 group-hover:text-zinc-300 transition-colors">Best PDF Dark Mode Tools</h4>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white mt-4">
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
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
