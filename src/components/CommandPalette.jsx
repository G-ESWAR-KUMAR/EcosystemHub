import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, Volume2, Sparkles, PhoneCall, Heart, X } from 'lucide-react';
import { sounds } from '../utils/audio';

export function CommandPalette({ 
  isOpen, 
  onClose, 
  services, 
  onSelectService,
  onToggleSound,
  soundEnabled,
  onWarmthChange,
  onOpenConsultation
}) {
  const [query, setQuery] = useState('');

  // Close on Escape, toggle on Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase()) ||
    s.tagline.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-neutral-950 border border-white/20 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="size-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or service name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded text-slate-500 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Command Menu Results */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          
          {/* Quick System Actions */}
          <div className="text-[10px] text-slate-500 px-3 py-1 uppercase tracking-wider">
            Quick Actions
          </div>

          <button
            onClick={() => {
              onToggleSound();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Volume2 className="size-3.5 text-purple-400" />
              <span>Toggle Procedural Web Audio</span>
            </span>
            <span className="text-[10px] text-slate-500">{soundEnabled ? 'Active' : 'Muted'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playSuccess();
              onWarmthChange(0.95);
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Heart className="size-3.5 text-amber-400" />
              <span>Set Atmosphere to Warm Artisan Mode</span>
            </span>
            <span className="text-[10px] text-amber-300">Preset</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(800);
              onOpenConsultation();
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <PhoneCall className="size-3.5 text-emerald-400" />
              <span>Schedule Direct 1-on-1 Engineer Briefing</span>
            </span>
            <span className="text-[10px] text-emerald-400">Available</span>
          </button>

          {/* Filtered Services */}
          <div className="text-[10px] text-slate-500 px-3 py-1 uppercase tracking-wider mt-3">
            Services ({filteredServices.length})
          </div>

          {filteredServices.map(s => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick(900);
                onSelectService(s);
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:bg-indigo-500/15 hover:text-white hover:border-indigo-500/30 border border-transparent transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-slate-500 group-hover:text-indigo-400">{s.num}</span>
                <span className="font-semibold text-white">{s.title}</span>
                <span className="text-[10px] text-slate-500">[{s.category}]</span>
              </div>
              <ArrowRight className="size-3 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}

          {filteredServices.length === 0 && (
            <div className="text-center py-6 text-slate-500">
              No matching services found.
            </div>
          )}

        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Use [ESC] to exit</span>
          <span>NEXUS MOTHER ENGINE v3.4</span>
        </div>

      </div>
    </div>
  );
}
