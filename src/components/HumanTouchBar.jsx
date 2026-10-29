import React, { useState, useEffect } from 'react';
import { Heart, Clock, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export function HumanTouchBar({ 
  humanWarmth, 
  onWarmthChange, 
  showAnnotations, 
  onToggleAnnotations 
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="human-touch" className="relative z-20 max-w-5xl mx-auto px-4 mb-16">
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-amber-500/25 shadow-[0_20px_50px_rgba(245,158,11,0.06)] backdrop-blur-xl overflow-hidden">
        
        {/* Subtle Warm Amber Glow Behind */}
        <div 
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl transition-opacity duration-500"
          style={{ 
            background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 70%)',
            opacity: 0.4 + humanWarmth * 0.6
          }}
        />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Studio Presence & Manifesto */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 mb-2">
              <Heart className="size-3 fill-amber-400 text-amber-400 animate-pulse" />
              <span>THE HUMAN TOUCH PLEDGE</span>
            </div>
            <h3 className="font-syne text-2xl font-bold text-white">
              Handcrafted with Soul, Calibrated by Humans.
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
              In a digital landscape drowned in cold, cloned components, our 10 individual services are authored by real creative engineers who care deeply about physical tactile feedback, emotional resonance, and artisanal micro-details.
            </p>
          </div>

          {/* Live Studio Clock & Presence */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col gap-1.5 min-w-[220px]">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3 text-amber-400" />
                STUDIO LOCAL
              </span>
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div className="font-mono text-lg font-bold text-white tracking-wider">
              {timeStr || '20:30:00'} <span className="text-xs text-slate-500 font-normal">GMT+5:30</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="size-3" />
              <span>Principal Engineer On Desk</span>
            </div>
          </div>

        </div>

        {/* Interactive Human Touch Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          
          {/* Polish Slider: Precision vs Warm Artisan */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sliders className="size-3 text-indigo-400" />
                <span>Atmosphere Dial</span>
              </span>
              <span className="text-amber-400 font-semibold">
                {humanWarmth < 0.35 ? 'Cold Precision' : humanWarmth > 0.7 ? 'Artisan Warmth' : 'Balanced Craft'}
              </span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={humanWarmth}
              onChange={(e) => {
                onWarmthChange(Number(e.target.value));
                sounds.playHover();
              }}
              className="w-full h-1.5 bg-black/50 rounded-lg accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>Minimal Code</span>
              <span>Organic Soul</span>
            </div>
          </div>

          {/* Handcrafted Annotations Toggle */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-white flex items-center gap-1.5">
                <span>Engineer Notes</span>
                <span className="font-caveat text-amber-300 text-sm">handwritten</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Show personal craft annotations</p>
            </div>
            <button
              onClick={() => {
                sounds.playSwitch(!showAnnotations);
                onToggleAnnotations();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                showAnnotations 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                  : 'bg-black/40 text-slate-500 border-white/10'
              }`}
            >
              {showAnnotations ? 'Visible' : 'Hidden'}
            </button>
          </div>

          {/* Direct Human Access Card */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-200">Zero Bot Guarantee</div>
              <p className="text-[11px] text-amber-300/80 mt-0.5">
                Every inquiry is answered directly by an engineer within 2 hours.
              </p>
            </div>
            <Sparkles className="size-5 text-amber-400 shrink-0" />
          </div>

        </div>

      </div>
    </div>
  );
}
