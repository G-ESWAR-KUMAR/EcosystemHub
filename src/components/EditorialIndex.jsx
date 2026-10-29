import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Plus, Check, Sparkles, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { renderMiniDemo } from './ServiceMiniDemos';
import { CATEGORIES } from '../data/services';
import { sounds } from '../utils/audio';

export function EditorialIndex({ 
  services, 
  onSelectService, 
  blueprint, 
  onToggleBlueprint,
  showAnnotations
}) {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [hoveredService, setHoveredService] = useState(services[0]);
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [viewMode, setViewMode] = useState('index'); // 'index' | 'matrix'

  // Smooth floating portal cursor follower
  const [portalPos, setPortalPos] = useState({ x: 0, y: 0, currentX: 0, currentY: 0 });
  const containerRef = useRef(null);

  const handleContainerMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPortalPos(prev => ({ ...prev, x, y }));
  };

  // Spring animation loop for floating preview
  useEffect(() => {
    let animId;
    const updatePosition = () => {
      setPortalPos(prev => ({
        ...prev,
        currentX: prev.currentX + (prev.x - prev.currentX) * 0.12,
        currentY: prev.currentY + (prev.y - prev.currentY) * 0.12,
      }));
      animId = requestAnimationFrame(updatePosition);
    };
    animId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animId);
  }, []);

  const filtered = services.filter(s => 
    activeCategory === 'All Services' || s.category === activeCategory
  );

  return (
    <section 
      id="catalogue"
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-20 select-none border-t border-white/[0.08]"
    >
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono text-[#E8D5B5] tracking-widest uppercase mb-2 flex items-center gap-2">
            <span>[ SECTION II // THE CATALOGUE ]</span>
          </div>
          <h2 className="font-sans-clean text-3xl sm:text-5xl font-bold text-[#F0F0EB] tracking-tight">
            The Ten Disciplines.
          </h2>
          <p className="text-sm text-[#8E8E93] mt-2 max-w-lg">
            Glance through the kinetic archive. Hover over any discipline to preview its behavioral simulation.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-white/10 p-1 bg-white/[0.02]">
            <button
              onClick={() => {
                setViewMode('index');
                sounds.playClick(650);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'index' ? 'bg-[#F0F0EB] text-[#030304] font-semibold' : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <List className="size-3.5" />
              <span>Index Flow</span>
            </button>
            <button
              onClick={() => {
                setViewMode('matrix');
                sounds.playClick(650);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all ${
                viewMode === 'matrix' ? 'bg-[#F0F0EB] text-[#030304] font-semibold' : 'text-[#8E8E93] hover:text-white'
              }`}
            >
              <LayoutGrid className="size-3.5" />
              <span>Bento Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sounds.playHover();
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                active 
                  ? 'border-[#E8D5B5] bg-[#E8D5B5]/10 text-[#E8D5B5] font-semibold' 
                  : 'border-white/[0.08] text-[#8E8E93] hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* VIEW MODE 1: KINETIC EDITORIAL INDEX WITH FLOATING PORTAL */}
      {viewMode === 'index' ? (
        <div 
          onMouseEnter={() => setIsHoveringList(true)}
          onMouseLeave={() => setIsHoveringList(false)}
          className="relative divide-y divide-white/[0.08] border-y border-white/[0.08]"
        >
          {filtered.map((service) => {
            const isHovered = hoveredService.id === service.id && isHoveringList;
            const inBlueprint = blueprint.some(b => b.id === service.id);

            return (
              <div
                key={service.id}
                onMouseEnter={() => {
                  setHoveredService(service);
                  sounds.playHover();
                }}
                className={`group py-6 sm:py-8 px-2 sm:px-4 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 cursor-pointer ${
                  isHovered ? 'bg-white/[0.025] pl-6' : ''
                }`}
                onClick={() => {
                  sounds.playClick(900);
                  onSelectService(service);
                }}
              >
                {/* Left: Number & Title */}
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs text-[#6A6A74] group-hover:text-[#E8D5B5] transition-colors pt-1 sm:pt-0">
                    {service.num}
                  </span>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-sans-clean text-xl sm:text-2xl font-bold text-[#F0F0EB] group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                      <span className="hidden sm:inline font-mono text-[10px] text-[#A8A8B2] px-2 py-0.5 rounded-full border border-white/10">
                        {service.category}
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#8E8E93] mt-1 group-hover:text-[#D4D4D8] transition-colors">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* Right: Technical Specs & Quick Stack Action */}
                <div className="flex items-center justify-between w-full lg:w-auto gap-6 sm:gap-8 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.04]">
                  
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="hidden sm:inline text-[#8E8E93]">{service.deliveryTime}</span>
                    <span className="text-[#F0F0EB] font-bold text-sm">{service.basePrice}</span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        sounds.playSwitch(!inBlueprint);
                        onToggleBlueprint(service);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border flex items-center gap-1.5 ${
                        inBlueprint
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : 'border-white/10 bg-white/[0.02] text-[#8E8E93] hover:text-white hover:border-white/20'
                      }`}
                    >
                      {inBlueprint ? <Check className="size-3 text-emerald-400" /> : <Plus className="size-3" />}
                      <span>{inBlueprint ? 'Stacked' : 'Stack'}</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick(900);
                        onSelectService(service);
                      }}
                      className="size-8 rounded-full border border-white/10 flex items-center justify-center text-[#8E8E93] group-hover:text-white group-hover:border-white/30 transition-all hover:bg-white/10"
                    >
                      <ArrowUpRight className="size-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Floating Cinematic Glass Portal (follows cursor on desktop) */}
          <div
            style={{
              transform: `translate3d(${portalPos.currentX + 35}px, ${portalPos.currentY - 140}px, 0)`,
              opacity: isHoveringList ? 1 : 0,
              pointerEvents: isHoveringList ? 'auto' : 'none'
            }}
            className="hidden lg:block absolute top-0 left-0 z-30 w-80 rounded-2xl bg-[#08080A]/95 border border-white/20 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-opacity duration-300 select-none"
          >
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8E93] mb-2 pb-2 border-b border-white/[0.08]">
              <span className="flex items-center gap-1.5 text-white">
                <span className="size-1.5 rounded-full bg-[#E8D5B5] animate-ping" />
                <span>UNIT {hoveredService.num} SIMULATION</span>
              </span>
              <span className="text-[#E8D5B5]">{hoveredService.badge}</span>
            </div>

            {/* Embedded Live Simulation in Portal */}
            <div className="rounded-xl overflow-hidden mb-3">
              {renderMiniDemo(hoveredService.interactiveType)}
            </div>

            <p className="text-[11px] text-[#A8A8B2] leading-tight font-sans">
              {hoveredService.shortDesc}
            </p>

            <div className="mt-3 pt-2 border-t border-white/[0.08] flex justify-between items-center text-[10px] font-mono text-[#8E8E93]">
              <span>Click row to open blueprint</span>
              <span className="text-white">SLA: {hoveredService.deliveryTime}</span>
            </div>
          </div>

        </div>
      ) : (
        /* VIEW MODE 2: ARCHITECTURAL BENTO MATRIX (Minimalist Grid) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service) => {
            const inBlueprint = blueprint.some(b => b.id === service.id);

            return (
              <div
                key={service.id}
                onClick={() => {
                  sounds.playClick(900);
                  onSelectService(service);
                }}
                className="group relative rounded-2xl bg-[#08080A] border border-white/[0.08] hover:border-white/25 p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] mb-4">
                    <span className="font-bold text-[#E8D5B5]">{service.num}</span>
                    <span className="px-2 py-0.5 rounded-full border border-white/10 text-[10px]">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-sans-clean text-xl font-bold text-[#F0F0EB] group-hover:text-white transition-colors mb-1">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-[#8E8E93] mb-4">
                    {service.tagline}
                  </p>

                  <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                    {renderMiniDemo(service.interactiveType)}
                  </div>

                  <p className="text-xs text-[#8E8E93] leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <div className="text-[10px] font-mono text-[#6A6A74]">STARTING</div>
                    <div className="font-mono text-sm font-bold text-white">{service.basePrice}</div>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playSwitch(!inBlueprint);
                      onToggleBlueprint(service);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border flex items-center gap-1 ${
                      inBlueprint
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                        : 'border-white/10 bg-white/[0.02] text-[#8E8E93] hover:text-white'
                    }`}
                  >
                    {inBlueprint ? <Check className="size-3 text-emerald-400" /> : <Plus className="size-3" />}
                    <span>{inBlueprint ? 'Stacked' : 'Stack'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
}
