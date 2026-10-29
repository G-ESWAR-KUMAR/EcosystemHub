import React, { useState } from 'react';
import { ArrowDown, Sparkles, Star, Zap, ShieldCheck, HeartHandshake } from 'lucide-react';
import { sounds } from '../utils/audio';

export function SpotlightHero({ onExploreClick, onOpenConsultation }) {
  const [mousePos, setMousePos] = useState({ x: 500, y: 250 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 pt-16 pb-20 overflow-hidden bg-grid-pattern"
    >
      {/* Aceternity Spotlight Flashlight Ray */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.16), transparent 70%)`
        }}
      />

      {/* Top Ambient Light Flare */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/15 blur-[120px] rounded-full" />

      {/* Status Pill / Changelog Badge */}
      <div className="relative z-10 mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-md shadow-inner text-xs font-mono text-slate-300 hover:border-indigo-500/40 transition-colors">
        <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-white font-medium">MOTHER ARCHITECTURE v3.4</span>
        <span className="text-slate-500">•</span>
        <span className="text-indigo-400">10 Specialized Studios Connected</span>
      </div>

      {/* Main Hero Headline */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          The Master Digital Catalogue for{' '}
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            High-Impact Web Engineering.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed mb-10">
          A centralized mother page connecting 10 elite digital services. From GPU-driven WebGL shaders and kinetic Lenis scrolls to modular bento architectures and tactile procedural soundscapes—infused with an unapologetic human touch.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              sounds.playClick(800);
              onExploreClick();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm tracking-wide hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 group"
          >
            <span>Explore 10 Services</span>
            <ArrowDown className="size-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              sounds.playSuccess();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-neutral-900/90 text-slate-200 font-medium text-sm border border-white/15 hover:border-white/30 hover:bg-neutral-800 transition-all active:scale-95 backdrop-blur-md flex items-center justify-center gap-2"
          >
            <Sparkles className="size-4 text-amber-400" />
            <span>Schedule Studio Briefing</span>
          </button>
        </div>

        {/* Trust & Testimonial Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center -space-x-2">
            {[
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face'
            ].map((url, i) => (
              <img 
                key={i} 
                src={url} 
                alt="Client avatar" 
                className="size-8 rounded-full border-2 border-neutral-950 object-cover"
              />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-white">4.98 / 5.0</span>
            <span className="text-slate-500">—</span>
            <span>Trusted by 140+ founders, design leads & studio heads</span>
          </div>
        </div>

      </div>

      {/* Hero Stats Bento Strip */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'CONNECTED STUDIOS', value: '10 Units', desc: 'Individually modular' },
          { label: 'FRAME BUDGET', value: '120 FPS', desc: 'Zero layout shift' },
          { label: 'AUDIO PAYLOAD', value: '0.00 KB', desc: 'Synthesized Web Audio' },
          { label: 'HUMAN TOUCH', value: '100% Soul', desc: 'Handcrafted precision' },
        ].map((stat, i) => (
          <div 
            key={i}
            className="p-4 rounded-xl bg-neutral-950/70 border border-white/10 backdrop-blur-lg hover:border-white/20 transition-all group"
          >
            <div className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-1">
              {stat.label}
            </div>
            <div className="font-syne text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
              {stat.value}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {stat.desc}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
