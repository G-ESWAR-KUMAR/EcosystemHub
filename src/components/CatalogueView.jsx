import React, { useState } from 'react';
import { LayoutGrid, Table, Search, Sparkles, Filter, Check, ArrowUpRight } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { CATEGORIES } from '../data/services';
import { sounds } from '../utils/audio';

export function CatalogueView({ 
  services, 
  onSelectService, 
  blueprint, 
  onToggleBlueprint,
  showAnnotations
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortBy, setSortBy] = useState('default');

  // Filter & Search Logic
  const filtered = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All Services' || s.category === selectedCategory;
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return parseInt(a.basePrice.replace(/\D/g, '')) - parseInt(b.basePrice.replace(/\D/g, ''));
    if (sortBy === 'price-desc') return parseInt(b.basePrice.replace(/\D/g, '')) - parseInt(a.basePrice.replace(/\D/g, ''));
    return 0;
  });

  return (
    <section id="catalogue" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Catalogue Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 mb-2">
            <Sparkles className="size-3 text-indigo-400" />
            <span>SPECIALIZED DIGITAL CATALOGUE</span>
          </div>
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-white">
            10 Dedicated Craft Units.
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-lg">
            Choose individual services or stack them modularly into a tailored production blueprint.
          </p>
        </div>

        {/* View Mode & Sorter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search stack, shader, bento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors w-48 sm:w-56 font-mono"
            />
          </div>

          {/* Sorter */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              sounds.playClick(650);
            }}
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer font-mono"
          >
            <option value="default">Sort: Default Order</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="price-asc">Sort: Price (Low → High)</option>
            <option value="price-desc">Sort: Price (High → Low)</option>
          </select>

          {/* Grid vs Table Toggle */}
          <div className="flex rounded-xl bg-neutral-900 border border-white/10 p-1">
            <button
              onClick={() => {
                setViewMode('grid');
                sounds.playClick(700);
              }}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Bento Grid View"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => {
                setViewMode('table');
                sounds.playClick(700);
              }}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-white/15 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Catalogue Table View"
            >
              <Table className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                sounds.playClick(800);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-white text-black font-semibold border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-neutral-900/80 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Count Banner */}
      <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-6">
        <span>SHOWING {sorted.length} OF {services.length} STUDIOS</span>
        <span>CLICK "INSPECT" FOR ARCHITECTURE & LIVE SANDBOX</span>
      </div>

      {/* Content Rendering: Grid vs Dense Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
              isInBlueprint={blueprint.some(b => b.id === service.id)}
              onToggleBlueprint={onToggleBlueprint}
              showAnnotations={showAnnotations}
            />
          ))}
        </div>
      ) : (
        /* Dense Table Catalogue View (Engineering matrix) */
        <div className="rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-white/5 border-b border-white/10 text-slate-400">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">SERVICE / SPECIALIZATION</th>
                <th className="py-3.5 px-4">CATEGORY</th>
                <th className="py-3.5 px-4">TECH STACK</th>
                <th className="py-3.5 px-4">SLA DELIVERY</th>
                <th className="py-3.5 px-4">STARTING</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sorted.map((s) => {
                const inBp = blueprint.some(b => b.id === s.id);
                return (
                  <tr key={s.id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="py-4 px-4 font-bold text-slate-500 group-hover:text-white">
                      {s.num}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-syne font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {s.tagline}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex flex-wrap gap-1">
                        {s.techStack.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{s.deliveryTime}</td>
                    <td className="py-4 px-4 font-bold text-white font-syne">{s.basePrice}</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            sounds.playSwitch(!inBp);
                            onToggleBlueprint(s);
                          }}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] transition-all border ${
                            inBp 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {inBp ? '✓ In Stack' : '+ Stack'}
                        </button>
                        <button
                          onClick={() => {
                            sounds.playClick(900);
                            onSelectService(s);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-[11px] hover:bg-slate-200 transition-all flex items-center gap-1 shadow-sm"
                        >
                          <span>Inspect</span>
                          <ArrowUpRight className="size-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {sorted.length === 0 && (
        <div className="py-16 text-center text-slate-500 font-mono text-sm">
          No services match your search query. Try searching for "motion", "shader", or "bento".
        </div>
      )}

    </section>
  );
}
