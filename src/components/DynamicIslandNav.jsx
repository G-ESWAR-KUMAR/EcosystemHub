import React from 'react';
import { Volume2, VolumeX, Command, Layers, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/audio';

export function DynamicIslandNav({ 
  soundEnabled, 
  onToggleSound, 
  onOpenCommand, 
  blueprintCount, 
  onOpenBlueprint,
  onOpenConsultation 
}) {
  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 px-4 sm:px-5 py-2.5 rounded-full bg-[#08080A]/90 border border-white/[0.08] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/20">
        
        {/* Brand / Logo */}
        <a 
          href="#top" 
          onClick={() => sounds.playClick(600)}
          className="flex items-center gap-2 pr-3 border-r border-white/[0.08] group"
        >
          <div className="size-6 rounded-full bg-white flex items-center justify-center text-[#030304] font-bold text-xs font-mono">
            ✦
          </div>
          <span className="font-sans-clean font-bold text-xs sm:text-sm tracking-tight text-[#F0F0EB]">
            ATELIER NEXUS
          </span>
        </a>

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-mono text-[#8E8E93]">
          <a 
            href="#catalogue" 
            onClick={() => sounds.playHover()}
            className="px-3 py-1 rounded-full hover:text-white transition-colors"
          >
            10 Disciplines
          </a>
          <a 
            href="#manifesto" 
            onClick={() => sounds.playHover()}
            className="px-3 py-1 rounded-full hover:text-[#E8D5B5] transition-colors"
          >
            Atelier Manifesto
          </a>
        </nav>

        {/* Command Search Pill */}
        <button
          onClick={() => {
            sounds.playClick(750);
            onOpenCommand();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-[#8E8E93] hover:text-white hover:border-white/20 transition-all active:scale-95"
          title="Open Command Palette (Cmd+K)"
        >
          <Command className="size-3 text-[#E8D5B5]" />
          <span className="hidden sm:inline text-[11px]">Search</span>
          <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-black/60 border border-white/[0.08] text-[9px] text-[#6A6A74]">⌘K</kbd>
        </button>

        {/* Procedural Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono transition-all active:scale-95 border ${
            soundEnabled 
              ? 'border-[#E8D5B5]/40 bg-[#E8D5B5]/10 text-[#E8D5B5]' 
              : 'border-white/[0.08] text-[#6A6A74] hover:text-white'
          }`}
          title={soundEnabled ? "Web Audio Active" : "Audio Muted"}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="size-3" />
              <span className="hidden sm:inline text-[10px]">Audio</span>
            </>
          ) : (
            <>
              <VolumeX className="size-3" />
              <span className="hidden sm:inline text-[10px]">Mute</span>
            </>
          )}
        </button>

        {/* Blueprint Stack Pill */}
        <button
          onClick={() => {
            sounds.playClick(850);
            onOpenBlueprint();
          }}
          className="relative flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] hover:border-white/25 text-xs font-mono text-[#F0F0EB] transition-all active:scale-95"
        >
          <Layers className="size-3 text-[#E8D5B5]" />
          <span className="hidden sm:inline">Blueprint</span>
          <span className="size-4 rounded-full bg-[#E8D5B5] text-[#030304] text-[10px] flex items-center justify-center font-bold">
            {blueprintCount}
          </span>
        </button>

        {/* Inquire Action */}
        <button
          onClick={() => {
            sounds.playSuccess();
            onOpenConsultation();
          }}
          className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-[#F0F0EB] text-[#030304] font-semibold text-xs hover:bg-white transition-all active:scale-95 shadow-sm"
        >
          <span>Direct Desk</span>
          <ArrowUpRight className="size-3" />
        </button>

      </div>
    </header>
  );
}
