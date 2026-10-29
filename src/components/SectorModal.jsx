import React, { useState } from 'react';
import { X, Check, Heart, ArrowRight, ShieldCheck, Clock, User, Send, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function SectorModal({ sector, onClose }) {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryContact, setInquiryContact] = useState('');
  const [inquiryNote, setInquiryNote] = useState('');
  const [sent, setSent] = useState(false);

  if (!sector) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#fdfcfb] text-[#1a1a1a] border border-[#e8e6e1] shadow-2xl p-6 sm:p-10 flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick(500);
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 hover:text-black transition-colors"
        >
          <X className="size-5" />
        </button>

        <div>
          {/* Header Photo & Tag */}
          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 shadow-md">
            <img 
              src={sector.img} 
              alt={sector.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
              <div>
                <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                  {sector.code} // {sector.category}
                </span>
                <h2 className="font-syne text-3xl sm:text-4xl font-extrabold tracking-tight mt-2">
                  {sector.name}
                </h2>
                <p className="text-sm text-white/90 font-light mt-1">
                  {sector.tagline}
                </p>
              </div>

              <span className="font-mono text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm hidden sm:inline">
                {sector.pricing}
              </span>
            </div>
          </div>

          {/* Human Touch Story */}
          <div className="p-5 rounded-2xl bg-[#f5f4f0] border border-[#ebe8e2] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8c6d46] font-semibold uppercase tracking-wider mb-2">
              <Heart className="size-3.5 fill-[#8c6d46]" />
              <span>The Human Touch Commitment</span>
            </div>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-light">
              "{sector.humanTouch}"
            </p>
            <div className="mt-3 pt-3 border-t border-black/5 flex items-center gap-2 text-xs text-gray-500 font-mono">
              <User className="size-3.5" />
              <span>Curated by: {sector.contactPerson}</span>
            </div>
          </div>

          {/* Highlights & Details */}
          <div className="mb-8">
            <h4 className="font-syne font-bold text-sm tracking-wider uppercase text-gray-600 mb-3">
              Hallmarks of Craft & Dignity
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sector.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#eae8e4] text-xs font-medium text-gray-800 shadow-sm">
                  <Check className="size-3.5 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Connection & Booking Form */}
          <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-syne font-bold text-lg text-gray-900">
                  Connect with {sector.name}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Direct inquiry to {sector.contactPerson}. Guaranteed warm human response.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Active Desk
              </span>
            </div>

            {sent ? (
              <div className="py-6 text-center text-emerald-700 animate-fadeIn">
                <CheckCircle2 className="size-10 mx-auto text-emerald-600 mb-2" />
                <h5 className="font-syne font-bold text-base">Inquiry Directly Transmitted</h5>
                <p className="text-xs text-emerald-600 mt-1">
                  {sector.contactPerson} will reach out to you within 2 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black font-sans"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone or Email"
                    value={inquiryContact}
                    onChange={(e) => setInquiryContact(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black font-sans"
                  />
                </div>
                <textarea
                  rows="2"
                  placeholder="Share your requirements or preferred time..."
                  value={inquiryNote}
                  onChange={(e) => setInquiryNote(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-black font-sans"
                />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-mono text-gray-500">
                    SLA: {sector.timing}
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-syne font-bold text-xs hover:bg-black transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Send Direct Request</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
