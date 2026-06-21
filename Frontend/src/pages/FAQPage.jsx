import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Cpu, HelpCircle, FileText, Smartphone } from 'lucide-react';

const faqs = [
  {
    question: "How does Night PDF convert PDFs to dark mode?",
    answer: "Night PDF uses an advanced client-side HSL color lightness inversion algorithm. It converts bright white page backgrounds into deep dark themes or warm sepia tones, while intelligently preserving the original colors of diagrams, charts, photographs, and syntax-highlighted code. This ensures maximum readability without ruining visual assets."
  },
  {
    question: "Is Night PDF safe? Are my private documents uploaded to any servers?",
    answer: "Yes, it is 100% secure. Unlike conventional online PDF converters that process your files on remote cloud servers, Night PDF does all processing locally inside your web browser. No files are uploaded, stored, or indexed. Your private study materials, legal papers, and books never leave your device."
  },
  {
    question: "Does Night PDF support offline reading?",
    answer: "Absolutely. Night PDF is built as a Progressive Web App (PWA). Once you visit the site, all resources are cached locally. You can bookmark the application and open it to read, adjust themes, and convert PDFs even without an active internet connection or in airplane mode."
  },
  {
    question: "Is Night PDF free? Are there any size or page count limits?",
    answer: "Night PDF is completely free with no registration, subscriptions, watermarks, or premium barriers. You can load and process documents of any file size or page count. The tool is free and open to everyone, including students, developers, and researchers."
  },
  {
    question: "What eye-friendly themes are available in Night PDF?",
    answer: "We support 8 custom themes: Dark Mode (deep gray), AMOLED Black (pure black for power saving on OLED displays), Sepia Reader (warm paper tint), Dracula Purple (hacker aesthetic), Forest Green (earthy, low contrast), Cool Slate (modern bluish-gray), Original (normal light mode), and a Custom Theme option where you can pick your own custom background and text color presets."
  },
  {
    question: "Can I select, copy, and search text in the dark mode PDF?",
    answer: "Yes. Night PDF renders a native, transparent, selectable text layer overlaying the PDF canvas. You can highlight text, copy it to your clipboard, and search for terms using the standard browser search bar (Ctrl+F or Cmd+F) just like in normal light mode readers."
  },
  {
    question: "How do I download the converted dark mode PDF?",
    answer: "Once you have selected a theme and adjusted the rendering sliders (like brightness and contrast) to your liking, click the 'Download Eye-Friendly PDF' button in the sidebar. The application will compile the updated styling details and save a new PDF file directly to your downloads folder."
  },
  {
    question: "Can I convert only a specific page range of my PDF?",
    answer: "Yes. In the Left Config Panel, under the Download Settings, you can switch from 'Convert All Pages' to 'Page Range'. Enter your desired pages (for example, '1-5, 8, 11-15') and the downsampled PDF will only include those inverted pages, saving file size and compilation time."
  },
  {
    question: "How do I adjust image brightness, contrast, and text boldness?",
    answer: "The sidebar features adjustment sliders. If text is faint, increase the contrast and boldness. If the document remains too bright, lower the brightness slider. The engine applies CSS filters and pixel offsets in real-time, giving you total fine-grained control over document readability."
  },
  {
    question: "Why do some images or pages look inverted incorrectly?",
    answer: "Night PDF uses a HSL-based 'Smart' rendering engine which filters out images and non-white backgrounds. If a page has complex graphical layouts that render poorly, you can toggle the mode from 'Smart' to 'Original' (no color inversion) or tune the brightness and contrast sliders in the sidebar for that particular page."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Night PDF - Dark Mode PDF Reader</title>
        <meta name="description" content="Answers to common questions about Night PDF. Learn how client-side PDF dark mode conversion works, offline usage, offline privacy, custom themes, and text copy support." />
        <link rel="canonical" href="https://pdf.theshivaji.in/faq" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/faq" />
        <meta property="og:title" content="Frequently Asked Questions | Night PDF - Dark Mode PDF Reader" />
        <meta property="og:description" content="Answers to common questions about Night PDF. Learn how client-side PDF dark mode conversion works, offline usage, offline privacy, custom themes, and text copy support." />
        
        {/* Schema Script */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/10 selection:text-white pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-zinc-950 px-6 py-20 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-300 mb-6">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about how Night PDF works, privacy safety, or offline features? Find clear, direct answers below.
            </p>
          </div>
        </section>

        {/* Highlight Badges */}
        <section className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/20 p-5 backdrop-blur-sm">
              <div className="rounded-lg bg-white/5 p-2 text-white border border-white/10">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">100% Privacy First</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">
                  All PDF rendering and inversion occurs entirely locally in your web browser. Zero server uploads.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/20 p-5 backdrop-blur-sm">
              <div className="rounded-lg bg-white/5 p-2 text-white border border-white/10">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">GPU Accelerated Inversion</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">
                  Utilizes HTML5 canvas processing for crisp rendering and immediate HSL contrast adjustments.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900/20 p-5 backdrop-blur-sm">
              <div className="rounded-lg bg-white/5 p-2 text-white border border-white/10">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Fully Offline Capable</h3>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">
                  Install as a Progressive Web App (PWA) and read or convert your PDFs without any internet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accordion list */}
        <section className="mx-auto max-w-3xl px-6 mt-6">
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`group rounded-xl border transition-all duration-300 ${
                    isOpen 
                      ? 'border-white/20 bg-zinc-900/40 shadow-lg shadow-white/[0.02]' 
                      : 'border-white/5 bg-zinc-900/10 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <span className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-zinc-200 transition-all duration-300 ${isOpen ? 'rotate-180 bg-white/10 border-white/20 text-white' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm leading-relaxed text-zinc-400 border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-3xl px-6 mt-16 text-center">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="font-display text-2xl font-bold text-white">
              Ready to protect your eyes?
            </h2>
            <p className="mt-3 text-sm text-zinc-400 max-w-lg mx-auto">
              Start reading and converting your PDFs locally with our collection of dark, AMOLED black, and sepia themes.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 active:scale-95 shadow-md shadow-white/5"
              >
                Go to PDF Reader
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
