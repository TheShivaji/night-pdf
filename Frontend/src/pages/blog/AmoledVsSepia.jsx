import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowLeft, CheckCircle, ChevronRight, BookOpen, Check } from 'lucide-react';

export default function AmoledVsSepia() {
  const publishDate = "June 15, 2026";
  const title = "AMOLED Black vs Sepia Mode: Which is Better for Your Eyes?";
  const description = "AMOLED Black vs Sepia Mode for Reading: Read our scientific comparison. Learn which display theme minimizes eye strain, blue light, and halation.";
  const canonicalUrl = "https://pdf.theshivaji.in/blog/amoled-vs-sepia";

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
    "datePublished": "2026-06-15",
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
    { id: "amoled", label: "2. AMOLED Black Mode" },
    { id: "sepia", label: "3. Sepia Mode Features" },
    { id: "comfort", label: "4. Reading Comfort Analysis" },
    { id: "table", label: "5. Direct Comparison Table" },
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
                <Clock className="w-3.5 h-3.5" /> 7 min read
              </span>
            </div>

            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-display">
              AMOLED Black vs Sepia Mode for Reading
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-zinc-400 font-light leading-relaxed">
              Should you read in pure AMOLED Black or warm Sepia paper tint? We analyze blue light emissions, contrast fatigue, power consumption, and halation to identify the healthiest theme.
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
                When choosing display themes for reading at night, the discussion usually resolves to a simple choice between Dark Mode and Light Mode. However, screen technology has evolved, giving readers options like <strong>AMOLED Black</strong> (pure black where OLED pixels turn off completely) and <strong>Sepia Mode</strong> (a warm, low-contrast cream background).
              </p>
              <p className="text-zinc-300 leading-relaxed font-light">
                Both modes have loyal proponents. Developers and programmers tend to favor AMOLED black, citing maximum contrast and battery conservation. Ebook lovers and novelists often choose Sepia, claiming it mimics physical book pages and feels softer. To understand which is better for eye safety, we must analyze the visual physics of screen rendering.
              </p>
            </section>

            {/* AMOLED Section */}
            <section id="amoled" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                Understanding AMOLED Black Mode
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                AMOLED (Active-Matrix Organic Light-Emitting Diode) displays operate by lighting each individual pixel independently. In AMOLED Black mode (background color `#000000`), the sub-pixels displaying black are shut off entirely. They emit zero light.
              </p>
              
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-2">Key Benefits:</h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-zinc-400 space-y-1 font-light leading-relaxed">
                  <li><strong>Battery Efficiency:</strong> Turning off pixels reduces panel power draw by up to 30–50% on OLED smartphones.</li>
                  <li><strong>Minimal Ambient Light:</strong> Since the screen background emits zero light, it minimizes light pollution in a dark bedroom, keeping partners undisturbed.</li>
                  <li><strong>Stark Contrast:</strong> High clarity for readers with specific vision impairments who require sharp boundaries to resolve shapes.</li>
                </ul>
              </div>
              
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>The Drawback: Halation (Ghosting).</strong> When text is rendered in high-contrast white on an absolute black canvas, it creates a severe luminance boundary. As your eyes move across the lines, your rods and cones experience rapid stimulation changes. This leaves temporary afterimages or a "ghosting" effect (halation) on the retina, especially for readers with minor astigmatism.
              </p>
            </section>

            {/* Sepia Section */}
            <section id="sepia" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                Understanding Sepia Mode
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                Sepia mode utilizes a warm, light-brown, or cream-colored background matched with dark charcoal or soft brown text. It is designed to emulate the look of printed ink on high-quality paper, such as aged books or modern e-ink displays.
              </p>
              
              <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6 space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-2">Key Benefits:</h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm text-zinc-400 space-y-1 font-light leading-relaxed">
                  <li><strong>Reduced Blue Light:</strong> Light-brown and red hues emit far lower concentrations of sleep-disrupting blue wavelengths.</li>
                  <li><strong>Soft Contrast Gradient:</strong> The transition between text and background is gentler than pure white-on-black, eliminating halation.</li>
                  <li><strong>Mimics Physical Print:</strong> Encourages natural reading speed by replicating the contrast ratios of traditional paper books.</li>
                </ul>
              </div>
              
              <p className="text-zinc-300 leading-relaxed font-light">
                <strong>The Drawback: Luminous Output.</strong> Unlike AMOLED black where the pixels are dark, a Sepia background means the display backlight is active across the entire screen. In a completely pitch-black room, this large glowing surface can still cause fatigue and glare.
              </p>
            </section>

            {/* Comfort Analysis */}
            <section id="comfort" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                Comparative Comfort Analysis
              </h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                To choose the correct setting, consider your physical reading environment:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-300 font-light text-sm">
                <li>
                  <strong>In Pitch-Black Rooms:</strong> AMOLED Black is often preferred because it reduces the overall screen illumination, though a soft dark slate or Dracula purple theme is even better to avoid white-on-black halation.
                </li>
                <li>
                  <strong>In Dim/Warm Light (Bias Lighting):</strong> Sepia mode is superior. Because the room light matches the display's color temperature, the ciliary muscles don't have to adjust to disparate white levels.
                </li>
              </ul>
            </section>

            {/* Comparison Table */}
            <section id="table" className="scroll-mt-32 space-y-5">
              <h2 className="font-display text-2xl font-bold text-white border-b border-white/5 pb-2.5">
                Direct Comparison Table
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-white/5 bg-zinc-950">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/40 text-white font-semibold">
                      <th className="p-4">Visual Vector</th>
                      <th className="p-4">AMOLED Black Mode</th>
                      <th className="p-4">Sepia Reader Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-400 font-light">
                    <tr>
                      <td className="p-4 font-semibold text-white">Background Color</td>
                      <td className="p-4">Pure Black (#000000)</td>
                      <td className="p-4">Warm Cream/Tan (#F4ECD8)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Text Contrast</td>
                      <td className="p-4">Very High (High Luminosity)</td>
                      <td className="p-4">Balanced Soft Dark Brown</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Blue Light Output</td>
                      <td className="p-4">Moderate (Depends on text color)</td>
                      <td className="p-4">Very Low (Warm wavelengths)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Power Saving (OLED)</td>
                      <td className="p-4">Maximum (Pixels off)</td>
                      <td className="p-4">Minimal (Backlight active)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Halation & Astigmatism</td>
                      <td className="p-4">High risk of glare ghosting</td>
                      <td className="p-4">Very low risk</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-white">Best Environment</td>
                      <td className="p-4">Complete darkness</td>
                      <td className="p-4">Low ambient warm light</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-32 space-y-6 pt-10 border-t border-white/5">
              <h2 className="font-display text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Does dark mode save battery on LCD displays?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    No. Liquid Crystal Displays (LCDs) use a global backlight that illuminates the entire panel regardless of pixel colors. AMOLED power savings are only realized on OLED, AMOLED, and Super AMOLED screens.
                  </p>
                </div>
                
                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Why does white text on AMOLED black look blurry?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    This is caused by astigmatism or the eye's difficulty in focusing on bright narrow fonts contrasted against deep black backgrounds. Swapping to a lower-contrast theme like Sepia or Slate solves this immediately.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-zinc-950 p-6">
                  <h4 className="font-display font-bold text-white text-sm mb-2">Which mode is best for studying textbook diagrams?</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    Sepia is highly superior for diagrams. AMOLED black inversion algorithms often invert colored shapes incorrectly, turning blue charts red or yellow. Sepia preserves normal color hierarchies with warm contrast.
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
