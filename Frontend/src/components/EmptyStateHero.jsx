import React from 'react';
import { motion } from 'framer-motion';
import UploadZone from './UploadZone';
import { Clock, Play } from 'lucide-react';

const HeroVideo = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-[1100px] mx-auto mb-16 relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
      style={{ aspectRatio: '1920/1080' }}
    >
      {/* Lightweight skeleton placeholder */}
      <div 
        className={`absolute inset-0 bg-zinc-900/50 transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ transform: 'scale(1.68)' }}
      />
      
      <video
        className={`w-full h-auto block transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: 'scale(1.68)' }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
      >
        <source src="/hero-demo.webm" type="video/webm" />
        <source src="/hero-demo.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};

export default function EmptyStateHero({ onFileSelected, errorMsg, recentFiles, onResumeSession }) {
  const lastSession = recentFiles && recentFiles.length > 0 ? recentFiles[0] : null;

  return (
    <div className="w-full flex-1 bg-black text-white pb-32 pt-16 sm:pt-24 px-5 overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Outfit', sans-serif", textShadow: '0 0 20px rgba(255,255,255,0.05)' }}
          className="text-5xl sm:text-6xl md:text-[72px] leading-[1.05] font-extrabold tracking-tight text-white mb-6"
        >
          Turn Any PDF Into<br />Eye-Friendly Dark Mode
        </motion.h1>

        {/* Subtitle */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-zinc-400 font-light max-w-[460px] mx-auto leading-relaxed mb-12"
        >
          <p className="mb-2">Read comfortably at night with AMOLED, Sepia, and custom themes.</p>
          <p className="text-zinc-500">All processing happens locally in your browser.</p>
        </motion.div>

        {/* Hero Video */}
        <HeroVideo />

        {/* Resume Session Card */}
        {lastSession && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
            className="w-full max-w-xl mx-auto mb-6 bg-[#111113] border border-white/10 rounded-2xl p-5 text-left flex items-center justify-between cursor-pointer hover:border-white/20 transition-all shadow-xl"
            onClick={() => onResumeSession(lastSession)}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="bg-white/5 p-3 rounded-xl shrink-0">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-white font-semibold text-sm truncate mb-1">Resume Previous Session</h3>
                <p className="text-zinc-400 text-xs truncate">
                  {lastSession.name} • Page {lastSession.currentPage || 1}
                </p>
              </div>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs shrink-0 flex items-center gap-2 hover:bg-zinc-200 transition-colors">
              <Play className="w-3 h-3 fill-black" /> Resume
            </button>
          </motion.div>
        )}

        {/* Primary Upload CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-xl mx-auto mb-10"
        >
          <UploadZone onFileSelected={onFileSelected} errorMsg={errorMsg} />
        </motion.div>

        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-16 text-[13px] font-semibold text-zinc-500 tracking-wide"
        >
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 100% Local</div>
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> No Uploads</div>
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Works Offline</div>
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Private By Design</div>
        </motion.div>

        {/* Theme Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-24 flex flex-wrap justify-center gap-3"
        >
          {[
            { name: 'AMOLED', bg: '#000000', border: 'border-white/20' },
            { name: 'Sepia', bg: '#f4ecd8', border: 'border-transparent' },
            { name: 'Dark Gray', bg: '#1c1c1e', border: 'border-white/10' },
            { name: 'Custom', bg: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)', border: 'border-white/10' }
          ].map((theme, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <div 
                className={`w-3 h-3 rounded-full border ${theme.border}`}
                style={{ background: theme.bg }}
              />
              <span className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">{theme.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Product Positioning Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[540px] mx-auto mb-24 flex flex-col items-center text-center"
        >
          <h2 style={{ fontFamily: "'Outfit', sans-serif" }} className="text-2xl font-bold text-white mb-4">
            Why NightPDF Exists
          </h2>
          <p className="text-[15px] leading-relaxed text-zinc-400 font-light mb-4">
            Most PDF readers were designed for daylight.
          </p>
          <p className="text-[15px] leading-relaxed text-zinc-400 font-light">
            NightPDF was built for students, researchers, developers, and readers who spend hours reading PDFs at night.
          </p>
        </motion.div>

        {/* Ecosystem Preview Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto mb-10 flex flex-col items-center text-center"
        >
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-zinc-500 mb-6">
            Coming Soon
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {['PDF Summaries', 'AI Notes', 'Research Workspace', 'Reading Analytics'].map((pill, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.06] bg-zinc-950 shadow-md backdrop-blur-md"
              >
                <span className="text-emerald-500 text-sm">✓</span>
                <span className="text-[12px] font-bold text-zinc-300 tracking-wide">{pill}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
