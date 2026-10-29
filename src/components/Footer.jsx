import React from 'react';
import { Heart, Sparkles, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/audio';

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-neutral-950 px-4 sm:px-6 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        
        {/* Brand & Manifesto */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="size-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-syne font-bold text-xs">
              N
            </div>
            <span className="font-syne font-bold text-base text-white tracking-tight">
              NEXUS MOTHER ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-sans">
            The mother portal connecting 10 individual creative engineering services. Built with Framer physics, Three.js shaders, and calibrated human touch.
          </p>
        </div>

        {/* Operational Status & Telemetry */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-white/10 flex flex-col gap-1 min-w-[240px]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">CORE STATUS</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              100% OPERATIONAL
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Latency: 0.1ms • Frame Budget: 120 FPS
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Engineered for modern high-refresh screens
          </div>
        </div>

      </div>

      {/* Reference Links & Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Study References:</span>
          <a 
            href="https://ui.aceternity.com" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            Aceternity UI <ExternalLink className="size-2.5" />
          </a>
          <a 
            href="https://skiper-ui.com" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            Skiper UI <ExternalLink className="size-2.5" />
          </a>
          <a 
            href="https://animmasterlib.dev" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            AnimMasterLib <ExternalLink className="size-2.5" />
          </a>
        </div>

        <div className="flex items-center gap-1 text-slate-400 font-sans">
          <span>Crafted with</span>
          <Heart className="size-3 text-red-500 fill-red-500/80 mx-0.5" />
          <span>& human intention • NEXUS STUDIO © 2026</span>
        </div>
      </div>
    </footer>
  );
}
