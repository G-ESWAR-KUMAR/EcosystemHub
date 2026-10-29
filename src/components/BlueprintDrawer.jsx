import React, { useState } from 'react';
import { X, Trash2, Sparkles, ArrowRight, Download, CheckCircle2, Layers } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function BlueprintDrawer({ 
  isOpen, 
  onClose, 
  blueprint, 
  onRemoveFromBlueprint, 
  onClearBlueprint 
}) {
  const [ordered, setOrdered] = useState(false);

  if (!isOpen) return null;

  // Calculate total price
  const totalAmount = blueprint.reduce((acc, curr) => {
    const num = parseInt(curr.basePrice.replace(/\D/g, '')) || 0;
    return acc + num;
  }, 0);

  const handleCheckout = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      onClose();
    }, 3500);
  };

  const handleExportBrief = () => {
    sounds.playClick(800);
    const content = `NEXUS MOTHER // CUSTOM PROJECT BLUEPRINT
Generated: ${new Date().toLocaleDateString()}

Selected Studios (${blueprint.length}):
${blueprint.map(b => `- [${b.num}] ${b.title} (${b.category}) - ${b.basePrice} | SLA: ${b.deliveryTime}`).join('\n')}

Estimated Total Investment: $${totalAmount.toLocaleString()}
Architecture Philosophy: Handcrafted Human Touch, 120 FPS Frame Budget, Procedural Audio

Contact: hello@nexus-mother.studio`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus-project-blueprint.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md h-full bg-neutral-950 border-l border-white/15 p-6 flex flex-col justify-between shadow-2xl animate-slideLeft">
        
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-indigo-400" />
              <h3 className="font-syne text-lg font-bold text-white">Project Blueprint</h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                {blueprint.length} stacked
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Blueprint Service Stack List */}
          <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
            {blueprint.length === 0 ? (
              <div className="py-16 text-center text-slate-500 font-mono text-xs">
                No services added yet. Browse the catalogue and click "+ Stack" on any service.
              </div>
            ) : (
              blueprint.map(service => (
                <div 
                  key={service.id}
                  className="p-3.5 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">{service.num}</span>
                      <h4 className="text-xs font-bold text-white font-syne">{service.title}</h4>
                    </div>
                    <div className="text-[11px] font-mono text-indigo-400 mt-0.5">
                      {service.basePrice} • {service.deliveryTime}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick(400);
                      onRemoveFromBlueprint(service.id);
                    }}
                    className="p-1.5 rounded text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove from stack"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Drawer Footer & Total Estimator */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ESTIMATED INVESTMENT</span>
            <span className="text-lg font-bold text-white font-syne">
              ${totalAmount.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              disabled={blueprint.length === 0}
              onClick={handleExportBrief}
              className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="size-3.5" />
              <span>Export Brief</span>
            </button>
            <button
              disabled={blueprint.length === 0}
              onClick={handleCheckout}
              className="flex-1 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-slate-200 disabled:opacity-40 transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-indigo-600" />
              <span>{ordered ? 'Confirmed!' : 'Submit Blueprint'}</span>
            </button>
          </div>

          {blueprint.length > 0 && (
            <button
              onClick={onClearBlueprint}
              className="w-full text-center text-[10px] font-mono text-slate-500 hover:text-slate-400"
            >
              Clear entire blueprint
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
