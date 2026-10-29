import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export function EcosystemFooter({ sectors, onSelectSector, onBackToTop }) {
  return (
    <footer className="mt-20 py-16 px-4 sm:px-8 border-t border-[#e5e3de] bg-[#f8f7f5] select-none text-center">
      <div className="max-w-4xl mx-auto">
        
        {/* Brand */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="size-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-syne font-bold text-xs">
            E
          </div>
          <span className="font-syne font-bold text-xl text-gray-900 tracking-tight">
            Ecosystem<span className="text-[#8c6d46]">.</span>
          </span>
        </div>

        {/* User's Exact Manifesto Text */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-syne mb-4 text-gray-900">
          Rooted in Connection
        </h2>
        <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          We believe that true luxury lies in empathy. Every service in our ecosystem is meticulously crafted not just to perform a function, but to foster genuine human connections.
        </p>

        {/* 10 Sectors Quick Pill Directory */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {sectors.map(s => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick(800);
                onSelectSector(s);
              }}
              className="px-3.5 py-1.5 rounded-full bg-white border border-[#e5e3de] hover:border-gray-900 text-xs font-syne text-gray-700 hover:text-black transition-all shadow-sm"
            >
              <span className="text-gray-400 font-mono text-[10px] mr-1">{s.code}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Return to Top Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              sounds.playClick(900);
              onBackToTop();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-mono text-gray-700 hover:text-black transition-all bg-white shadow-sm"
          >
            <span>Return to Top</span>
            <ArrowUp className="size-3" />
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[#eae8e4] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            &copy; 2026 Ecosystem Global Hub. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <span>Crafted with empathy & human soul</span>
            <Heart className="size-3 text-[#8c6d46] fill-[#8c6d46] ml-1" />
          </div>
        </div>

      </div>
    </footer>
  );
}
