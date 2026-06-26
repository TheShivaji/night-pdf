import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { calculateQualityMetrics } from '../utils/regressionSuite';

export default function BenchmarkHUD({ renderTime = 0, workerTime = 0, cacheHitRatio = 100, memoryMB = 45, fps = 60, pagesCached = 0, origImgData = null, newImgData = null }) {
  if (!import.meta.env.DEV) return null; // Absolutely zero telemetry overhead in production

  const [isMinimized, setIsMinimized] = useState(false);
  const metrics = calculateQualityMetrics(origImgData, newImgData);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-950/95 backdrop-blur-md border border-slate-800 text-xs text-slate-200 rounded-lg shadow-2xl overflow-hidden font-mono transition-all duration-200 w-80">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="flex items-center gap-2 font-bold text-blue-400">
          <Activity size={14} className="animate-pulse" />
          <span>V2 Observability HUD</span>
        </div>
        <span className="text-[10px] text-slate-400">{isMinimized ? '[+]' : '[-]'}</span>
      </div>
      {!isMinimized && (
        <div className="p-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
          <div className="flex justify-between"><span className="text-slate-400">Total Latency:</span><span className="text-emerald-400 font-bold">{renderTime}ms</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Worker Latency:</span><span className="text-sky-400 font-bold">{workerTime}ms</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Cache Hits:</span><span className="text-amber-400 font-bold">{cacheHitRatio}%</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Scroll FPS:</span><span className={fps >= 55 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>{fps} FPS</span></div>
          <div className="flex justify-between"><span className="text-slate-400">PSNR Gate:</span><span className="text-purple-400 font-bold">{metrics.psnr} dB</span></div>
          <div className="flex justify-between"><span className="text-slate-400">SSIM Index:</span><span className="text-teal-400 font-bold">{metrics.ssim}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">DeltaE Dev:</span><span className="text-indigo-400 font-bold">{metrics.deltaE}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Text Contrast:</span><span className="text-emerald-400 font-bold">{metrics.contrastRatio}:1</span></div>
          <div className="col-span-2 border-t border-slate-800 pt-1 mt-1 flex justify-between">
            <span className="text-slate-400">Memory / Cached:</span>
            <span className="text-blue-400 font-bold">~{memoryMB}MB ({pagesCached} pgs)</span>
          </div>
        </div>
      )}
    </div>
  );
}
