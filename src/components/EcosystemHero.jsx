import React, { useState } from 'react';
import { ArrowDown, Sparkles, Heart, Compass, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/audio';

export function EcosystemHero({ 
  onExploreClick, 
  soundEnabled, 
  onToggleSound, 
  onOpenManifesto 
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 15
    });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-6 pb-12 px-4 sm:px-8 max-w-7xl mx-auto select-none"
    >
      {/* Top Navigation */}
      <nav className="flex justify-between items-center py-6 border-b border-[#e5e3de] mb-12">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-syne font-black text-sm">
            E
          </div>
          <span className="text-2xl font-extrabold font-syne tracking-tight text-gray-900">
            Ecosystem<span className="text-[#8c6d46]">.</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              soundEnabled
                ? 'border-[#8c6d46]/40 bg-[#8c6d46]/10 text-[#8c6d46]'
                : 'border-gray-200 text-gray-400 hover:text-gray-700'
            }`}
            title="Toggle Soft Procedural Audio"
          >
            {soundEnabled ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          <span className="text-xs font-medium tracking-widest uppercase text-gray-500 font-mono hidden sm:inline">
            Global Mother Hub
          </span>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="flex flex-col justify-center items-center text-center px-4 pt-6 pb-6 max-w-4xl mx-auto">
        
        {/* Subtle Heritage Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e5e3de] text-xs font-mono text-[#8c6d46] shadow-sm mb-6">
          <Sparkles className="size-3" />
          <span>MOTHER PORTAL // 10 INTEGRATED SECTORS</span>
        </div>

        {/* Hero Title */}
        <h1 
          style={{
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-6 tracking-tight text-gray-900 font-syne leading-[1.04]"
        >
          Elevated Living<span className="text-[#8c6d46]">.</span>
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-xl text-gray-600 font-light leading-relaxed max-w-2xl mb-8">
          A unified collection of premium services, designed with empathy and built for human connection. Explore our 10 distinct sectors below.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick(800);
              onExploreClick();
            }}
            className="px-8 py-3.5 rounded-full bg-gray-900 text-white font-syne font-bold text-xs tracking-wider hover:bg-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <span>Explore 10 Sectors</span>
            <ArrowDown className="size-3.5" />
          </button>

          <button
            onClick={() => {
              sounds.playHover();
              onOpenManifesto();
            }}
            className="px-6 py-3.5 rounded-full bg-white border border-[#e2e0da] text-gray-700 font-syne font-semibold text-xs hover:border-gray-400 transition-all active:scale-95 shadow-sm"
          >
            <span>Rooted in Connection</span>
          </button>
        </div>

      </header>

      {/* Hero Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-12 pt-8 border-t border-[#e8e6e1] text-center font-mono">
        <div>
          <div className="font-syne font-extrabold text-2xl text-gray-900">10</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">Living Sectors</div>
        </div>
        <div>
          <div className="font-syne font-extrabold text-2xl text-[#8c6d46]">100%</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">Human Curated</div>
        </div>
        <div>
          <div className="font-syne font-extrabold text-2xl text-gray-900">Fair-Wage</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">Artisan Certified</div>
        </div>
        <div>
          <div className="font-syne font-extrabold text-2xl text-emerald-700">24/7</div>
          <div className="text-[11px] text-gray-500 uppercase tracking-wider mt-0.5">Concierge Desk</div>
        </div>
      </div>

    </section>
  );
}
