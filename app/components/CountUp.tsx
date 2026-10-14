"use client";

import { useEffect, useRef } from "react";

const COUNT_ABOVE = 20; // smaller numbers (like "6") stay as-is; counting up to them looks fussy
const DURATION_MS = 1400;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Stat value like "50+" or "+27%" that counts up from 0 the first time it's actually seen.
// Inside a LogoIris, it also waits for the iris to open (data-revealed on [data-iris]).
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!m || Number(m[2]) <= COUNT_ABOVE) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const [, prefix, digits, suffix] = m;
    const target = Number(digits);
    const iris = el.closest<HTMLElement>("[data-iris]");
    el.textContent = `${prefix}0${suffix}`;

    let inView = false;
    let raf = 0;
    let started = false;
    const tryStart = () => {
      if (started || !inView || (iris && iris.dataset.revealed !== "yes")) return;
      started = true;
      const begin = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / DURATION_MS);
        el.textContent = `${prefix}${Math.round(target * easeOut(t))}${suffix}`;
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      tryStart();
    }, { threshold: 0.6 });
    io.observe(el);
    const mo = new MutationObserver(tryStart);
    if (iris) mo.observe(iris, { attributes: true, attributeFilter: ["data-revealed"] });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value]);

  return <span ref={ref}>{value}</span>;
}
