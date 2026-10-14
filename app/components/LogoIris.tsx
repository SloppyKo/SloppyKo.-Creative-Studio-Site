"use client";

import { useEffect, useRef } from "react";

// Ring colors, drawn as thirds in this order: SloppyKo yellow, red, then the logo blue
const RING_COLORS = ["#EACE76", "#D64545", "#5DAADD"];
const SPIN_END = 0.55; // share of the pinned scroll spent spinning; the rest opens the iris

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeIn = (t: number) => t * t * t;

// Scroll transition: Boy Seismic spins 360° while a yellow, red, and blue ring draws around him,
// then the ring fades and an iris opens to reveal the section passed as children.
export default function LogoIris({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const revealed = useRef<HTMLDivElement>(null);
  const boy = useRef<HTMLImageElement>(null);
  const arcs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrap.current!;
    const st = stage.current!;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vw = st.clientWidth;
      const vh = st.clientHeight;
      const rect = el.getBoundingClientRect();
      const enter = clamp((vh - rect.top) / vh); // 1 once the stage reaches the top
      const p = clamp(-rect.top / (rect.height - vh)); // progress through the pinned stretch

      const spin = easeInOut(clamp(p / SPIN_END));
      const opening = clamp((p - SPIN_END) / (1 - SPIN_END)); // 0→1 through the reveal
      const open = easeIn(opening);

      const r0 = Math.min(vw, vh) * 0.3;
      const far = Math.hypot(vw, vh) / 2 + 40;
      const hole = open * far;
      const fadeIn = clamp((enter - 0.4) / 0.6);

      // Boy spins, then shrinks away early in the reveal, gone before the hole grows past him
      const away = clamp(opening / 0.35);
      const b = boy.current!;
      b.style.height = `${r0 * 1.3}px`;
      b.style.opacity = String(fadeIn * (1 - away));
      b.style.transform = `translate(-50%, -50%) rotate(${spin * 360}deg) scale(${1 - 0.25 * away})`;

      // Ring draws clockwise from the top in step with the spin, then fades out within the
      // first few steps of the reveal, so the next section emerges with no border
      const c = 2 * Math.PI * r0;
      const third = c / 3;
      const ringAlpha = fadeIn * (1 - clamp(opening / 0.12));
      arcs.current.forEach((g, i) => {
        if (!g) return;
        const len = clamp(spin * 3 - i) * third; // each third draws once the one before it is done
        g.setAttribute("cx", String(vw / 2));
        g.setAttribute("cy", String(vh / 2));
        g.setAttribute("r", String(r0));
        g.setAttribute("transform", `rotate(-90 ${vw / 2} ${vh / 2})`);
        g.style.strokeDasharray = `${len} ${c}`;
        g.style.strokeDashoffset = String(-i * third);
        g.style.opacity = len > 0 ? String(ringAlpha) : "0";
      });

      // Cut a growing circle out of the dark cover to show the next section
      const mask = hole > 0 ? `radial-gradient(circle at 50% 50%, transparent ${hole}px, #000 ${hole + 1}px)` : "none";
      const cv = cover.current!;
      cv.style.maskImage = mask;
      cv.style.setProperty("-webkit-mask-image", mask);
      st.style.visibility = p >= 1 ? "hidden" : "visible";
      // Tells effects inside the next section (e.g. CountUp) when it's actually uncovered
      revealed.current!.dataset.revealed = open > 0.45 ? "yes" : "no";
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      {/* Scroll runway; the stage stays pinned while it scrolls past. Skipped for reduced motion. */}
      {/* Never takes clicks or hovers: it overlaps the top of the next section once the iris is open */}
      <div ref={wrap} aria-hidden="true" className="pointer-events-none relative z-10 h-[220svh] motion-reduce:hidden">
        <div ref={stage} className="sticky top-0 h-svh overflow-hidden">
          {/* Only the dark cover gets cut open; the boy and ring sit above it, uncut */}
          <div ref={cover} className="absolute inset-0 bg-[#11131a]" />
          <svg className="absolute inset-0 w-full h-full" fill="none">
            {RING_COLORS.map((color, i) => (
              <circle key={color} ref={(n) => { arcs.current[i] = n; }} stroke={color} strokeWidth={3} />
            ))}
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={boy}
            src="/images/Boy Seismic_White Outline.png"
            alt=""
            draggable={false}
            className="absolute left-1/2 top-1/2 w-auto max-w-none opacity-0"
          />
        </div>
      </div>

      {/* Next section slides up under the pinned stage so the iris opens onto it */}
      <div ref={revealed} data-iris className="relative motion-safe:-mt-[100svh]">{children}</div>
    </>
  );
}
