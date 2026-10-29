import React, { useState, useRef } from 'react';
import { ArrowUpRight, Plus, Check, Star, Sparkles } from 'lucide-react';
import { renderMiniDemo } from './ServiceMiniDemos';
import { sounds } from '../utils/audio';

export function ServiceCard({ 
  service, 
  onSelectService, 
  isInBlueprint, 
  onToggleBlueprint,
  showAnnotations
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // 3D tilt calculation
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    setTilt({
      rx: -normY * 12,
      ry: normX * 12
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px'
      }}
      className="group relative select-none"
    >
      {/* 3D Tilting Card Container */}
      <div 
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
        }}
        className="relative flex flex-col justify-between h-full rounded-2xl bg-[#0b0c12]/90 border border-white/10 hover:border-white/25 p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-colors duration-300 overflow-hidden"
      >
        {/* Dynamic Spotlight Radial Gradient (Aceternity style) */}
        <div 
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${service.accentColor}18, transparent 65%)`
          }}
        />

        {/* Ambient Top Subtle Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${service.accentColor}80, transparent)`,
            opacity: isHovered ? 1 : 0.2
          }}
        />

        <div>
          {/* Card Header: Number, Category, Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                {service.num}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                {service.category}
              </span>
            </div>
            <span 
              style={{ color: service.accentColor, borderColor: `${service.accentColor}40`, backgroundColor: `${service.accentColor}15` }}
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
            >
              {service.badge}
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-syne text-xl font-bold text-white group-hover:text-indigo-200 transition-colors mb-1">
            {service.title}
          </h3>
          <p className="text-xs font-mono text-slate-400 mb-4 line-clamp-1">
            {service.tagline}
          </p>

          {/* Interactive Live Mini-Demo Widget */}
          <div className="mb-4">
            {renderMiniDemo(service.interactiveType)}
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {service.shortDesc}
          </p>

          {/* Handwritten Annotation Note (if enabled) */}
          {showAnnotations && (
            <div className="mb-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 font-caveat text-amber-300 text-sm leading-tight flex items-start gap-1.5 animate-fadeIn">
              <span className="text-amber-400 font-sans text-xs">✦</span>
              <span>{service.humanTouchNote}</span>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1 mb-5">
            {service.techStack.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                {tech}
              </span>
            ))}
            {service.techStack.length > 3 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-500 border border-white/5">
                +{service.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Pricing & Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono text-slate-500">STARTING AT</div>
            <div className="font-syne text-base font-bold text-white">
              {service.basePrice}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Add to Blueprint Button */}
            <button
              onClick={() => {
                sounds.playSwitch(!isInBlueprint);
                onToggleBlueprint(service);
              }}
              className={`p-2 rounded-lg text-xs font-mono transition-all flex items-center justify-center border ${
                isInBlueprint
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              title={isInBlueprint ? "Remove from Blueprint" : "Add to Blueprint Stack"}
            >
              {isInBlueprint ? <Check className="size-4 text-emerald-400" /> : <Plus className="size-4" />}
            </button>

            {/* Inspect Service Deep-Dive */}
            <button
              onClick={() => {
                sounds.playClick(900);
                onSelectService(service);
              }}
              className="px-3 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-slate-200 transition-all active:scale-95 flex items-center gap-1 shadow-md"
            >
              <span>Inspect</span>
              <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
