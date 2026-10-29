import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Clock, ShieldCheck, Terminal, Layers, ArrowRight } from 'lucide-react';
import { renderMiniDemo } from './ServiceMiniDemos';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function ServiceDetailModal({ 
  service, 
  onClose, 
  isInBlueprint, 
  onToggleBlueprint 
}) {
  const [copied, setCopied] = useState(false);
  const [reserved, setReserved] = useState(false);

  if (!service) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(service.codeSnippet);
    sounds.playClick(900);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReserve = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setReserved(true);
    setTimeout(() => setReserved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col justify-between">
        
        {/* Top Header & Close Button */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold">
                Unit {service.num}
              </span>
              <span className="font-mono text-xs text-indigo-400">
                {service.category}
              </span>
              <span 
                style={{ color: service.accentColor, borderColor: `${service.accentColor}40`, backgroundColor: `${service.accentColor}15` }}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
              >
                {service.badge}
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-white">
              {service.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
              {service.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick(500);
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors border border-white/10"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 space-y-6">
          
          {/* Interactive Live Playground Box */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-white">
                <Sparkles className="size-3.5 text-indigo-400" />
                Live Component Sandbox
              </span>
              <span>Hardware Accelerated</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/80 border border-white/10">
              {renderMiniDemo(service.interactiveType)}
            </div>
          </div>

          {/* Architecture Overview & Human Touch Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Technical Specifications
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {service.shortDesc}
              </p>
              <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {service.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-indigo-300 border border-indigo-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>✦ Human Touch Rationale</span>
                </h4>
                <p className="text-sm font-caveat text-amber-200 leading-relaxed">
                  "{service.humanTouchNote}"
                </p>
              </div>
              <div className="text-[10px] font-mono text-amber-400/70 mt-3">
                Calibrated by Lead Motion Engineer
              </div>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Included Deliverables & Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200 font-sans">
                  <Check className="size-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copy-Paste Code Snippet */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="size-3 text-indigo-400" />
                <span>Integration Snippet (React / Next.js)</span>
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-all"
              >
                {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto selection:bg-emerald-500/30">
              <code>{service.codeSnippet}</code>
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <div className="text-slate-500 text-[10px]">PRODUCTION SLA</div>
              <div className="text-white font-bold">{service.deliveryTime}</div>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <div className="text-slate-500 text-[10px]">INVESTMENT</div>
              <div className="font-syne text-lg font-bold text-white">{service.basePrice}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playSwitch(!isInBlueprint);
                onToggleBlueprint(service);
              }}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all border flex items-center justify-center gap-1.5 ${
                isInBlueprint
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 text-slate-300 border-white/15 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Layers className="size-3.5" />
              <span>{isInBlueprint ? '✓ In Blueprint Stack' : '+ Add to Blueprint'}</span>
            </button>

            <button
              onClick={handleReserve}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-slate-200 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-1.5"
            >
              <span>{reserved ? 'Sprint Requested!' : 'Reserve Sprint Slot'}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
