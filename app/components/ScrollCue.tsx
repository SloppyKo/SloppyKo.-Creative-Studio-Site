"use client";

const DURATION_MS = 2600; // long enough for the logo spin and iris to play out

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Hero arrow: glides down to the target at a steady pace instead of jumping,
// so the scroll transition in between plays out. Any wheel, touch, or key input cancels it.
export default function ScrollCue({ target }: { target: string }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(target);
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();

    const from = window.scrollY;
    const to = el.getBoundingClientRect().top + from;
    const start = performance.now();
    let frame = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      // "instant" so the page's smooth-scroll setting doesn't fight each frame
      window.scrollTo({ top: from + (to - from) * easeInOut(t), behavior: "instant" });
      if (t < 1) frame = requestAnimationFrame(step);
      else stop();
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    frame = requestAnimationFrame(step);
  };

  return (
    <a
      href={`#${target}`}
      onClick={onClick}
      className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
      aria-label="Scroll to our work"
    >
      <svg
        className="arrow-throb w-4 h-4 text-white/50 group-hover:text-white/80 group-hover:translate-y-0.5 group-hover:[animation-play-state:paused] transition-all duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </a>
  );
}
