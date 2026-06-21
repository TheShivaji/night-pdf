import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

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

      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/10 selection:text-white pb-20">
        {/* Hero Header Section */}
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 px-6 py-20 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-300 mb-6">
              <BookOpen className="w-3.5 h-3.5" /> Night PDF Publications
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent font-display">
              Eye-Friendly Reading & PDF Guides
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Discover science-backed strategies, display tech deep-dives, and tool tutorials to make reading on screens comfortable for your eyes.
            </p>
          </div>
        </section>

        {/* Featured Card (First Article) */}
        {articles.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-6 font-display">
              Featured Article
            </h2>
            <div className="group relative rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-900/40 via-zinc-950 to-zinc-950 p-6 sm:p-8 md:p-12 hover:border-white/10 transition-all duration-300 shadow-xl overflow-hidden flex flex-col md:flex-row gap-8">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
              
              <div className="flex-1 flex flex-col justify-between z-10">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 mb-4">
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                      {articles[0].category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {articles[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {articles[0].readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold sm:text-3xl text-white group-hover:text-amber-200 transition-colors">
                    <Link to={`/blog/${articles[0].slug}`}>
                      {articles[0].title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-sm text-zinc-400 leading-relaxed max-w-xl">
                    {articles[0].excerpt}
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    to={`/blog/${articles[0].slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-md shadow-white/5"
                  >
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-80 h-48 md:h-auto rounded-xl border border-white/5 bg-zinc-900/50 flex items-center justify-center p-8 text-center relative overflow-hidden shrink-0">
                <div className="text-4xl">🌙</div>
                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles Grid */}
        <section className="mx-auto max-w-6xl px-6 py-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-8 font-display">
            All Guides & Insights
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(1).map((article, index) => (
              <article 
                key={index} 
                className="group relative rounded-2xl border border-white/5 bg-zinc-900/10 hover:border-white/10 hover:bg-zinc-900/20 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* Visual gradient backdrop */}
                <div className={`absolute inset-0 bg-gradient-to-b ${article.gradient} pointer-events-none opacity-40`} />
                
                <div className="p-6 flex-1 flex flex-col z-10">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4">
                    <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-zinc-300 transition-colors leading-tight">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="mt-3 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 z-10 bg-zinc-950/20">
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-zinc-300 transition-colors mt-4"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-6xl px-6 mt-20">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-display text-2xl font-bold text-white">
              Try converting your documents locally
            </h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto">
              Ready to experience eye-friendly reading? Upload a document and choose our high-contrast AMOLED Black or Sepia Reader mode.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-md shadow-white/5"
              >
                Open Reader Workspace
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
