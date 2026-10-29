import React, { useState, useEffect } from 'react';
import { Heart, Clock, ShieldCheck, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function HumanConnectionSection() {
  const [timeStr, setTimeStr] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
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
      colors: ['#8c6d46', '#1a1a1a', '#e5e3de']
    });

    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <section id="connection" className="max-w-5xl mx-auto px-4 sm:px-8 py-20 border-t border-[#e8e6e1] select-none">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e5e3de] text-xs font-mono text-[#8c6d46] mb-4 shadow-sm">
          <Heart className="size-3 fill-[#8c6d46]" />
          <span>OUR CORE PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-syne text-gray-900 tracking-tight mb-4">
          Rooted in Connection<span className="text-[#8c6d46]">.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
          We believe that true luxury lies in empathy. Every service in our ecosystem is meticulously crafted not just to perform a function, but to foster genuine human connections.
        </p>
      </div>

      {/* 3 Pillars of Empathy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-white border border-[#e8e6e1] shadow-sm">
          <div className="size-10 rounded-2xl bg-[#f5f4f0] flex items-center justify-center text-[#8c6d46] font-syne font-bold mb-4">
            01
          </div>
          <h3 className="font-syne font-bold text-lg text-gray-900 mb-2">Empathetic Curation</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            Every sector in our ecosystem is chosen because it touches an essential dimension of human flourishing—from the clothes on your skin to the sanctuary of your home.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#e8e6e1] shadow-sm">
          <div className="size-10 rounded-2xl bg-[#f5f4f0] flex items-center justify-center text-[#8c6d46] font-syne font-bold mb-4">
            02
          </div>
          <h3 className="font-syne font-bold text-lg text-gray-900 mb-2">Heritage & Dignity</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            From our handloom silk weavers to our certified home helpers, we uphold fair-living wages, artisanal dignity, and generational respect.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#e8e6e1] shadow-sm">
          <div className="size-10 rounded-2xl bg-[#f5f4f0] flex items-center justify-center text-[#8c6d46] font-syne font-bold mb-4">
            03
          </div>
          <h3 className="font-syne font-bold text-lg text-gray-900 mb-2">Human Concierge</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            Zero automated chat queues. When you reach out to any sector in our ecosystem, you connect with dedicated human sector directors.
          </p>
        </div>
      </div>

      {/* Concierge Desk Box */}
      <div className="p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 mb-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>GLOBAL CONCIERGE ACTIVE</span>
          </div>
          <h4 className="font-syne text-2xl font-bold text-gray-900 mb-2">
            Have a question about our sectors?
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed font-light mb-4">
            Whether inquiring about bespoke bridal silk weaves, reserving boutique hotel suites, or arranging trusted home care—our concierge is here to assist you.
          </p>
          <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
            <Clock className="size-3.5 text-[#8c6d46]" />
            <span>Local Hub Time: {timeStr || '21:00:00'} GMT+5:30</span>
          </div>
        </div>

        <div className="md:col-span-6">
          {sent ? (
            <div className="py-8 text-center text-emerald-800 animate-fadeIn">
              <CheckCircle2 className="size-8 mx-auto text-emerald-600 mb-2" />
              <h5 className="font-syne font-bold text-sm">Message Received</h5>
              <p className="text-xs text-emerald-600 mt-1">Our concierge will reach out to {email} shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Your Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-black font-sans"
              />
              <textarea
                rows="2"
                required
                placeholder="Which sector can we assist you with?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-black font-sans"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-gray-900 text-white font-syne font-bold text-xs hover:bg-black transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <Send className="size-3" />
                <span>Transmit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

    </section>
  );
}
