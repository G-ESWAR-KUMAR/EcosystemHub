import React from 'react';
import { ArrowUp, ExternalLink, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export function MonumentalFooter({ onBackToTop }) {
  return (
    <footer className="relative z-20 border-t border-white/[0.08] bg-[#030304] pt-20 pb-12 px-4 sm:px-8 select-none">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Top 4-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pb-16 border-b border-white/[0.08] text-xs font-mono">
          
          {/* Column 1: The Disciplines */}
          <div>
            <div className="text-[10px] text-[#6A6A74] tracking-widest uppercase mb-4">
              [ 10 DISCIPLINES ]
            </div>
            <ul className="space-y-2 text-[#8E8E93]">
              <li><a href="#catalogue" className="hover:text-white transition-colors">01 Kinetic Choreography</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">02 Spatial WebGL Shaders</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">03 Architectural Bento</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">04 Tactile Micro-Craft</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">05 Procedural Soundscapes</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">06 Semantic Design Tokens</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">07 Atmospheric Portals</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">08 Holographic 3D Cards</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">09 120 FPS Core Vitals</a></li>
              <li><a href="#catalogue" className="hover:text-white transition-colors">10 Artisan Human Touch</a></li>
            </ul>
          </div>

          {/* Column 2: Architecture & Specs */}
          <div>
            <div className="text-[10px] text-[#6A6A74] tracking-widest uppercase mb-4">
              [ CORE TELEMETRY ]
            </div>
            <ul className="space-y-2 text-[#8E8E93]">
              <li className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                <span>120 FPS Frame Budget</span>
              </li>
              <li>0.000 Cumulative Layout Shift</li>
              <li>0.00 KB Audio Payload</li>
              <li>Web Audio Procedural Synth</li>
              <li>GLSL Custom Shaders</li>
              <li>Tailwind v4 Token Engine</li>
            </ul>
          </div>

          {/* Column 3: Studies & Inspirations */}
          <div>
            <div className="text-[10px] text-[#6A6A74] tracking-widest uppercase mb-4">
              [ STUDY REFERENCES ]
            </div>
            <ul className="space-y-2 text-[#8E8E93]">
              <li>
                <a href="https://ui.aceternity.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Aceternity UI <ExternalLink className="size-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a href="https://skiper-ui.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Skiper UI <ExternalLink className="size-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a href="https://animmasterlib.dev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  AnimMasterLib <ExternalLink className="size-2.5 opacity-50" />
                </a>
              </li>
              <li className="pt-2 text-[10px] text-[#555]">
                Crafted with homage to Rauno Freiberg, Emil Kowalski, Manu Arora
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Coordinates */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-[#6A6A74] tracking-widest uppercase mb-4">
                [ ATELIER DISPATCH ]
              </div>
              <div className="text-white font-semibold">Atelier Nexus Mother</div>
              <div className="text-[#8E8E93] mt-1">contact@atelier-nexus.studio</div>
              <div className="mt-3 text-[11px] text-[#E8D5B5]">
                Guaranteed 2h direct response
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick(900);
                onBackToTop();
              }}
              className="mt-6 self-start px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs text-[#F0F0EB] transition-all flex items-center gap-2 hover:bg-white/[0.04]"
            >
              <span>Return to Apex</span>
              <ArrowUp className="size-3" />
            </button>
          </div>

        </div>

        {/* Colossal Typographic Masthead */}
        <div className="pt-16 pb-8 text-center overflow-hidden">
          <div className="font-sans-clean font-black text-[12vw] tracking-tighter leading-none text-white/[0.06] hover:text-white/[0.10] transition-colors uppercase select-none">
            ATELIER NEXUS
          </div>
        </div>

        {/* Bottom Metadata & Copyright */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#6A6A74]">
          <div className="flex items-center gap-2">
            <span>© 2026 ATELIER NEXUS</span>
            <span>•</span>
            <span>EDITION 01.4</span>
          </div>

          <div className="flex items-center gap-1 text-[#8E8E93]">
            <span>Handcrafted with genuine intention & human soul</span>
            <span className="text-[#E8D5B5] ml-1">✦</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
