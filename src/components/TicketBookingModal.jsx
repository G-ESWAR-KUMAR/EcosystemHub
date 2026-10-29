import React, { useState } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, Users, CheckCircle2, QrCode, Download, Printer, ShieldCheck, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

const EXPERIENCES = [
  { id: 'exp-turf', name: 'FIFA Floodlit Match Night', venue: 'Turf Arena, Pitch A', basePrice: 35, category: 'Sports' },
  { id: 'exp-silk', name: 'Sania Silks Master Heritage Exhibition', venue: 'Sania Atrium, Grand Hall', basePrice: 25, category: 'Heritage' },
  { id: 'exp-cafe', name: 'Acoustic Vinyl Night & Cupping', venue: 'Artisan Cafe, Timber Deck', basePrice: 20, category: 'Culture' },
  { id: 'exp-rider', name: 'RiderBro Coastal Trail Weekend', venue: 'Rider Hub, Sector 05', basePrice: 120, category: 'Expedition' },
  { id: 'exp-wellness', name: 'Sunset Tibetan Sound Bath', venue: 'Wellness Pavilion, Lotus Room', basePrice: 75, category: 'Wellness' },
  { id: 'exp-jazz', name: 'Courtyard Jazz & Farm Feast', venue: 'Boutique Hotel Courtyard', basePrice: 60, category: 'Hospitality' }
];

export function TicketBookingModal({ isOpen, onClose }) {
  const [selectedExp, setSelectedExp] = useState(EXPERIENCES[0]);
  const [bookingDate, setBookingDate] = useState('2026-11-04');
  const [timeSlot, setTimeSlot] = useState('19:00 — 21:00');
  const [ticketTier, setTicketTier] = useState('Premium');
  const [quantity, setQuantity] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  if (!isOpen) return null;

  const tierMultiplier = ticketTier === 'VIP Pass' ? 1.8 : ticketTier === 'Premium' ? 1.3 : 1.0;
  const totalPrice = Math.round(selectedExp.basePrice * tierMultiplier * quantity);

  const handleBook = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#8c6d46', '#1a1a1a', '#ffffff']
    });

    const ticketId = 'TTB-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmedTicket({
      id: ticketId,
      experience: selectedExp.name,
      venue: selectedExp.venue,
      date: bookingDate,
      time: timeSlot,
      tier: ticketTier,
      quantity,
      guestName: guestName || 'Esteemed Guest',
      guestContact: guestContact || 'Verified Contact',
      totalPaid: totalPrice
    });
  };

  const handleReset = () => {
    setConfirmedTicket(null);
    setGuestName('');
    setGuestContact('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#fdfcfb] text-[#1a1a1a] border border-[#e5e3de] shadow-2xl p-6 sm:p-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#eae8e4] mb-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Ticket className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-syne text-2xl font-extrabold text-gray-900">
                  True Ticket Booking
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  Sector # 10
                </span>
              </div>
              <p className="text-xs text-gray-500 font-mono mt-0.5">
                Official Digital Box Office • Zero Hidden Platform Fees
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick(400);
              onClose();
            }}
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-black transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* View 1: The Booking Form */}
        {!confirmedTicket ? (
          <form onSubmit={handleBook} className="space-y-6">
            
            {/* Step 1: Select Experience */}
            <div>
              <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider mb-2">
                1. Select Ecosystem Experience
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXPERIENCES.map((exp) => {
                  const isSel = selectedExp.id === exp.id;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => {
                        setSelectedExp(exp);
                        sounds.playClick(600);
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        isSel
                          ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                          : 'border-[#eae8e4] bg-white text-gray-800 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex justify-between items-start text-xs font-syne font-bold mb-1">
                        <span className="leading-snug">{exp.name}</span>
                        <span className={isSel ? 'text-rose-300' : 'text-[#8c6d46]'}>${exp.basePrice}</span>
                      </div>
                      <div className={`text-[11px] font-mono ${isSel ? 'text-gray-300' : 'text-gray-500'}`}>
                        {exp.venue}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-rose-600" />
                  <span>2. Preferred Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:outline-none focus:border-black bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-rose-600" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:outline-none focus:border-black bg-white cursor-pointer"
                >
                  <option value="09:00 — 11:00">Morning (09:00 — 11:00)</option>
                  <option value="15:00 — 17:00">Afternoon (15:00 — 17:00)</option>
                  <option value="19:00 — 21:00">Evening Floodlight (19:00 — 21:00)</option>
                  <option value="21:30 — 23:30">Night Prime Slot (21:30 — 23:30)</option>
                </select>
              </div>
            </div>

            {/* Step 3: Tier & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  3. Admission Tier
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Standard', 'Premium', 'VIP Pass'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setTicketTier(t);
                        sounds.playClick(750);
                      }}
                      className={`py-2 rounded-xl text-xs font-syne font-semibold border transition-all ${
                        ticketTier === t
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users className="size-3.5 text-rose-600" />
                  <span>Number of Passes</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                        sounds.playClick(500);
                      }
                    }}
                    className="size-10 rounded-xl border border-gray-200 bg-white font-bold text-base hover:bg-gray-100 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-syne font-extrabold text-xl w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity(quantity + 1);
                      sounds.playClick(650);
                    }}
                    className="size-10 rounded-xl border border-gray-200 bg-white font-bold text-base hover:bg-gray-100 flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-xs font-mono text-gray-500 ml-auto">
                    ${Math.round(selectedExp.basePrice * tierMultiplier)} / pass
                  </span>
                </div>
              </div>
            </div>

            {/* Step 4: Attendee Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-gray-500 mb-1">Lead Guest Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Mehra"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-sans focus:outline-none focus:border-black bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-gray-500 mb-1">WhatsApp or Email for Ticket QR</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or email"
                  value={guestContact}
                  onChange={(e) => setGuestContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-sans focus:outline-none focus:border-black bg-white"
                />
              </div>
            </div>

            {/* Bottom Total & Submit Bar */}
            <div className="pt-4 border-t border-[#eae8e4] flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-gray-500 uppercase">
                  Total Investment ({quantity} Passes)
                </div>
                <div className="font-syne text-2xl font-extrabold text-gray-900">
                  ${totalPrice}
                  <span className="text-xs font-mono font-normal text-emerald-600 ml-2">✓ 0% Platform Fee</span>
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-syne font-bold text-xs tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="size-4" />
                <span>Generate True Ticket</span>
              </button>
            </div>

          </form>
        ) : (
          /* View 2: The Verified True Ticket Pass */
          <div className="space-y-6 animate-fadeIn">
            
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-syne font-bold text-sm text-emerald-900">
                  True Ticket Confirmed & Pass Issued!
                </div>
                <div className="text-xs text-emerald-700 font-sans">
                  Digital ticket delivered to {confirmedTicket.guestContact}. Show this pass at entry gate.
                </div>
              </div>
            </div>

            {/* Physical-Style Boarding Pass Card */}
            <div className="rounded-3xl bg-white border border-[#e5e3de] overflow-hidden shadow-xl">
              
              {/* Ticket Top Header */}
              <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-sm">
                    TTB
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-rose-300 uppercase">
                      OFFICIAL ADMISSION PASS
                    </span>
                    <h4 className="font-syne text-xl font-bold">{confirmedTicket.experience}</h4>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-gray-400">REFERENCE ID</div>
                  <div className="font-mono font-bold text-sm text-rose-300">{confirmedTicket.id}</div>
                </div>
              </div>

              {/* Ticket Details Body */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono border-b border-dashed border-gray-200">
                <div>
                  <div className="text-gray-400 text-[10px]">GUEST NAME</div>
                  <div className="font-bold text-gray-900 mt-0.5">{confirmedTicket.guestName}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">EVENT DATE</div>
                  <div className="font-bold text-gray-900 mt-0.5">{confirmedTicket.date}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">TIME WINDOW</div>
                  <div className="font-bold text-gray-900 mt-0.5">{confirmedTicket.time}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">SEAT / TIER</div>
                  <div className="font-bold text-rose-700 mt-0.5">{confirmedTicket.tier} ({confirmedTicket.quantity} Passes)</div>
                </div>
              </div>

              {/* Venue & QR Barcode Section */}
              <div className="p-6 bg-[#faf9f8] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
                    <MapPin className="size-3.5 text-rose-600" />
                    <span className="font-semibold">{confirmedTicket.venue}</span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">
                    Paid Amount: <strong className="text-gray-900">${confirmedTicket.totalPaid}</strong> • 100% Verified Entry
                  </div>
                </div>

                {/* Simulated Scannable Barcode & QR */}
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-200">
                  <div className="size-14 bg-gray-900 text-white p-1 rounded-xl flex items-center justify-center">
                    <QrCode className="size-10" />
                  </div>
                  <div className="font-mono text-[9px] text-gray-400 tracking-widest text-center">
                    <div>SCAN AT GATE</div>
                    <div className="text-gray-900 font-bold tracking-normal text-xs">{confirmedTicket.id}</div>
                    <div>TRUE TICKET</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions: Print / Download / Book Another */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playClick(600);
                  window.print();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-gray-300 hover:border-black text-xs font-syne font-semibold flex items-center justify-center gap-2 bg-white"
              >
                <Printer className="size-3.5" />
                <span>Print or Save PDF Pass</span>
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gray-900 text-white font-syne font-bold text-xs hover:bg-black transition-all"
              >
                Book Another Ticket
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
