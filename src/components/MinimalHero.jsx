import React, { useState } from 'react';
import { ArrowDown, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

export function MinimalHero({ onExploreClick, onOpenManifesto }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    });
  };

  const disciplines = [
    'Kinetic Choreography',
    'Spatial WebGL Shaders',
    'Architectural Bento Systems',
    'Tactile Micro-Interactions',
    'Procedural Acoustic Design',
    'Semantic Design Tokens',
    'Atmospheric Hero Portals',
    'Holographic 3D Surfaces',
    'Sub-Millisecond Core Vitals',
    'Artisan Human Touch'
  ];

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 max-w-7xl mx-auto select-none"
    >
      {/* Top Curatorial Metadata */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#8E8E93] border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-3">
          <span className="size-2 rounded-full bg-[#E8D5B5] animate-ping" />
          <span className="text-[#F0F0EB] font-medium tracking-wider">
            ATELIER NEXUS // ARCHIVE 2026
          </span>
          <span className="hidden sm:inline text-white/20">/</span>
          <span className="hidden sm:inline">10 DISCIPLINES CONNECTED</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>FRAME BUDGET: 120 FPS</span>
          <span className="text-white/20">•</span>
          <span className="text-[#E8D5B5]">HUMAN CRAFTED</span>
        </div>
      </div>

      {/* Hero Headline & Editorial Composition */}
      <div className="my-auto py-12 sm:py-16">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#A8A8B2] mb-6">
          <Compass className="size-3 text-[#E8D5B5]" />
          <span>CURATED DIGITAL CATALOGUE</span>
        </div>

        {/* Master Typographic Composition */}
        <h1 
          style={{
            transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="font-sans-clean text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#F0F0EB] tracking-tight leading-[1.04] max-w-5xl"
        >
          A mother portal connecting ten{' '}
          <span className="font-serif-luxury italic font-normal text-[#E8D5B5] tracking-normal inline-block hover:scale-105 transition-transform duration-300">
            kinetic disciplines
          </span>{' '}
          into a singular architecture.
        </h1>

        {/* Editorial Subtitle & Signature Note */}
        <div className="mt-8 pt-8 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          <p className="md:col-span-7 text-sm sm:text-base text-[#8E8E93] font-normal leading-relaxed max-w-xl">
            We reject templated indifference. Each service in this catalogue is authored with deliberate physical drag, acoustic harmonics, and GPU-composited grace. Built for founders and ateliers who seek genuine distinction.
          </p>

          <div className="md:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-start md:justify-end gap-4">
            <button
              onClick={() => {
                sounds.playClick(750);
                onExploreClick();
              }}
              className="px-6 py-3.5 rounded-full bg-[#F0F0EB] text-[#030304] font-medium text-xs tracking-wide hover:bg-white transition-all flex items-center gap-2 shadow-[0_4px_30px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
            >
              <span>Explore The 10 Disciplines</span>
              <ArrowDown className="size-3.5" />
            </button>

            <button
              onClick={() => {
                sounds.playHover();
                onOpenManifesto();
              }}
              className="px-5 py-3.5 rounded-full border border-white/10 hover:border-white/25 text-xs font-mono text-[#D4D4D8] hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <span>Atelier Manifesto</span>
            </button>
          </div>

        </div>

      </div>

      {/* Kinetic Ticker Tape Marquee */}
      <div className="pt-6 border-t border-white/[0.08] overflow-hidden whitespace-nowrap">
        <div className="flex gap-8 items-center text-xs font-mono text-[#6A6A74] tracking-widest uppercase animate-ticker">
          {[...disciplines, ...disciplines].map((item, idx) => (
            <span key={idx} className="flex items-center gap-4 hover:text-[#E8D5B5] transition-colors cursor-default">
              <span>{item}</span>
              <span className="text-[#E8D5B5]/40">✦</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
