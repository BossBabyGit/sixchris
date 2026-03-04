import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let flakes = [];

    function makeFlake(randomY = false) {
      const r = (Math.random() * 3.0 + 0.6) * DPR;
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : -10 * DPR,
        r,
        vy: (Math.random() * 0.55 + 0.25) * DPR,
        vx:
          (Math.random() < 0.5 ? -1 : 1) *
          (Math.random() * 0.22 + 0.05) *
          DPR,
        phase: Math.random() * Math.PI * 2,
        a: 0.25 + Math.random() * 0.55,
      };
    }

    function spawnFlakes() {
      const count = Math.max(
        90,
        Math.min(260, Math.floor((window.innerWidth * window.innerHeight) / 14000))
      );
      flakes = Array.from({ length: count }, () => makeFlake(true));
    }

    function resize() {
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = canvas.width = Math.floor(window.innerWidth * DPR);
      H = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      spawnFlakes();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const f of flakes) {
        f.phase += 0.012;
        f.x += f.vx + Math.sin(f.phase) * (0.16 * DPR);
        f.y += f.vy;

        if (f.y > H + 20 * DPR) {
          Object.assign(f, makeFlake(false));
          f.y = -10 * DPR;
        }
        if (f.x < -20 * DPR) f.x = W + 20 * DPR;
        if (f.x > W + 20 * DPR) f.x = -20 * DPR;

        ctx.fillStyle = `rgba(255,255,255,${f.a})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas id="bg" ref={canvasRef} />;
}