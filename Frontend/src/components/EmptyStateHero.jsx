import React from 'react';
import { motion } from 'framer-motion';
import UploadZone from './UploadZone';


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
        preload="metadata"
        onCanPlay={() => setIsLoaded(true)}
      >
        <source src="/hero-demo.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
};

export default function EmptyStateHero({ onFileSelected, errorMsg, recentFiles, onResume, onForget, opening }) {

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

        {/* Primary Upload CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="w-full max-w-xl mx-auto mb-10"
        >
          <UploadZone onFileSelected={onFileSelected} errorMsg={errorMsg} />
        </motion.div>

        {opening && <p role="status">Opening PDF…</p>}
        {recentFiles.length > 0 && <section className="mb-8 w-full max-w-xl text-left"><h2>Saved on this device</h2>
          {recentFiles.map(entry => <div key={entry.id} className="flex items-center gap-3 border-b border-zinc-800 py-2">
            <span className="min-w-0 flex-1 break-words">{entry.name} · p. {entry.currentPage || 1}</span>
            {entry.isMetaOnly ? <span className="text-xs">History only · reopen the original file</span> :
              <button className="underline" onClick={() => onResume(entry)}>Resume</button>}
            <button aria-label={'Forget ' + entry.name} onClick={() => onForget(entry)}>Forget</button>
          </div>)}</section>}
        <HeroVideo />
        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-16 text-[13px] font-semibold text-zinc-500 tracking-wide"
        >
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 100% Local</div>
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> No Uploads</div>
          <div className="flex items-center gap-2"><span className="text-emerald-500">✓</span> Session-only by default</div>
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


      </div>
    </div>
  );
}
