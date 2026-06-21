import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, Eye, Award, HelpCircle } from 'lucide-react';

export default function DarkModeVsLightMode() {
  const publishDate = "May 28, 2026";
  const title = "Dark Mode vs Light Mode Reading: The Science of Visual Comfort & Comprehension";
  const description = "Which mode is best for studying? Read our review of Dark Mode vs Light Mode reading, covering reading speed, ocular health, and text comprehension.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/dark-mode-vs-light-mode-reading";

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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mx-auto max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-4">
              <span className="rounded-full bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 font-semibold text-cyan-400">
                Display Tech
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              Dark Mode vs Light Mode Reading: The Science
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-3xl">
              Does reading in dark mode harm your retention, or does light mode cause worse ocular strain? We analyze contrast polarity research, astigmatism factors, and optimal settings for reading.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col lg:flex-row gap-12">
          
          {/* Main content column */}
          <article className="flex-1 prose prose-invert max-w-none text-zinc-300 space-y-8 text-sm sm:text-base leading-relaxed">
            
            <p>
              The debate between dark mode and light mode is often framed around personal preference. However, clinical researchers and optical engineers have studied the effects of screen polarity on eye health and cognitive performance for decades. 
            </p>
            <p>
              In optical science, display setups are divided into two categories: **Positive Contrast Polarity** (Light Mode: dark characters on a light background) and **Negative Contrast Polarity** (Dark Mode: light characters on a dark background). Below, we analyze the biological advantages and trade-offs of each system.
            </p>

            {/* Positive Polarity */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display border-b border-white/5 pb-2">
                1. Light Mode (Positive Polarity)
              </h2>
              <p>
                Light mode reflects our historical experience reading printed paper—dark ink printed on a light background. 
              </p>
              <p>
                <strong>The Science of Visual Acuity:</strong> When staring at a bright white screen, a large amount of light enters the eye. This light forces the pupil to constrict. Just like narrowing a camera lens aperture increases depth of field, pupillary constriction sharpens the edges of text, making characters easier to resolve. 
              </p>
              <p>
                <strong>Comprehension and Speed:</strong> Multiple clinical studies confirm that in well-lit office environments, reading speed and text comprehension are slightly higher in positive polarity. Because the text is sharp and legible, the brain expends less cognitive energy decoding individual letters.
              </p>
              <p>
                <strong>The Downside: Screen Glare and Fatigue.</strong> In dimly lit rooms, positive polarity screens emit excessive light. This causes glare, forces the ciliary muscles to contract constantly, and suppresses melatonin secretion, disrupting your sleep cycle.
              </p>
            </section>

            {/* Negative Polarity */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display border-b border-white/5 pb-2">
                2. Dark Mode (Negative Polarity)
              </h2>
              <p>
                Dark mode displays light text on a dark gray or AMOLED black canvas.
              </p>
              <p>
                <strong>The Science of Relaxed Pupils:</strong> Because the background emits minimal light, the pupil dilates. This reduces ciliary muscle contraction in dimly lit rooms, relaxing the eye and lowering the risk of accommodation spasms.
              </p>
              <p>
                <strong>The Downside: Halation and Astigmatism.</strong> Staring at light text on a dark background can cause **halation** (a glowing blur around letters). Because the pupil dilates in dark mode, any minor astigmatism is magnified, making text look slightly fuzzy. The eye must work harder to resolve these blurry edges, which can lead to fatigue.
              </p>
              <p>
                For tools to manage these contrast ratios, read our comparison of the <Link to="/blog/best-pdf-dark-mode-tools" className="text-white underline hover:text-zinc-300">best PDF dark mode tools</Link>.
              </p>
            </section>

            {/* The Hybrid Solution */}
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display border-b border-white/5 pb-2">
                3. The Hybrid Solution: Sepia and Dark Slate
              </h2>
              <p>
                If light mode is too bright and dark mode causes halation, hybrid options are often the best choice:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Sepia Mode:</strong> Mimics positive polarity but replaces harsh blue-white colors with a warm cream or tan tone, significantly reducing glare.
                </li>
                <li>
                  <strong>Dark Slate / Charcoal:</strong> Replaces pure AMOLED black with a dark gray background. This reduces the extreme contrast boundary, eliminating text halation.
                </li>
              </ul>
              <p>
                Compare both of these modes in our guide on <Link to="/blog/amoled-vs-sepia" className="text-white underline hover:text-zinc-300">AMOLED vs Sepia mode for reading</Link>.
              </p>
            </section>

            {/* Environmental Checklist */}
            <div className="rounded-xl border border-white/5 bg-zinc-900/30 p-5 space-y-2">
              <h4 className="font-semibold text-white text-sm">Environmental Guidelines:</h4>
              <ul className="list-disc pl-5 text-xs text-zinc-400 space-y-1">
                <li><strong>Well-lit Rooms:</strong> Use positive polarity (Light Mode or Sepia) to maximize reading speed and visual sharpness.</li>
                <li><strong>Dimly lit Rooms:</strong> Use Sepia or soft gray themes.</li>
                <li><strong>Complete Darkness:</strong> Use dark mode or AMOLED black with a slightly lowered text brightness setting to prevent halation.</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <section className="space-y-6 pt-6 border-t border-white/5">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-5">
                  <h4 className="font-semibold text-white mb-2">Does reading in dark mode decrease reading speed?</h4>
                  <p className="text-sm text-zinc-400">
                    Yes, minor speed drops have been documented in clinical studies. Because dilated pupils collect more peripheral light, text boundaries appear slightly less sharp, slowing word recognition by a small percentage.
                  </p>
                </div>
                
                <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-5">
                  <h4 className="font-semibold text-white mb-2">Is dark mode bad for astigmatism?</h4>
                  <p className="text-sm text-zinc-400">
                    Yes, it can cause strain. Astigmatism is an irregular curvature of the cornea or lens, which causes light distortion. A dilated pupil under dark mode settings makes this distortion more noticeable, causing white text on black backgrounds to bleed or appear blurry.
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-zinc-900/10 p-5">
                  <h4 className="font-semibold text-white mb-2">What color combination is best for reading on screens?</h4>
                  <p className="text-sm text-zinc-400">
                    Warm cream backgrounds with dark gray or dark brown text are optimal. This setup provides high contrast polarity without the blue-white glare that suppresses sleep hormones.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-8 text-center mt-12 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="font-display text-xl font-bold text-white">
                Customize Your Contrast Levels
              </h3>
              <p className="mt-2 text-xs text-zinc-400 max-w-md mx-auto">
                No single setting fits all eyes. Load your document into Night PDF and switch between 8 custom visual modes to find your perfect reading theme.
              </p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-black transition-all hover:bg-zinc-200"
                >
                  Start Reading Safely
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
                  <Link to="/blog/how-to-read-pdf-at-night" className="text-zinc-400 hover:text-white transition-colors block">
                    ➔ How to Read PDFs at Night
                  </Link>
                </li>
                <li>
                  <Link to="/blog/best-pdf-dark-mode-tools" className="text-zinc-400 hover:text-white transition-colors block">
                    ➔ Best PDF Dark Mode Reader Tools
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
