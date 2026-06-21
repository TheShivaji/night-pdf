import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FileText, Moon, MousePointer2, ZoomIn, Search, CheckCircle2 } from 'lucide-react';

const RealisticDocument = () => {
  return (
    <div className="d-doc-page w-full max-w-[540px] h-full mx-auto bg-white rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] p-12 overflow-hidden relative border border-black/5 transition-colors duration-700">
       <div className="d-doc-content flex flex-col gap-6 w-full h-full">
          
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold text-zinc-400 tracking-[0.2em] uppercase">Research Paper</div>
            <h1 className="font-display font-extrabold text-3xl leading-tight text-current">
              The Impact of OLED Displays on Reading Comfort
            </h1>
          </div>

          <div className="flex flex-col gap-3 text-[14px] leading-relaxed opacity-80 font-medium">
            <p>Recent clinical studies demonstrate that the emission of blue light from traditional LCD screens significantly impacts circadian rhythms and melatonin production. By utilizing pure black backgrounds on AMOLED displays, users can substantially reduce ocular strain during extended reading sessions.</p>
          </div>

          <div className="p-5 rounded-xl border border-dashed border-zinc-200 d-doc-border-el flex flex-col gap-4 bg-zinc-50/50 transition-colors duration-700">
            <div className="font-bold text-sm">Table 1: Eye Strain Metrics</div>
            <div className="flex justify-between text-sm border-b border-zinc-200 pb-2 d-doc-border-el font-semibold transition-colors duration-700">
              <span>Display Architecture</span>
              <span>Visual Strain Index</span>
            </div>
            <div className="flex justify-between text-sm opacity-70">
              <span>Standard LCD (White)</span>
              <span>84.2%</span>
            </div>
            <div className="flex justify-between text-sm opacity-70">
              <span>AMOLED (True Black)</span>
              <span>12.5%</span>
            </div>
          </div>

          <div className="text-[14px] leading-relaxed opacity-80 font-medium">
            <p>Furthermore, local processing architecture ensures that sensitive clinical and research documents are <span className="d-highlight px-1.5 py-0.5 rounded-md font-bold transition-colors duration-700 inline-block">never uploaded to external servers</span>, maintaining perfect privacy and HIPAA compliance without sacrificing the reading experience.</p>
          </div>

          <div className="flex flex-col gap-3 text-[14px] leading-relaxed opacity-80 font-medium">
            <p>The transformation to a dark theme involves smart color preservation, where images and highlight colors are maintained, but harsh white backgrounds are perfectly inverted to absolute black (#000000), turning off the pixels entirely on OLED monitors.</p>
          </div>

       </div>
    </div>
  );
};

const DesktopLayout = () => (
  <div className="flex w-full h-full absolute inset-0">
     {/* Sidebar */}
     <div className="w-[300px] border-r border-zinc-800 flex flex-col p-8 bg-zinc-950 z-10 shrink-0 transition-colors duration-700">
       <div className="flex items-center gap-2 mb-10">
         <span className="text-xl">🌙</span>
         <span className="font-display font-extrabold text-white text-lg tracking-tight">NightPDF</span>
       </div>
       
       <div className="flex flex-col gap-6">
         <div className="flex flex-col gap-3">
           <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Themes</div>
           <div className="flex flex-col gap-2">
             <div className="px-4 py-2.5 rounded-lg border border-transparent text-zinc-400 text-sm font-medium flex justify-between items-center cursor-default hover:text-zinc-200 transition-colors">
               <span>Original (White)</span>
             </div>
             <div className="d-amoled-btn px-4 py-2.5 rounded-lg border border-transparent text-white text-sm font-bold flex justify-between items-center cursor-pointer transition-colors duration-300">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-black border border-white/20 shadow-inner" />
                 AMOLED
               </div>
               <Moon size={14} className="text-zinc-400" />
             </div>
           </div>
         </div>

         <div className="flex flex-col gap-3 mt-4">
           <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Adjustments</div>
           <div className="h-1.5 rounded-full bg-zinc-800 w-full overflow-hidden">
             <div className="h-full bg-zinc-600 w-1/2" />
           </div>
           <div className="h-1.5 rounded-full bg-zinc-800 w-full overflow-hidden mt-2">
             <div className="h-full bg-zinc-600 w-1/3" />
           </div>
         </div>
       </div>
     </div>

     {/* Main Viewer Area (Natively Dark) */}
     <div className="flex-1 bg-[#0a0a0a] relative overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="h-16 border-b border-white/5 bg-zinc-950 flex items-center px-6 justify-between z-20 shrink-0">
          <div className="text-sm font-semibold text-zinc-500">Research_Paper.pdf</div>
          <div className="flex items-center gap-4 text-zinc-500">
            <ZoomIn size={18} />
            <Search size={18} />
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 relative overflow-hidden">
           {/* Initial Empty / Drop State */}
           <div className="d-file-drop absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-30">
             <div className="w-24 h-24 bg-zinc-900 shadow-xl rounded-2xl border border-white/10 flex items-center justify-center mb-6">
               <FileText size={40} className="text-zinc-600" />
             </div>
             <div className="text-xl font-bold text-zinc-300 mb-2">Drop PDF here</div>
             <div className="text-sm text-zinc-500">Processing locally...</div>
           </div>

           {/* Loading Indicator */}
           <div className="d-loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-40 bg-zinc-950 p-6 rounded-2xl shadow-2xl border border-white/10">
             <div className="text-sm font-bold text-zinc-300">Reading Document...</div>
             <div className="w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
               <div className="d-progress-bar w-full h-full bg-zinc-400 rounded-full" style={{ transform: 'scaleX(0)' }} />
             </div>
           </div>

           {/* Document State */}
           <div className="d-doc-container absolute top-10 bottom-10 left-10 right-10 flex justify-center z-10">
              <RealisticDocument />
           </div>

        </div>
     </div>

     {/* Emotional Payoff */}
     <div className="d-payoff absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none bg-black/90 backdrop-blur-sm">
       <h2 className="text-7xl font-display font-extrabold text-white mb-4 tracking-tight">Read Longer.</h2>
       <p className="text-3xl text-zinc-400 font-light tracking-wide">Without Eye Strain.</p>
     </div>

     {/* Cursor */}
     <div className="d-cursor absolute z-40 text-white drop-shadow-2xl pointer-events-none" style={{ transformOrigin: 'top left' }}>
       <MousePointer2 fill="#18181b" size={32} stroke="#ffffff" strokeWidth={1.5} />
     </div>
  </div>
);

export default function InteractiveDemo() {
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scale, setScale] = useState(1);

  // Responsive dynamic scaling for 1152x648 base
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Base design is 1152px wide
        const width = entry.contentRect.width;
        setScale(width / 1152);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Smooth, deliberate pacing
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
      tlRef.current = tl;

      gsap.set('.d-file-drop', { y: -80, opacity: 0, scale: 0.95 });
      gsap.set('.d-loader', { opacity: 0, scale: 0.95 });
      gsap.set('.d-doc-container', { opacity: 0, scale: 0.98 });
      gsap.set('.d-cursor', { left: '80%', top: '90%', opacity: 0 }); 
      gsap.set('.d-payoff', { opacity: 0 });
      gsap.set('.d-doc-page', { backgroundColor: '#ffffff', color: '#18181b', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' });
      gsap.set('.d-highlight', { backgroundColor: '#fef08a', color: '#854d0e' }); 
      gsap.set('.d-doc-border-el', { borderColor: '#e4e4e7', backgroundColor: '#fafafa' });
      gsap.set('.d-doc-content', { y: 0 });
      gsap.set('.d-amoled-btn', { backgroundColor: 'transparent', borderColor: 'transparent' });

      tl.to('.d-file-drop', { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' })
        .to('.d-file-drop', { opacity: 0, scale: 0.95, duration: 0.5, delay: 0.8 }) // Human pause
        .to('.d-loader', { opacity: 1, scale: 1, duration: 0.4 })
        .to('.d-progress-bar', { scaleX: 1, transformOrigin: 'left', duration: 1.2, ease: 'power2.inOut' })
        .to('.d-loader', { opacity: 0, scale: 0.95, duration: 0.4 })
        
        // Document loads
        .to('.d-doc-container', { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
        
        // Human cursor enters & pauses to read
        .to('.d-cursor', { opacity: 1, duration: 0.4 }, '+=0.6')
        .to('.d-cursor', { left: '40%', top: '50%', duration: 1.2, ease: "sine.inOut" })
        
        // Cursor moves to AMOLED button
        .to('.d-cursor', { left: '10%', top: '31%', duration: 1.5, ease: "power2.inOut" }, '+=0.8')
        
        // Micro-interaction: Hover state on AMOLED button before click
        .to('.d-amoled-btn', { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', duration: 0.2 }, '-=0.2')
        
        // Click!
        .to('.d-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.d-amoled-btn', { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', duration: 0.2 }, '<')
        
        // The gorgeous transformation (Only the PDF changes!)
        .to('.d-doc-border-el', { borderColor: '#27272a', backgroundColor: '#09090b', duration: 0.6, ease: 'power2.inOut' }, '+=0.1')
        .to('.d-doc-page', { backgroundColor: '#000000', color: '#e5e5ea', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)', duration: 0.7, ease: 'power2.inOut' }, '<')
        .to('.d-highlight', { backgroundColor: 'rgba(253, 224, 71, 0.12)', color: '#fde047', duration: 0.8, ease: 'power2.inOut' }, '<')
        
        // Scroll down to read comfortably
        .to('.d-cursor', { left: '50%', top: '80%', duration: 1.6, ease: 'power2.inOut' }, '+=0.6')
        .to('.d-doc-content', { y: -220, duration: 4.5, ease: 'sine.inOut' }, '<')
        
        // End sequence
        .to(['.d-doc-container', '.d-cursor', '.d-border-el', '.d-amoled-btn'], { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=1')
        .to('.d-payoff', { opacity: 1, duration: 1, ease: 'power3.out' })
        .to('.d-payoff', { opacity: 0, duration: 0.8 }, '+=3');

      if (!isVisible) tl.pause(); else tl.play();
      return () => tl.kill();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(['.d-file-drop', '.d-loader', '.d-cursor', '.d-payoff'], { opacity: 0, display: 'none' });
      gsap.set('.d-doc-container', { opacity: 1, scale: 1, y: 0 });
      gsap.set('.d-doc-page', { backgroundColor: '#000000', color: '#e5e5ea', boxShadow: '0 0 0 1px rgba(255,255,255,0.1)' });
      gsap.set('.d-doc-border-el', { borderColor: '#27272a', backgroundColor: '#09090b' });
      gsap.set('.d-highlight', { backgroundColor: 'rgba(253, 224, 71, 0.12)', color: '#fde047' });
      gsap.set('.d-amoled-btn', { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' });
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [isVisible] });

  useEffect(() => {
    if (tlRef.current) {
      if (isVisible) tlRef.current.play();
      else tlRef.current.pause();
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef} 
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden relative shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] flex select-none"
      style={{ height: `${648 * scale}px` }}
    >
      {/* 
        1152x648 Base Layout.
        Responsive height ensures it never breaks layout on mobile.
      */}
      <div 
        className="absolute top-0 left-0 w-[1152px] h-[648px] flex origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <DesktopLayout />
      </div>
    </div>
  );
}
