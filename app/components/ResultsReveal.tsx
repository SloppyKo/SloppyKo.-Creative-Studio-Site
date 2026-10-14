"use client";

import { useEffect, useRef } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const COUNT_ABOVE = 20; // smaller numbers (like "6") just fade in; counting up to them looks fussy

// Splits "+27%" into "+", 27, "%" so the number can count up; anything else just fades in.
function parseStat(value: React.ReactNode) {
  if (typeof value !== "string") return null;
  const m = value.match(/^(\D*)(\d+)(\D*)$/);
  return m && Number(m[2]) > COUNT_ABOVE ? { prefix: m[1], n: Number(m[2]), suffix: m[3] } : null;
}

// Text column for a pinned case study. On desktop, its section pins (see CaseStudy's `pin`)
// and scrolling slides the paragraph up while the stats arrive one by one, counting up.
// On phones, or screens too short to fit the column, there's no pin; the stats count up
// once they scroll into view.
export default function ResultsReveal({
  header,
  description,
  results,
  bodyClass,
  mutedClass,
  ruleClass,
}: {
  header: React.ReactNode;
  description: React.ReactNode;
  results: [React.ReactNode, string][];
  bodyClass: string;
  mutedClass: string;
  ruleClass: string;
}) {
  const col = useRef<HTMLDivElement>(null);
  const para = useRef<HTMLParagraphElement>(null);
  const list = useRef<HTMLDListElement>(null);
  const items = useRef<(HTMLDivElement | null)[]>([]);
  const values = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const runway = col.current!.closest<HTMLElement>("[data-pin]");
    const stats = results.map(([v]) => parseStat(v));

    // Writes one stat's state: t=0 hidden, t=1 fully in with its final number
    const setStat = (i: number, t: number) => {
      const item = items.current[i];
      if (item) {
        item.style.opacity = String(clamp(t * 2));
        item.style.transform = `translateY(${(1 - easeOut(t)) * 16}px)`;
      }
      const s = stats[i];
      const el = values.current[i];
      if (s && el) el.textContent = `${s.prefix}${Math.round(s.n * easeOut(t))}${s.suffix}`;
    };

    // Pin only when the whole column fits below the header and project tabs; otherwise
    // the runway collapses (see data-fit in CaseStudy) and the section scrolls normally
    const pinTop = runway ? parseFloat(getComputedStyle(runway.firstElementChild!).top) || 0 : 0;
    const pinned = () => {
      const fits = desktop.matches && !!runway && col.current!.offsetHeight + 48 <= window.innerHeight - pinTop;
      if (runway) runway.dataset.fit = fits ? "yes" : "no";
      return fits;
    };
    let counted = false;

    // No pin: count up once, when the stats come into view
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || pinned()) return;
      counted = true;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        results.forEach((_, i) => setStat(i, clamp((now - start - i * 150) / 900)));
        if (now - start < 900 + results.length * 150) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    // Pinned: everything follows the scroll position through the pinned stretch
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!pinned()) {
        col.current!.style.transform = "";
        para.current!.style.opacity = "";
        if (counted) results.forEach((_, i) => setStat(i, 1));
        return;
      }
      const sticky = runway!.firstElementChild as HTMLElement;
      const rect = runway!.getBoundingClientRect();
      const p = clamp((pinTop - rect.top) / (rect.height - sticky.offsetHeight));

      // Column starts centered without the stats, then rises to make room for them
      const rise = easeOut(clamp((p - 0.05) / 0.25));
      const shift = (list.current!.offsetHeight / 2) * (1 - rise);
      col.current!.style.transform = `translateY(${shift}px)`;
      para.current!.style.opacity = String(1 - 0.35 * rise);

      // Stats arrive one after another; the last one is the finale
      results.forEach((_, i) => setStat(i, clamp((p - 0.25 - i * 0.15) / 0.18)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (pinned()) update();
    else {
      results.forEach((_, i) => setStat(i, 0));
      observer.observe(list.current!);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [results]);

  return (
    <div ref={col}>
      {header}
      <p ref={para} className={`text-lg leading-relaxed ${bodyClass}`}>{description}</p>
      {/* Tighter spacing on short desktop screens so the pinned column fits more laptops */}
      <dl
        ref={list}
        className={`mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t ${ruleClass} pt-8 md:[@media(max-height:860px)]:mt-6 md:[@media(max-height:860px)]:pt-5 md:[@media(max-height:860px)]:gap-y-4`}
      >
        {results.map(([value, label], i) => (
          <div key={label} ref={(n) => { items.current[i] = n; }}>
            <dt ref={(n) => { values.current[i] = n; }} className="text-3xl font-medium mb-1">{value}</dt>
            <dd className={`text-sm ${mutedClass}`}>{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
