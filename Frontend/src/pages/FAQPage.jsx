import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Shield,
  Cpu,
  HelpCircle,
  ArrowRight,
  Eye,
  CloudOff,
  Sparkles,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does Night PDF convert PDFs to dark mode?",
    answer:
      "Night PDF uses an advanced client-side HSL color lightness inversion algorithm. It converts bright white page backgrounds into deep dark themes or warm sepia tones, while intelligently preserving the original colors of diagrams, charts, photographs, and syntax-highlighted code. This ensures maximum readability without ruining visual assets.",
  },
  {
    question:
      "Is Night PDF safe? Are my private documents uploaded to any servers?",
    answer:
      "Yes, it is 100% secure. Unlike conventional online PDF converters that process your files on remote cloud servers, Night PDF does all processing locally inside your web browser. No files are uploaded, stored, or indexed. Your private study materials, legal papers, and books never leave your device.",
  },
  {
    question: "Does Night PDF support offline reading?",
    answer:
      "Absolutely. Night PDF is built as a Progressive Web App (PWA). Once you visit the site, all resources are cached locally. You can bookmark the application and open it to read, adjust themes, and convert PDFs even without an active internet connection or in airplane mode.",
  },
  {
    question: "Is Night PDF free? Are there any size or page count limits?",
    answer:
      "Night PDF is completely free with no registration, subscriptions, watermarks, or premium barriers. You can load and process documents of any file size or page count. The tool is free and open to everyone, including students, developers, and researchers.",
  },
  {
    question: "What eye-friendly themes are available in Night PDF?",
    answer:
      "We support 8 custom themes: Dark Mode (deep gray), AMOLED Black (pure black for power saving on OLED displays), Sepia Reader (warm paper tint), Dracula Purple (hacker aesthetic), Forest Green (earthy, low contrast), Cool Slate (modern bluish-gray), Original (normal light mode), and a Custom Theme option where you can pick your own custom background and text color presets.",
  },
  {
    question: "Can I select, copy, and search text in the dark mode PDF?",
    answer:
      "Yes. Night PDF renders a native, transparent, selectable text layer overlaying the PDF canvas. You can highlight text, copy it to your clipboard, and search for terms using the standard browser search bar (Ctrl+F or Cmd+F) just like in normal light mode readers.",
  },
  {
    question: "How do I download the converted dark mode PDF?",
    answer:
      "Once you have selected a theme and adjusted the rendering sliders (like brightness and contrast) to your liking, click the 'Download Eye-Friendly PDF' button in the sidebar. The application will compile the updated styling details and save a new PDF file directly to your downloads folder.",
  },
  {
    question: "Can I convert only a specific page range of my PDF?",
    answer:
      "Yes. In the Left Config Panel, under the Download Settings, you can switch from 'Convert All Pages' to 'Page Range'. Enter your desired pages (for example, '1-5, 8, 11-15') and the downsampled PDF will only include those inverted pages, saving file size and compilation time.",
  },
  {
    question: "How do I adjust image brightness, contrast, and text boldness?",
    answer:
      "The sidebar features adjustment sliders. If text is faint, increase the contrast and boldness. If the document remains too bright, lower the brightness slider. The engine applies CSS filters and pixel offsets in real-time, giving you total fine-grained control over document readability.",
  },
  {
    question: "Why do some images or pages look inverted incorrectly?",
    answer:
      "Night PDF uses a HSL-based 'Smart' rendering engine which filters out images and non-white backgrounds. If a page has complex graphical layouts that render poorly, you can toggle the mode from 'Smart' to 'Original' (no color inversion) or tune the brightness and contrast sliders in the sidebar for that particular page.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Animation constants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>
          Frequently Asked Questions | Night PDF - Dark Mode PDF Reader
        </title>
        <meta
          name="description"
          content="Answers to common questions about Night PDF. Learn how client-side PDF dark mode conversion works, offline usage, offline privacy, custom themes, and text copy support."
        />
        <link rel="canonical" href="https://pdf.theshivaji.in/faq" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pdf.theshivaji.in/faq" />
        <meta
          property="og:title"
          content="Frequently Asked Questions | Night PDF - Dark Mode PDF Reader"
        />
        <meta
          property="og:description"
          content="Answers to common questions about Night PDF. Learn how client-side PDF dark mode conversion works, offline usage, offline privacy, custom themes, and text copy support."
        />

        {/* Schema Script */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <main className="min-h-screen bg-black text-white font-sans selection:bg-white/10 selection:text-white pb-32">
        {/* Premium Hero Section */}
        <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center sm:px-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 mb-8 shadow-sm">
              <Sparkles className="w-3 h-3 text-zinc-400" /> Help Center
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="mt-8 text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
              Everything you need to know about our privacy-first processing,
              offline capabilities, and custom reading themes.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-xs font-bold text-black transition-all hover:bg-zinc-200 active:scale-98 shadow-md"
              >
                Open PDF Reader
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 px-6 py-3.5 text-xs font-bold text-zinc-300 transition-all active:scale-98"
              >
                Explore Blog
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Three Premium Feature Cards */}
        <section className="mx-auto max-w-7xl px-6 sm:px-8 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <motion.div
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                100% Private
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                All document parsing, inversion rendering, and storage
                calculations occur entirely in your local RAM browser sandbox.
                No servers, no tracking, complete peace of mind.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <CloudOff className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                Works Offline
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                Built as a modern PWA utility. Save it directly to your mobile
                home screen or bookmark it. The tool runs seamlessly in airplane
                mode or deep off-grid locations.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="group relative rounded-3xl border border-white/5 bg-zinc-950 p-8 hover:border-white/15 transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-white/10 text-white mb-6 group-hover:scale-105 transition-transform duration-300">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-white text-lg">
                Smart Dark Mode
              </h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-light">
                Advanced lightness shifting preserves original hues for textbook
                charts and diagrams, avoiding raw visual negatives while turning
                bright pages eye-friendly.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Modern Accordion Section */}
        <section className="mx-auto max-w-3xl px-6 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-2xl font-bold text-zinc-200 mb-12 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`group rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-white/15 bg-zinc-950/80 shadow-2xl"
                      : "border-white/5 bg-zinc-950/20 hover:border-white/10"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between px-7 py-5 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <span
                      className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:text-zinc-200 transition-all duration-300 ${isOpen ? "rotate-180 bg-white/10 border-white/20 text-white" : ""}`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pb-6 text-sm leading-relaxed text-zinc-400 border-t border-white/5 pt-4 font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Conversion Box */}
        <section className="mx-auto max-w-4xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-gradient-to-b from-zinc-900/50 to-black p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute -right-24 -top-24 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-display text-3xl font-bold text-white tracking-tight sm:text-4xl">
              Protect Your Eyes While Reading
            </h2>
            <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-sm sm:text-base font-light leading-relaxed">
              Read comfortably in bed or dimly lit study spaces. Experience our
              responsive, local-first conversion engine now.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                <Check className="w-4 h-4 text-white" /> No Uploads
              </span>
              <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                <Check className="w-4 h-4 text-white" /> 100% Offline
              </span>
              <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                <Check className="w-4 h-4 text-white" /> AMOLED Themes
              </span>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-xs font-bold text-black transition-all hover:bg-zinc-200 shadow-md active:scale-98"
              >
                Open Night PDF
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
