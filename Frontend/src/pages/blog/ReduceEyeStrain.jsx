import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, AlertCircle, Heart, ChevronRight, BookOpen, Check } from 'lucide-react';

export default function ReduceEyeStrain() {
  const publishDate = "June 10, 2026";
  const title = "5 Scientific Ways to Reduce Eye Strain While Reading PDFs on Screens";
  const description = "Do you experience headaches or dry eyes reading documents? Learn how to reduce eye strain while reading PDF files using screen tuning, biology, and dark readers.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/reduce-eye-strain-while-reading-pdf";

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
    "datePublished": "2026-06-10",
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
    { id: "intro", label: "1. Computer Vision Syndrome (CVS)" },
    { id: "polarity", label: "2. Optimize Contrast & Themes" },
    { id: "bias", label: "3. Bias Lighting & Glare" },
    { id: "rule", label: "4. The 20-20-20 Rule & Blinking" },
    { id: "ergonomics", label: "5. Ergonomic Positioning" },
    { id: "crispness", label: "6. Text Rendering Quality" },
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
                Health & Eye Care
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              Reduce Eye Strain While Reading PDFs
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-zinc-400 font-light leading-relaxed">
              Digital eye strain, or Computer Vision Syndrome, affects millions of students and professionals reading PDFs daily. Understand the clinical causes of visual fatigue and five ways to safeguard your sight.
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
                Staring at digital documents for hours is a primary driver of <strong>Computer Vision Syndrome (CVS)</strong>. Unlike reading a webpage where text reflows fluidly, PDFs are locked print layouts. They force your eyes to focus on small, static text, scroll horizontally or zoom constantly, and endure harsh, high-contrast white glares.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Common symptoms of CVS include dry, burning eyes, headaches, blurred vision, double vision, and neck or shoulder pain. Fortunately, by applying a few scientific adjustments to your display, workspace, and habits, you can dramatically lower visual stress.
              </p>
            </section>

            {/* Tip 1 */}
            <section id="polarity" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                1. Optimize Document Contrast (Dark Mode & Sepia)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                A standard light mode document emits over 90% luminance. This bright light forces your pupils to contract in dim rooms, tiring your iris muscles.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Converting your PDFs to dark mode (light text on a dark background) decreases light emission significantly. If pure white text on absolute black creates a ghosting effect (called halation), try using a warm **Sepia Mode** or a soft **Slate Gray** theme. These settings lower contrast boundaries and ease eye coordination.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                To explore the science of AMOLED black vs sepia tones, read our in-depth analysis on <Link to="/blog/amoled-vs-sepia" className="text-white underline hover:text-zinc-200">AMOLED vs Sepia mode for reading</Link>.
              </p>
            </section>

            {/* Tip 2 */}
            <section id="bias" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                2. Apply Bias Lighting and Eliminate Glare
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Staring at a screen in a pitch-black room causes severe eye fatigue because of the stark contrast between the bright monitor and the dark room.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>Bias Lighting:</strong> Placing a soft, warm LED light bar behind your monitor increases ambient lighting, smoothing the visual transition.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>Anti-Glare Positioning:</strong> Position your monitor away from direct windows or bright overhead bulbs to avoid reflections. Glare spots on the screen force your eyes to focus past the reflection, straining your eye muscles.
              </p>
            </section>

            {/* Tip 3 */}
            <section id="rule" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                3. Follow the 20-20-20 Rule and Blink Consciously
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Focusing on a screen forces your ciliary muscles to remain contracted. Over time, this leads to accommodation spasms.
              </p>
              
              {/* Callout Box */}
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 flex gap-4 text-sm text-zinc-400 font-light leading-relaxed">
                <Heart className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">The 20-20-20 Rule:</strong> Every 20 minutes, take a 20-second break to look at an object 20 feet away. This relaxes the focusing muscles and resets your eye coordination.
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>Blink Frequency:</strong> Humans blink about 15 times per minute, but this drops to 5 blinks per minute when reading screens, causing dry eyes. Make a conscious effort to blink fully to keep your eyes lubricated.
              </p>
            </section>

            {/* Tip 4 */}
            <section id="ergonomics" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                4. Ergonomic Screen Distance and Angle
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Proper screen placement reduces strain on both your eyes and your neck muscles:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300 font-light text-sm">
                <li><strong>Distance:</strong> Place your screen 20 to 28 inches (50 to 70 cm) away from your eyes—about arm's length.</li>
                <li><strong>Angle:</strong> The top of the screen should sit slightly below eye level. Looking down slightly covers more of your eyeballs, reducing tear evaporation.</li>
              </ul>
            </section>

            {/* Tip 5 */}
            <section id="crispness" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                5. Use High-Quality Local Rendering (No Blurry Text)
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Fuzzy or blurry text causes your eyes to struggle to focus, worsening strain. Many online PDF dark mode converters rasterize pages to low-quality JPEG images to apply the inversion, resulting in blurry text. Always choose readers that process pages in high definition (such as 2x or 3x scale) using vector rendering engines to ensure text remains crisp.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Compare the top choices in our guide on the <Link to="/blog/best-pdf-dark-mode-tools" className="text-white underline hover:text-zinc-200">best PDF dark mode tools</Link>.
              </p>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Why do my eyes feel drier when reading PDFs than when watching videos?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Videos feature constant movement, which naturally stimulates blinks. Reading static PDFs involves high-focus concentration, which drops your blink rate and dries out your eyes.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Do blue light glasses eliminate digital eye strain entirely?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    No. While blue light glasses block wavelengths that disrupt sleep, they do not resolve muscle fatigue from focusing at a fixed distance or dry eyes from reduced blinking.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">What display panel type is best for reducing vision fatigue?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    OLED and AMOLED screens are excellent because black backgrounds emit zero light. Alternatively, E-ink displays are the gold standard as they use reflected ambient light, but they lack support for color diagrams and videos.
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
