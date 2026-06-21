import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const articles = [
  {
    title: "How to Read PDF at Night Without Eye Strain",
    slug: "how-to-read-pdf-at-night",
    category: "Reading Tips",
    readTime: "5 min read",
    date: "June 21, 2026",
    excerpt: "Reading bright PDFs in dark rooms causes severe eye strain, fatigue, and dry eyes. Learn the best settings, lighting advice, and inversion tools to optimize your late-night reading sessions.",
    gradient: "from-amber-500/10 to-zinc-950"
  },
  {
    title: "Best PDF Dark Mode Converter Tools (Online & Offline)",
    slug: "best-pdf-dark-mode-tools",
    category: "PDF Tools",
    readTime: "6 min read",
    date: "June 18, 2026",
    excerpt: "A comprehensive comparison of the best PDF dark mode converters, browser extensions, and readers. Discover which tool handles smart color preservation and preserves diagrams.",
    gradient: "from-blue-500/10 to-zinc-950"
  },
  {
    title: "AMOLED Black vs Sepia Mode: Which is Better for Your Eyes?",
    slug: "amoled-vs-sepia",
    category: "Display Tech",
    readTime: "4 min read",
    date: "June 15, 2026",
    excerpt: "Should you use pure black AMOLED dark mode or warm paper sepia for night reading? We analyze screen tech, blue light emission, and visual contrast to find the optimal theme.",
    gradient: "from-purple-500/10 to-zinc-950"
  },
  {
    title: "5 Scientific Ways to Reduce Eye Strain While Reading PDFs",
    slug: "reduce-eye-strain-while-reading-pdf",
    category: "Health & Eye Care",
    readTime: "5 min read",
    date: "June 10, 2026",
    excerpt: "Long hours studying PDFs on laptop screens can lead to Computer Vision Syndrome (CVS). Implement these evidence-based guidelines and settings to safeguard your vision health.",
    gradient: "from-emerald-500/10 to-zinc-950"
  },
  {
    title: "How to Convert PDF to Dark Mode on Mobile (Android & iOS)",
    slug: "convert-pdf-to-dark-mode-on-mobile",
    category: "PDF Tools",
    readTime: "4 min read",
    date: "June 05, 2026",
    excerpt: "Reading PDFs on phone screens at night is frustrating. Learn how to convert PDFs to dark mode on Android and iOS devices using clean browser shortcuts and client apps.",
    gradient: "from-rose-500/10 to-zinc-950"
  },
  {
    title: "Dark Mode vs Light Mode: The Science of Reading Comprehension",
    slug: "dark-mode-vs-light-mode-reading",
    category: "Display Tech",
    readTime: "7 min read",
    date: "May 28, 2026",
    excerpt: "Does reading white text on a black background harm your reading speed or comprehension? We dissect clinical studies on typography contrast, glare, and information retention.",
    gradient: "from-cyan-500/10 to-zinc-950"
  }
];

export default function BlogListing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <>
      <Helmet>
        <title>Night PDF Blog - Eye-Friendly Reading Guides & PDF Dark Mode Tips</title>
        <meta name="description" content="Read expert guides on how to reduce eye strain, compare AMOLED black and sepia themes, convert PDFs on mobile, and read PDFs comfortably at night." />
        <link rel="canonical" href="https://pdf.theshivaji.in/blog" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/blog" />
        <meta property="og:title" content="Night PDF Blog - Eye-Friendly Reading Guides & PDF Dark Mode Tips" />
        <meta property="og:description" content="Read expert guides on how to reduce eye strain, compare AMOLED black and sepia themes, convert PDFs on mobile, and read PDFs comfortably at night." />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Night PDF Blog",
            "description": "Read expert guides on how to reduce eye strain, compare AMOLED black and sepia themes, convert PDFs on mobile, and read PDFs comfortably at night.",
            "url": "https://pdf.theshivaji.in/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Night PDF"
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white pb-32">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pt-24 pb-12 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 mb-8 shadow-sm">
              <Sparkles className="w-3 h-3 text-zinc-400" /> Publications
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Eye-Friendly Reading Guides
            </h1>
            <p className="mt-8 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
              Science-backed insights, device setups, and software guides to help you read PDFs comfortably in the dark.
            </p>
          </motion.div>
        </section>

        {/* Visual Mockup Search Bar */}
        <section className="mx-auto max-w-xl px-6 pb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-full border border-white/5 bg-zinc-900/40 p-1.5 flex items-center backdrop-blur-md focus-within:border-white/20 transition-all"
          >
            <Search className="w-4 h-4 text-zinc-500 ml-4 shrink-0" />
            <input 
              type="text" 
              placeholder="Search articles, guides, and tech analysis..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder-zinc-500 w-full ml-3 pr-4 py-2 font-light"
              disabled
            />
          </motion.div>
        </section>

        {/* Featured Card (First Article) */}
        {articles.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 sm:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6 font-display">
                Featured Publication
              </h2>
              <div className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 sm:p-12 hover:border-white/10 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col md:flex-row gap-10 items-stretch">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.03] to-transparent pointer-events-none" />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-5">
                      <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 font-semibold text-amber-400">
                        {articles[0].category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {articles[0].date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {articles[0].readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold sm:text-3xl lg:text-4xl text-white group-hover:text-zinc-200 transition-colors leading-tight">
                      <Link to={`/blog/${articles[0].slug}`}>
                        {articles[0].title}
                      </Link>
                    </h3>
                    <p className="mt-5 text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                      {articles[0].excerpt}
                    </p>
                  </div>
                  <div className="mt-10">
                    <Link
                      to={`/blog/${articles[0].slug}`}
                      className="group/btn inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-xs font-bold text-black transition-all hover:bg-zinc-200 active:scale-98 shadow-md"
                    >
                      Read Article 
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="w-full md:w-96 rounded-2xl border border-white/5 bg-zinc-900/20 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden shrink-0 min-h-[220px]">
                  <span className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">🌙</span>
                  <div className="absolute bottom-6 left-0 right-0 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                    Night PDF Engine v1.0
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* Regular Articles Grid */}
        <section className="mx-auto max-w-6xl px-6 sm:px-8 py-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-8 font-display">
            All Guides & Insights
          </h2>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.slice(1).map((article, index) => (
              <motion.article 
                key={index} 
                variants={itemVariants}
                className="group relative rounded-3xl border border-white/5 bg-zinc-950 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Visual gradient backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-b ${article.gradient} pointer-events-none opacity-20`} />
                
                <div className="p-8 flex-1 flex flex-col z-10">
                  <div className="flex flex-wrap items-center gap-3.5 text-xs text-zinc-500 mb-5">
                    <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-zinc-200 transition-colors leading-snug">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-light line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="p-8 pt-0 border-t border-white/5 z-10 bg-black/40">
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-zinc-300 transition-colors mt-5"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

      </main>
    </>
  );
}
