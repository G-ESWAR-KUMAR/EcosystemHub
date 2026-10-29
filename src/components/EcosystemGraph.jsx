import React, { useState } from 'react';
import { Network, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { sounds } from '../utils/audio';

export function EcosystemGraph({ services, onSelectService }) {
  const [activeNode, setActiveNode] = useState(services[0]);

  return (
    <section id="ecosystem" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/10">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-2">
          <Network className="size-3 text-indigo-400" />
          <span>MOTHER ARCHITECTURE TOPOLOGY</span>
        </div>
        <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white">
          How the 10 Services Connect.
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Unlike isolated third-party widgets, every service in the Nexus catalog shares a synchronized frame budget, design token pipeline, and procedural audio bus.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Interactive Hub / Satellite Selector */}
        <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-3xl bg-neutral-950/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
          
          {/* Ambient Radial Mesh */}
          <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent" />

          {/* Central Mother Hub Core */}
          <div className="relative z-10 flex flex-col items-center justify-center py-6">
            <div className="relative group cursor-pointer" onClick={() => sounds.playChime()}>
              <div className="size-20 sm:size-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 animate-pulse-glow shadow-[0_0_50px_rgba(99,102,241,0.5)] flex items-center justify-center">
                <div className="size-full rounded-full bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-2">
                  <span className="font-syne font-black text-xs text-white">MOTHER</span>
                  <span className="text-[9px] font-mono text-indigo-300">CORE HUB</span>
                </div>
              </div>
              <div className="absolute -inset-3 rounded-full border border-indigo-500/30 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
            <div className="font-mono text-xs text-slate-400 mt-3 text-center">
              CENTRAL DISPATCH BUS // 120 FPS SHARED PIPELINE
            </div>
          </div>

          {/* Satellite Orbit Service Nodes */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
            {services.map((s) => {
              const isSelected = activeNode.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    sounds.playClick(600 + parseInt(s.num) * 40);
                    setActiveNode(s);
                  }}
                  className={`p-2.5 rounded-xl text-left transition-all border font-mono select-none ${
                    isSelected
                      ? 'bg-indigo-500/20 border-indigo-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-bold">{s.num}</span>
                    <span 
                      style={{ backgroundColor: s.accentColor }} 
                      className="size-1.5 rounded-full" 
                    />
                  </div>
                  <div className="text-[11px] font-syne font-semibold truncate leading-tight">
                    {s.title.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Side: Active Node Satellite Inspector */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-white/15 backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[460px]">
          
          {/* Subtle Top Glow matching Active Node */}
          <div 
            className="absolute -top-24 -right-24 size-48 rounded-full blur-3xl opacity-30 transition-all duration-500"
            style={{ backgroundColor: activeNode.accentColor }}
          />

          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                Unit {activeNode.num} // {activeNode.category}
              </span>
              <span 
                style={{ color: activeNode.accentColor }}
                className="font-mono text-xs font-semibold"
              >
                ● Connected to Hub
              </span>
            </div>

            <h3 className="font-syne text-2xl font-bold text-white mb-1">
              {activeNode.title}
            </h3>
            <p className="text-xs font-mono text-indigo-300 mb-4">
              {activeNode.tagline}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeNode.shortDesc}
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-white/10 mb-6">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
                Core Deliverables
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {activeNode.deliverables.slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-indigo-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-500">BASE COMMITMENT</div>
              <div className="font-syne text-lg font-bold text-white">
                {activeNode.basePrice}
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playSuccess();
                onSelectService(activeNode);
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-slate-200 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Full Specifications</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
