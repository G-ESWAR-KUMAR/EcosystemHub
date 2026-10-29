import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export function HoverExpandGallery({ sectors, onSelectSector }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-[94rem] mx-auto px-2 sm:px-6 my-8 select-none">
      
      {/* Category Hint / Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#8c6d46] uppercase">
          <Sparkles className="size-3.5" />
          <span>Interactive Hover Gallery // 10 Sectors</span>
        </div>
        <span className="text-xs font-mono text-gray-400 hidden sm:inline">
          Hover to expand • Click to inspect details
        </span>
      </div>

      {/* The Smooth HoverExpand Strip */}
      <div className="flex flex-col md:flex-row w-full items-center justify-center gap-2 md:gap-3 py-4 overflow-x-auto scrollbar-none">
        {sectors.map((sector, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={sector.id}
              onMouseEnter={() => {
                setActiveIndex(index);
                sounds.playHover();
              }}
              onClick={() => {
                sounds.playClick(850);
                onSelectSector(sector);
              }}
              style={{
                transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
              className={`relative overflow-hidden rounded-3xl cursor-pointer group shadow-xl ${
                isActive 
                  ? 'w-full md:w-[26rem] h-80 md:h-[34rem] shadow-2xl ring-1 ring-black/10' 
                  : 'w-full md:w-[5.2rem] h-20 md:h-[34rem] hover:opacity-90'
              }`}
            >
              {/* Background Image */}
              <img
                src={sector.img}
                alt={sector.name}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                  isActive ? 'scale-105' : 'scale-100 filter grayscale-[25%]'
                }`}
              />

              {/* Dynamic Gradient Overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-t from-black/85 via-black/35 to-black/10 opacity-100' 
                    : 'bg-black/50 md:bg-black/40 hover:bg-black/30'
                }`}
              />

              {/* Collapsed Vertical Title Pill (visible on desktop when inactive) */}
              {!isActive && (
                <div className="hidden md:flex absolute inset-0 flex-col justify-between items-center py-8 z-10 pointer-events-none">
                  <span className="text-white/80 font-mono text-xs font-semibold tracking-wider">
                    {sector.code}
                  </span>
                  <span 
                    style={{ writingMode: 'vertical-rl' }}
                    className="text-white/90 font-syne text-sm font-bold tracking-wider transform rotate-180 uppercase"
                  >
                    {sector.name}
                  </span>
                  <span className="size-2 rounded-full bg-white/40" />
                </div>
              )}

              {/* Mobile Inactive Pill Header */}
              {!isActive && (
                <div className="flex md:hidden absolute inset-0 items-center justify-between px-6 z-10 pointer-events-none text-white">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/60">{sector.code}</span>
                    <span className="font-syne font-bold text-base">{sector.name}</span>
                  </div>
                  <span className="text-xs text-white/60">Tap to view</span>
                </div>
              )}

              {/* Expanded Card Content (visible when active) */}
              <div 
                className={`absolute bottom-0 left-0 w-full p-6 sm:p-8 flex flex-col justify-end z-20 transition-all duration-500 ${
                  isActive 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-white/80 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                    {sector.code} // {sector.category}
                  </span>
                  <span className="text-xs text-white/70 font-mono hidden sm:inline">
                    {sector.timing}
                  </span>
                </div>

                <h3 className="text-white text-3xl sm:text-4xl font-extrabold font-syne tracking-tight mb-2">
                  {sector.name}
                </h3>

                <p className="text-white/90 text-sm font-light leading-relaxed mb-6 line-clamp-2 max-w-sm">
                  {sector.desc || sector.shortDesc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-xs font-mono text-white/80">
                    {sector.pricing}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playSuccess();
                      onSelectSector(sector);
                    }}
                    className="px-4 py-2 rounded-full bg-white text-gray-900 font-syne font-bold text-xs hover:bg-gray-100 transition-all flex items-center gap-1.5 shadow-lg active:scale-95"
                  >
                    <span>Explore Sector</span>
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
