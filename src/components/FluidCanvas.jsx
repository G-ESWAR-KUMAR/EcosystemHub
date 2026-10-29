import React, { useEffect, useRef } from 'react';

export function FluidCanvas() {
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

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    // Silk wave lines configuration
    const lines = [
      { speed: 0.008, amp: 70, freq: 0.002, yOffset: 0.45, color: 'rgba(232, 213, 181, 0.06)' },
      { speed: 0.012, amp: 90, freq: 0.0025, yOffset: 0.50, color: 'rgba(255, 255, 255, 0.04)' },
      { speed: 0.006, amp: 110, freq: 0.0018, yOffset: 0.55, color: 'rgba(232, 213, 181, 0.04)' },
      { speed: 0.015, amp: 60, freq: 0.003, yOffset: 0.40, color: 'rgba(255, 255, 255, 0.03)' }
    ];

    const render = () => {
      time += 1;

      // Smooth mouse inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Ambient radial flashlight glow centered around smoothed mouse
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 10,
        mouse.x, mouse.y, 480
      );
      gradient.addColorStop(0, 'rgba(232, 213, 181, 0.05)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw undulating kinetic ribbons
      lines.forEach((line) => {
        ctx.beginPath();
        const baseY = height * line.yOffset;
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= width; x += 12) {
          const mouseDist = Math.hypot(x - mouse.x, baseY - mouse.y);
          const mouseInfluence = Math.max(0, 1 - mouseDist / 380) * 45;

          const wave1 = Math.sin(x * line.freq + time * line.speed) * line.amp;
          const wave2 = Math.cos(x * line.freq * 0.6 - time * line.speed * 0.8) * (line.amp * 0.4);
          const y = baseY + wave1 + wave2 - mouseInfluence;

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
    />
  );
}
