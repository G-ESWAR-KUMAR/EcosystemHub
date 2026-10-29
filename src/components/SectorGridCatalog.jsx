import React, { useState } from 'react';
import { Search, ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { CATEGORIES } from '../data/services';
import { sounds } from '../utils/audio';

export function SectorGridCatalog({ sectors, onSelectSector }) {
  const [selectedCat, setSelectedCat] = useState('All Sectors');
  const [query, setQuery] = useState('');

  const filtered = sectors.filter(s => {
    const matchCat = selectedCat === 'All Sectors' || s.category === selectedCat;
    const matchQ = s.name.toLowerCase().includes(query.toLowerCase()) ||
                   s.desc?.toLowerCase().includes(query.toLowerCase()) ||
                   s.shortDesc?.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <section id="directory" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#e8e6e1] select-none">
      
      {/* Directory Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-mono text-[#8c6d46] font-semibold tracking-wider uppercase mb-1 flex items-center gap-2">
            <Sparkles className="size-3.5" />
            <span>Curated Directory</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-gray-900">
            The Complete Sector Index.
          </h2>
          <p className="text-sm text-gray-600 mt-1 max-w-md">
            Filter or search through all ten human-crafted disciplines.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="size-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search silk, turf, cafe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#e2e0da] text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black font-sans shadow-sm"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.slice(0, 7).map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCat(cat);
              sounds.playHover();
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-syne font-medium whitespace-nowrap transition-all border ${
              selectedCat === cat
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : 'bg-white text-gray-600 border-[#e5e3de] hover:border-gray-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 10-Sector Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(sector => (
          <div
            key={sector.id}
            onClick={() => {
              sounds.playClick(900);
              onSelectSector(sector);
            }}
            className="group rounded-3xl bg-white border border-[#e8e6e1] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Photo Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sector.img}
                  alt={sector.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-mono">
                  {sector.code}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-gray-800 text-[10px] font-mono font-semibold">
                  {sector.category}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <h3 className="font-syne text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#8c6d46] transition-colors">
                  {sector.name}
                </h3>
                <p className="text-xs text-gray-500 font-mono mb-3">
                  {sector.tagline}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed font-light line-clamp-2">
                  {sector.desc || sector.shortDesc}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                  {sector.highlights?.slice(0, 2).map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600">
                      <Check className="size-3 text-emerald-600" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-900 font-bold">{sector.pricing}</span>
              <button className="px-3.5 py-1.5 rounded-full bg-gray-100 group-hover:bg-gray-900 group-hover:text-white transition-colors flex items-center gap-1 text-[11px] font-syne font-semibold">
                <span>View</span>
                <ArrowUpRight className="size-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
