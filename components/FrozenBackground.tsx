"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  alpha: number;
};

export default function FrozenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Particle[] = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const makeParticle = (randomY = true): Particle => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 10,
      radius: 0.8 + Math.random() * 2.2,
      speed: 0.12 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 0.18,
      alpha: 0.18 + Math.random() * 0.42,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from(
        { length: Math.min(85, Math.max(35, Math.floor((width * height) / 22000))) },
        () => makeParticle(),
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const particle of particles) {
        if (!reduced) {
          particle.y -= particle.speed;
          particle.x += particle.drift;
        }
        if (particle.y < -10) Object.assign(particle, makeParticle(false));
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(86, 169, 218, ${particle.alpha})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="ambient-bg" aria-hidden>
      <div className="ambient-bg__wash" />
      <canvas ref={canvasRef} />
      <div className="ambient-bg__grain" />
    </div>
  );
}
