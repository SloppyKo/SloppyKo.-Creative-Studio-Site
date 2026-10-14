"use client";

import { useEffect, useRef } from "react";

const PATTERN = "url('/images/boy-pattern.png')";
const TILE = "200px"; // Boy Seismic line-art tile, two tilted boys per tile
const RADIUS = 240; // spotlight size in px

// Hero background: a barely-there pattern of Boy Seismic outlines. A warm gold spotlight
// follows the mouse and lights up the boys underneath; with no mouse it wanders on its own.
// Place inside a `relative overflow-hidden` section; it listens for the pointer on that section.
export default function HeroSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const section = el.parentElement!;
    const set = (x: number, y: number) => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    const center = () => set(el.clientWidth / 2, el.clientHeight * 0.4);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      center();
      return;
    }

    let pointer: { x: number; y: number } | null = null;
    let cur = { x: el.clientWidth / 2, y: el.clientHeight * 0.4 };
    let visible = true;
    let frame = 0;

    const tick = (now: number) => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Wander in a slow figure-eight when there's no mouse to follow
      const target = pointer ?? {
        x: w * (0.5 + 0.3 * Math.sin(now / 4200)),
        y: h * (0.42 + 0.18 * Math.sin(now / 3100)),
      };
      cur = { x: cur.x + (target.x - cur.x) * 0.08, y: cur.y + (target.y - cur.y) * 0.08 };
      set(cur.x, cur.y);
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => (pointer = null);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const spot = `radial-gradient(circle ${RADIUS}px at var(--x, 50%) var(--y, 40%), #000 0%, transparent 100%)`;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      // Fade out at the bottom so the hero blends into the next section
      style={{ maskImage: "linear-gradient(to bottom, #000 75%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, #000 75%, transparent)" }}
    >
      {/* Faint pattern everywhere */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: PATTERN, backgroundSize: TILE }} />
      {/* Brighter pattern, only inside the spotlight */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: PATTERN, backgroundSize: TILE, maskImage: spot, WebkitMaskImage: spot }}
      />
      {/* Warm SloppyKo-yellow glow at the spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle ${RADIUS * 1.8}px at var(--x, 50%) var(--y, 40%), rgba(234, 206, 118, 0.09), transparent 70%)`,
        }}
      />
    </div>
  );
}
