import React, { useState } from 'react';
import { BookOpen, Coffee, Award, Sparkles, Send, CheckCircle2, UserCheck, Heart } from 'lucide-react';
import { CRAFT_LEGENDS } from '../data/services';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function StudioJournal() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryScope, setInquiryScope] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquiryEmail) return;

    sounds.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#f59e0b', '#10b981', '#ec4899']
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryScope('');
    }, 4000);
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Handcrafted Manifesto & Journal */}
        <div className="lg:col-span-7">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 mb-4">
            <BookOpen className="size-3 text-amber-400" />
            <span>STUDIO JOURNAL & HUMAN MANIFESTO</span>
          </div>

          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            The Digital Web Deserves a Heartbeat.
          </h2>

          <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-sans mb-8">
            <p>
              When web development transformed into automated component generators, something essential was sacrificed: 
              <span className="text-white font-medium"> the human sensation of touch, curiosity, and crafted friction</span>.
            </p>
            <p>
              Every service in this Mother Catalogue is designed around that friction. We tune spring damping curves to match the subtle resistance of mechanical camera lenses. We synthesize audio clicks to resonate at physical marimba harmonics. We build WebGL shaders with organic imperfections rather than sterile mathematical polygons.
            </p>
            <p className="font-caveat text-amber-300 text-xl leading-normal">
              "We write code not just for browsers to execute, but for humans to feel."
            </p>
          </div>

          {/* Studio Desk Counter */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-950/80 border border-white/10 mb-8">
            <div className="text-center p-2">
              <div className="text-lg sm:text-xl font-bold font-syne text-amber-400">840+</div>
              <div className="text-[11px] font-mono text-slate-400">Espressos Brewed</div>
            </div>
            <div className="text-center p-2 border-x border-white/10">
              <div className="text-lg sm:text-xl font-bold font-syne text-indigo-400">0.00%</div>
              <div className="text-[11px] font-mono text-slate-400">Auto Templates</div>
            </div>
            <div className="text-center p-2">
              <div className="text-lg sm:text-xl font-bold font-syne text-emerald-400">100%</div>
              <div className="text-[11px] font-mono text-slate-400">Human Authored</div>
            </div>
          </div>

          {/* Tribute & Inspiration Hall of Fame (Skiper UI style) */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="size-3.5 text-amber-400" />
              <span>Inspiration & Craft Hall of Fame</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CRAFT_LEGENDS.map((legend, i) => (
                <div 
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:border-indigo-400/40 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span className="text-indigo-400">✦</span>
                  <span className="font-semibold">{legend.name}</span>
                  <span className="text-slate-500 text-[10px]">{legend.handle}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Human Consultation Request Box */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-amber-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          <div className="pointer-events-none absolute -bottom-24 -right-24 size-60 rounded-full bg-amber-500/10 blur-3xl" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                <UserCheck className="size-4" />
                <span>DIRECT ACCESS CHANNEL</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                Online
              </span>
            </div>

            <h3 className="font-syne text-2xl font-bold text-white mb-2">
              Speak with a Real Engineer.
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              No account managers or sales funnels. Share your product concept and an engineer will review your tech stack and provide a technical architecture brief.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center animate-fadeIn">
                <CheckCircle2 className="size-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-syne font-bold text-white text-base">Direct Brief Received!</h4>
                <p className="text-xs text-emerald-200/80 mt-1">
                  Our Principal Engineer is reviewing your notes. Expect a reply to {inquiryEmail} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Direct Email</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Desired Services or Vision</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Tell us about the motion, shaders, or bento layout you envision..."
                    value={inquiryScope}
                    onChange={(e) => setInquiryScope(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black font-semibold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
                >
                  <Send className="size-3.5" />
                  <span>Send Direct Studio Note</span>
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Guaranteed 2-Hour SLA</span>
            <span className="flex items-center gap-1 text-amber-300">
              <Heart className="size-3 fill-amber-300" />
              Human First
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
