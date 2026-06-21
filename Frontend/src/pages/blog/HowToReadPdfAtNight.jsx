import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, BookOpen, AlertCircle, CheckCircle, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToReadPdfAtNight() {
  const publishDate = "June 21, 2026";
  const title = "How to Read PDFs at Night Without Eye Strain: The Ultimate Guide";
  const description = "Do your eyes hurt reading PDFs at night? Discover the science of screen glare, how blue light disrupts sleep, and how to read PDFs comfortably using dark mode converters.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/how-to-read-pdf-at-night";

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
    "datePublished": "2026-06-21",
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
    { id: "biology", label: "1. The Biology of Late-Night Reading" },
    { id: "settings", label: "2. Display Calibration Rules" },
    { id: "software", label: "3. Software Inversion Technology" },
    { id: "hardware", label: "4. Ambient Light Ergonomics" },
    { id: "advantage", label: "5. The Night PDF Advantage" },
    { id: "habits", label: "6. Practical Vision Habits" },
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
                Reading Tips
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {publishDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 8 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              How to Read PDFs at Night Without Eye Strain
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-zinc-400 font-light leading-relaxed">
              Do your eyes burn, water, or feel dry when reading digital books or study notes late at night? Learn the visual science of digital fatigue and how to customize your PDF reader settings for comfortable night-time sessions.
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
            
            {/* Section 1 */}
            <section id="biology" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                1. The Biology of Late-Night Screen Reading
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Reading text on physical paper depends on reflected ambient light. Conversely, reading on smartphones, tablets, or computers requires staring directly at an active light-emitting source. When reading bright documents in a dark room, your eyes are subjected to two primary stressors: high-contrast glare and blue light wavelengths.
              </p>
              
              {/* Quote Block */}
              <blockquote className="border-l-2 border-white pl-6 py-2 my-6 font-display italic text-zinc-400 font-light text-base">
                "Staring at a light-emitting screen in pitch darkness creates a contrast mismatch that triggers rapid pupillary fluctuations, leading directly to ciliary accommodation fatigue."
              </blockquote>

              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>Melatonin Suppression:</strong> The human circadian rhythm is regulated by photoreceptive cells in the retina containing melanopsin. These cells are extremely sensitive to short-wavelength blue light (roughly 460–480 nm). Staring at a bright white PDF sends signals to the brain's suprachiasmatic nucleus, suppressing melatonin production. This delays sleep onset, compromises sleep architecture, and leaves you fatigued the following morning.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>Contrast Imbalance & Pupillary Stress:</strong> When your environment is dark, your pupils dilate to let in maximum light. However, when you stare at a bright, luminous white PDF container, the localized brightness forces the pupil to constrict. This physiological conflict—dilation for the room, constriction for the screen—causes the ciliary muscles inside the eye to fatigue rapidly, leading to accommodation spasm, headache, and blurred vision.
              </p>
            </section>

            {/* Section 2 */}
            <section id="settings" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                2. Essential Display Calibration: Brightness & Contrast
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                The first step to reducing strain is aligning your display output with the surrounding ambient light. If your room is dimly lit, your screen brightness should be lowered accordingly.
              </p>
              
              {/* Callout Box */}
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 flex gap-4 text-sm text-zinc-400 font-light">
                <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white font-semibold">The White Card Test:</strong> Hold a blank sheet of white paper next to your monitor. If your screen looks like a light source compared to the paper, the display brightness is too high. Adjust the monitor controls until the screen white level matches the paper white level in the room.
                </div>
              </div>

              <p className="text-zinc-300 leading-relaxed font-light">
                However, simply lowering brightness reduces text contrast, which can cause squinting. To maintain readability, increase the text font scale or use sub-pixel rendering settings (like ClearType on Windows or font smoothing on macOS) to ensure that the edges of characters remain sharp.
              </p>
            </section>

            {/* Section 3 */}
            <section id="software" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                3. Software Solutions: Smart Inversion & PDF Dark Readers
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Staring at a black-on-white document exposes you to over 90% bright light. Swapping this to dark mode (light text on a dark background) reduces overall light emissions by up to 95%. However, basic color inversion utilities can ruin diagrams, images, and formulas.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                A standard invert filter turns red text to cyan, green to magenta, and converts colored graphs into unreadable negatives. To prevent this, look for tools that support <strong>Smart Inversion</strong>.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Smart inversion utilizes HSL (Hue, Saturation, Lightness) color space calculations. By calculating the lightness of the background and inverting only the luminance coordinates while leaving the hue and saturation values intact, diagrams retain their color schemes, code syntax remains syntax-highlighted, and white text glows softly against a dark slate or AMOLED black background.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Compare your current reader with other alternatives in our dedicated review of the <Link to="/blog/best-pdf-dark-mode-tools" className="text-white underline hover:text-zinc-200">best PDF dark mode tools</Link>.
              </p>
            </section>

            {/* Section 4 */}
            <section id="hardware" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                4. Ambient Light Adjustments and Ergonomics
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Software tweaks can only do so much if your physical workspace is poorly configured. Reading in absolute pitch-black is the worst possible environment for your eyes.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300 font-light text-sm">
                <li>
                  <strong>Bias Lighting:</strong> Place a warm LED strip (2700K - 3000K) behind your monitor. This raises the ambient light level directly behind the screen, minimizing visual contrast borders and relaxing ciliary eye muscles.
                </li>
                <li>
                  <strong>Screen Bar Lamps:</strong> Monitor-mounted lightbars project light downwards onto your desk without reflecting off the screen surface. This eliminates glare and provides physical task lighting.
                </li>
                <li>
                  <strong>Physical Distance:</strong> Keep your display at least 20 to 28 inches (50 to 70 cm) away from your eyes. The top of the screen should sit slightly below eye level, forcing you to look down, which keeps the eyelids lower and reduces tear evaporation.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="advantage" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                5. Why Night PDF is Tailored for Eye Comfort
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Night PDF is built from the ground up to solve the specific limitations of online file converters and browser PDF viewers.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                First, by implementing HSL selective inversion locally using HTML5 canvas, the rendering engine avoids bright white flashes when switching between pages. Second, it offers a custom warmth slider (Sepia mode) which filters out blue light at the document level, bypassing generic OS screen filters that can wash out text contrast.
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                To learn more about how AMOLED black stacks up against sepia presets for night-time reading, read our comparison on <Link to="/blog/amoled-vs-sepia" className="text-white underline hover:text-zinc-200">AMOLED vs Sepia mode for reading</Link>.
              </p>
            </section>

            {/* Section 6 */}
            <section id="habits" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                6. Vision Habits: The 20-20-20 Rule & Dry Eye Prevention
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                When reading digital PDFs, our blink rate drops by approximately 66% (from 15 times a minute to 5 times). This triggers tear film breakdown, leading to dry, burning eyes, and transient blurriness.
              </p>
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-8 space-y-4">
                <h3 className="font-display font-bold text-white text-base">Three Core Reading Habits to Form:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-zinc-400 font-light leading-relaxed">
                  <li>
                    <strong>The 20-20-20 Rule:</strong> Every 20 minutes, stop reading and look at an object at least 20 feet away for 20 seconds. This relaxes the accommodation muscles inside the eye.
                  </li>
                  <li>
                    <strong>Conscious Blinking:</strong> Make a deliberate effort to blink fully, pressing the eyelids together softly to stimulate the meibomian glands.
                  </li>
                  <li>
                    <strong>Airflow Hygiene:</strong> Ensure ceiling fans or air conditioning vents are not blowing directly onto your face, which dry out the ocular surface.
                  </li>
                </ol>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Why does reading white text on a black background sometimes cause "ghosting"?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    This visual phenomenon is called halation. It occurs when light text on dark backgrounds over-stimulates the photoreceptors, leaving an afterimage. If this occurs, try switching to a soft Sepia or Cool Slate theme to reduce the contrast ratio.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Is dark mode or sepia mode better for reading in pitch-black rooms?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Sepia or dark-slate themes are generally better than pure AMOLED black. Pure black on high-contrast white text creates a stark light boundary, worsening halation. Warm sepia mimics paper and keeps eye focus stable.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Does blue light filtering actually help with sleep, or is it a marketing myth?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Clinical studies show that blue light filtering helps mitigate sleep disruption. Restricting wavelengths below 480nm preserves natural melatonin secretion, allowing your body to transition to sleep modes naturally.
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
