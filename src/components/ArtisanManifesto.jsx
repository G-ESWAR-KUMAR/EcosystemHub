import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Clock, MapPin, Feather, Sparkles } from 'lucide-react';
import { CRAFT_LEGENDS } from '../data/services';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function ArtisanManifesto() {
  const [timeStr, setTimeStr] = useState('');
  const [email, setEmail] = useState('');
  const [concept, setConcept] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#e8d5b5', '#ffffff', '#8e8e93']
    });

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      setConcept('');
    }, 4000);
  };

  return (
    <section id="manifesto" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-24 border-t border-white/[0.08] select-none">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: The Human Touch Philosophy & Manifesto */}
        <div className="lg:col-span-7">
          
          <div className="text-xs font-mono text-[#E8D5B5] tracking-widest uppercase mb-4 flex items-center gap-2">
            <Feather className="size-3.5" />
            <span>[ SECTION III // THE ATELIER MANIFESTO ]</span>
          </div>

          <h2 className="font-sans-clean text-3xl sm:text-5xl font-bold text-[#F0F0EB] tracking-tight leading-[1.08] mb-8">
            Digital spaces should feel like{' '}
            <span className="font-serif-luxury italic font-normal text-[#E8D5B5]">
              they were touched by human hands.
            </span>
          </h2>

          <div className="space-y-6 text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-2xl">
            <p>
              In an era overwhelmed by AI-generated boilerplate and templated monotony, digital products have lost their texture. We operate as an artisanal software atelier: treating bezier curves like brushstrokes, and spring physics like fine mechanical horology.
            </p>
            <p>
              When a visitor drags an island dock on this mother page, the deceleration curve was not plucked from a framework default; it was calibrated through hundreds of fingertip tests to mimic the physical resistance of machined aluminum.
            </p>
            <div className="pt-2 font-hand text-xl text-[#E8D5B5] leading-snug">
              "We measure craft not in lines of code, but in the goosebumps felt during a micro-interaction."
            </div>
          </div>

          {/* Studio Coordinates & Live Clock */}
          <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-[#E8D5B5]" />
              <div className="text-xs font-mono">
                <div className="text-[#6A6A74] text-[10px]">LOCAL ATELIER TIME</div>
                <div className="text-[#F0F0EB] font-bold">{timeStr || '20:45:00'} GMT+5:30</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="size-4 text-[#E8D5B5]" />
              <div className="text-xs font-mono">
                <div className="text-[#6A6A74] text-[10px]">STUDIO COORDINATES</div>
                <div className="text-[#F0F0EB] font-bold">Principal Engineer On Desk</div>
              </div>
            </div>
          </div>

          {/* Craft Legends Tribute */}
          <div className="mt-10">
            <div className="text-[11px] font-mono text-[#6A6A74] uppercase tracking-wider mb-3">
              Inspired by the Masters of Modern Micro-Interaction:
            </div>
            <div className="flex flex-wrap gap-2">
              {CRAFT_LEGENDS.map((legend, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.01] text-xs font-mono text-[#8E8E93] hover:text-[#E8D5B5] hover:border-white/20 transition-all cursor-default"
                >
                  {legend.name} <span className="text-[#555]">{legend.handle}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Direct Architectural Briefing Channel */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#08080A] border border-white/[0.08] relative overflow-hidden shadow-2xl">
          
          <div className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-[#E8D5B5]/5 blur-3xl" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
            <span className="text-xs font-mono text-[#E8D5B5] tracking-wider uppercase">DIRECT ATELIER DESK</span>
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <h3 className="font-sans-clean text-2xl font-bold text-[#F0F0EB] mb-2">
            Schedule a Technical Dialogue.
          </h3>
          <p className="text-xs text-[#8E8E93] leading-relaxed mb-6">
            Direct access to our Lead Creative Engineer. No marketing intermediaries. Discuss your product's motion, shaders, or bento layout.
          </p>

          {sent ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center animate-fadeIn">
              <CheckCircle2 className="size-8 text-emerald-400 mx-auto mb-2" />
              <h4 className="font-sans-clean font-bold text-white text-sm">Brief Transmitted</h4>
              <p className="text-xs text-[#8E8E93] mt-1">
                An engineer is reviewing your concept. We will reply to {email} within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-[#6A6A74] mb-1">Direct Contact Email</label>
                <input
                  type="email"
                  required
                  placeholder="marcus@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.08] text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#E8D5B5] transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#6A6A74] mb-1">Product Context or Inquired Disciplines</label>
                <textarea
                  rows="3"
                  required
                  placeholder="E.g. We require bespoke WebGL shaders and 120fps Lenis scroll choreography for our flagship launch..."
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/[0.08] text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#E8D5B5] transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#F0F0EB] hover:bg-white text-[#030304] font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Transmit Technical Inquiry</span>
              </button>
            </form>
          )}

          <div className="pt-4 mt-6 border-t border-white/[0.06] flex justify-between items-center text-[10px] font-mono text-[#6A6A74]">
            <span>STRICT 2-HOUR RESPONSE SLA</span>
            <span className="text-[#E8D5B5]">HUMAN VERIFIED</span>
          </div>

        </div>

      </div>

    </section>
  );
}
