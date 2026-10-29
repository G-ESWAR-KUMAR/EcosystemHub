import React, { useEffect, useRef } from 'react';

export function ParticleCanvas({ intensity = 1.0, humanWarmth = 0.2 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(Math.floor((width * height) / 22000) * intensity, 65);
    const particles = [];

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.2,
        baseColor: Math.random() > 0.4 ? '99, 102, 241' : '16, 185, 129' // Indigo & Emerald
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient glow near mouse
      if (mouse.x > 0 && mouse.y > 0) {
        const rad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
        rad.addColorStop(0, `rgba(99, 102, 241, ${0.08 * intensity})`);
        rad.addColorStop(0.5, `rgba(168, 85, 247, ${0.03 * intensity})`);
        rad.addColorStop(1, 'transparent');
        ctx.fillStyle = rad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.baseColor}, ${p.alpha})`;
        ctx.fill();

        // Connect near neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 105) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - cdist / 105) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
