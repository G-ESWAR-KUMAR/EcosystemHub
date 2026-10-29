import React, { useState, useRef } from 'react';
import { Play, Sparkles, Volume2, Cpu, Zap, Eye, Check, Activity, Smartphone, Monitor } from 'lucide-react';
import { sounds } from '../utils/audio';

// 01. Kinetic Motion Demo
export function KineticMotionDemo() {
  const [velocity, setVelocity] = useState(60);
  const [snapped, setSnapped] = useState(false);

  const handleTest = () => {
    sounds.playClick(600 + velocity * 4);
    setSnapped(true);
    setTimeout(() => setSnapped(false), 500);
  };

  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3.5 select-none">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
        <span>INERTIA SPRING</span>
        <span className="text-indigo-400">{velocity} px/s</span>
      </div>
      <div 
        onClick={handleTest}
        style={{
          transform: snapped ? `scale(0.96) skewX(${(velocity - 50) * 0.25}deg)` : 'scale(1)',
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        className="w-full py-2.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center gap-2 text-indigo-300 text-xs font-mono cursor-pointer hover:bg-indigo-500/25 active:scale-95 transition-all"
      >
        <Zap className="size-3.5 text-indigo-400 animate-pulse" />
        <span>Tap to test spring inertia</span>
      </div>
      <input 
        type="range" 
        min="10" 
        max="120" 
        value={velocity} 
        onChange={(e) => {
          setVelocity(Number(e.target.value));
          sounds.playHover();
        }}
        className="w-full mt-2 accent-indigo-500 h-1 bg-white/10 rounded cursor-pointer"
      />
    </div>
  );
}

// 02. WebGL Shader Demo
export function WebGLShaderDemo() {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState([]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const handleClick = (e) => {
    sounds.playClick(900);
    const id = Date.now();
    setRipples(prev => [...prev.slice(-3), { id, x: coords.x, y: coords.y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);
  };

  return (
    <div 
      onMouseMove={handleMove}
      onClick={handleClick}
      className="relative h-24 rounded-xl overflow-hidden border border-cyan-500/20 bg-slate-950 flex flex-col justify-end p-2.5 cursor-crosshair group"
      style={{
        background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(6,182,212,0.35) 0%, rgba(14,165,233,0.1) 40%, #030712 85%)`
      }}
    >
      {ripples.map(r => (
        <span 
          key={r.id}
          style={{ left: `${r.x}%`, top: `${r.y}%` }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 size-12 rounded-full border border-cyan-400/80 animate-ping"
        />
      ))}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-cyan-200">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          GLSL Wavefield
        </span>
        <span className="opacity-70">X:{Math.round(coords.x)} Y:{Math.round(coords.y)}</span>
      </div>
    </div>
  );
}

// 03. Adaptive Bento Demo
export function AdaptiveBentoDemo() {
  const [device, setDevice] = useState('desktop');

  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3 select-none">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="font-mono text-slate-400 text-[11px]">BENTO SKELETON</span>
        <div className="flex gap-1">
          {['mobile', 'desktop'].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setDevice(mode);
                sounds.playClick(750);
              }}
              className={`p-1 rounded text-xs transition-colors ${
                device === mode ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' : 'text-slate-500 hover:text-white'
              }`}
            >
              {mode === 'mobile' ? <Smartphone className="size-3" /> : <Monitor className="size-3" />}
            </button>
          ))}
        </div>
      </div>
      <div className={`grid gap-1.5 transition-all duration-300 ${device === 'mobile' ? 'grid-cols-1' : 'grid-cols-3'}`}>
        <div className="h-7 rounded-md bg-pink-500/10 border border-pink-500/20 flex items-center px-2 text-[10px] font-mono text-pink-300">
          Uptime 99.98%
        </div>
        <div className={`h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-400 ${device === 'desktop' ? 'col-span-2' : ''}`}>
          Adaptive Matrix
        </div>
      </div>
    </div>
  );
}

// 04. Tactile Micro Demo (Dynamic Island)
export function TactileMicroDemo() {
  const [modeIndex, setModeIndex] = useState(0);
  const modes = [
    { label: 'AirDrop Ready', icon: '✦', color: 'text-emerald-400' },
    { label: 'Lenis 120fps Active', icon: '⚡', color: 'text-amber-400' },
    { label: 'Direct Engineer Call', icon: '📞', color: 'text-indigo-400' }
  ];

  const handleCycle = () => {
    sounds.playClick(850 + modeIndex * 100);
    setModeIndex((modeIndex + 1) % modes.length);
  };

  const current = modes[modeIndex];

  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3 flex flex-col items-center justify-center select-none">
      <div className="text-[11px] font-mono text-slate-400 mb-2 self-start">DYNAMIC ISLAND DOCK</div>
      <div 
        onClick={handleCycle}
        className="w-full py-2 px-3 rounded-full bg-neutral-900 border border-white/20 hover:border-emerald-500/40 cursor-pointer flex items-center justify-between transition-all duration-300 active:scale-95 shadow-lg"
      >
        <span className="flex items-center gap-2 text-xs font-mono text-slate-200">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{current.label}</span>
        </span>
        <span className={`text-xs ${current.color} font-mono`}>{current.icon}</span>
      </div>
      <span className="text-[10px] text-slate-500 font-mono mt-2">Click island to morph state</span>
    </div>
  );
}

// 05. Procedural Audio Demo
export function ProceduralAudioDemo() {
  const [pitch, setPitch] = useState(800);

  const triggerSound = (type) => {
    if (type === 'click') sounds.playClick(pitch);
    if (type === 'chime') sounds.playChime();
    if (type === 'success') sounds.playSuccess();
  };

  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3 select-none">
      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-2">
        <span className="flex items-center gap-1.5">
          <Volume2 className="size-3 text-purple-400" />
          PROCEDURAL SYNTH
        </span>
        <span className="text-purple-300">{pitch} Hz</span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        <button
          onClick={() => triggerSound('click')}
          className="py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/30 text-[11px] font-mono text-purple-200 hover:bg-purple-500/25 active:scale-95 transition-all"
        >
          Snap
        </button>
        <button
          onClick={() => triggerSound('chime')}
          className="py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-[11px] font-mono text-indigo-200 hover:bg-indigo-500/25 active:scale-95 transition-all"
        >
          Chime
        </button>
        <button
          onClick={() => triggerSound('success')}
          className="py-1.5 rounded-lg bg-pink-500/15 border border-pink-500/30 text-[11px] font-mono text-pink-200 hover:bg-pink-500/25 active:scale-95 transition-all"
        >
          Harmonic
        </button>
      </div>
      <input 
        type="range" 
        min="300" 
        max="1600" 
        value={pitch} 
        onChange={(e) => {
          setPitch(Number(e.target.value));
          sounds.playClick(Number(e.target.value));
        }}
        className="w-full accent-purple-500 h-1 bg-white/10 rounded cursor-pointer"
      />
    </div>
  );
}

// 06. Design Tokens Demo
export function DesignTokensDemo() {
  const [activeTheme, setActiveTheme] = useState('indigo');
  const themes = [
    { id: 'indigo', name: 'Cyber', color: 'bg-indigo-500', glow: 'rgba(99,102,241,0.4)' },
    { id: 'emerald', name: 'Luxe', color: 'bg-emerald-500', glow: 'rgba(16,185,129,0.4)' },
    { id: 'amber', name: 'Artisan', color: 'bg-amber-500', glow: 'rgba(245,158,11,0.4)' },
    { id: 'rose', name: 'Velvet', color: 'bg-rose-500', glow: 'rgba(244,63,94,0.4)' }
  ];

  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3 select-none">
      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mb-2">
        <span>TOKEN PROPAGATOR</span>
        <span className="text-amber-400">Tailwind v4 @theme</span>
      </div>
      <div className="flex gap-2">
        {themes.map(t => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTheme(t.id);
              sounds.playClick(700);
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 border transition-all ${
              activeTheme === t.id 
                ? 'border-white/40 text-white bg-white/10 shadow-sm' 
                : 'border-white/5 text-slate-400 hover:bg-white/5'
            }`}
          >
            <span className={`size-2 rounded-full ${t.color}`} />
            <span className="text-[10px]">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// 07. Atmospheric Hero Demo
export function AtmosphericHeroDemo() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  return (
    <div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }}
      className="relative h-24 rounded-xl overflow-hidden border border-yellow-500/20 bg-neutral-950 p-3 flex flex-col justify-center cursor-crosshair select-none"
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity"
        style={{
          background: `radial-gradient(130px circle at ${pos.x}% ${pos.y}%, rgba(234,179,8,0.3) 0%, transparent 80%)`
        }}
      />
      <div className="relative z-10 text-center">
        <span className="text-xs font-syne font-bold tracking-wider text-yellow-100 uppercase">
          Flashlight Beam
        </span>
        <p className="text-[10px] font-mono text-yellow-300/80 mt-1">Hover over grid to illuminate</p>
      </div>
    </div>
  );
}

// 08. Spatial 3D Tilt Demo
export function Spatial3dDemo() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 22, ry: x * 22 });
  };

  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div 
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: '600px' }}
      className="h-24 flex items-center justify-center p-2 select-none"
    >
      <div 
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.15s ease-out',
          boxShadow: `${-tilt.ry * 0.8}px ${tilt.rx * 0.8}px 20px rgba(59,130,246,0.3)`
        }}
        className="w-full h-full rounded-xl bg-gradient-to-br from-blue-900/40 via-blue-500/10 to-indigo-950 border border-blue-400/30 flex items-center justify-between px-3 text-xs font-mono text-blue-200"
      >
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-blue-400 animate-spin" />
          <span>Holographic Gyro</span>
        </div>
        <span className="text-[10px] text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
          Tilt Me
        </span>
      </div>
    </div>
  );
}

// 09. Frame Budget Demo
export function FrameBudgetDemo() {
  const [fps, setFps] = useState(120);

  return (
    <div className="rounded-xl bg-black/60 border border-white/10 p-3 select-none">
      <div className="flex justify-between items-center text-[11px] font-mono text-teal-400 mb-1.5">
        <span className="flex items-center gap-1.5">
          <Activity className="size-3" />
          TELEMETRY MONITOR
        </span>
        <span className="text-white font-bold">{fps} FPS</span>
      </div>
      <div className="grid grid-cols-3 gap-1 text-[10px] font-mono text-center mb-1">
        <div className="bg-teal-500/10 rounded py-1 border border-teal-500/20 text-teal-300">
          CLS 0.000
        </div>
        <div className="bg-white/5 rounded py-1 border border-white/10 text-slate-300">
          FID 1.2ms
        </div>
        <div className="bg-white/5 rounded py-1 border border-white/10 text-slate-300">
          TBT 0ms
        </div>
      </div>
      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
        <div className="bg-teal-400 h-full w-[99.2%]" />
      </div>
    </div>
  );
}

// 10. Artisan Human Touch Demo
export function HumanTouchDemo() {
  const [stamped, setStamped] = useState(false);

  const handleStamp = () => {
    sounds.playSuccess();
    setStamped(true);
    setTimeout(() => setStamped(false), 2400);
  };

  return (
    <div className="rounded-xl bg-black/60 border border-amber-500/20 p-3 select-none flex flex-col justify-between">
      <div className="flex justify-between items-center text-[11px] font-mono text-amber-400 mb-1">
        <span>HANDMADE SIGNATURE</span>
        <span className="font-caveat text-amber-300 text-sm">handcrafted</span>
      </div>
      <button 
        onClick={handleStamp}
        className="w-full py-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-center justify-center gap-2 hover:bg-amber-500/25 active:scale-95 transition-all"
      >
        <span>{stamped ? '✓ Authenticity Verified' : '✦ Apply Human Craft Stamp'}</span>
      </button>
      {stamped && (
        <div className="font-caveat text-amber-300 text-center text-sm mt-1 animate-bounce">
          "Crafted with genuine intention, no synthetic shortcuts"
        </div>
      )}
    </div>
  );
}

export function renderMiniDemo(type) {
  switch (type) {
    case 'motion-velocity': return <KineticMotionDemo />;
    case 'shader-ripple': return <WebGLShaderDemo />;
    case 'bento-tabs': return <AdaptiveBentoDemo />;
    case 'dynamic-island': return <TactileMicroDemo />;
    case 'audio-synth': return <ProceduralAudioDemo />;
    case 'token-palette': return <DesignTokensDemo />;
    case 'hero-spotlight': return <AtmosphericHeroDemo />;
    case 'spatial-tilt': return <Spatial3dDemo />;
    case 'frame-bench': return <FrameBudgetDemo />;
    case 'human-stamp': return <HumanTouchDemo />;
    default: return null;
  }
}
