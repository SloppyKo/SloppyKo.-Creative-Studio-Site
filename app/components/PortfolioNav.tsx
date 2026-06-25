"use client";

import { useState, useEffect } from "react";

const pods = [
  { label: "Website Creation", id: "website-creation", color: "#EACE76" },
  { label: "Application Development", id: "application-development", color: "#4f8cff" },
  { label: "Brand Design", id: "branding-design", color: "#ff5c6c" },
];

export default function PortfolioNav() {
  const [activeId, setActiveId] = useState<string>(pods[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    pods.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 72 + 52; // main nav + this sub-nav
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="sticky top-[72px] z-40 border-b border-white/10 bg-[#11131a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {pods.map(({ label, id, color }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative shrink-0 px-4 py-4 text-sm font-semibold transition-colors duration-200 ${
                  isActive ? "text-[#f4f1ea]" : "text-[#f4f1ea]/45 hover:text-[#f4f1ea]/80"
                }`}
              >
                {label}
                <span
                  className="absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300"
                  style={{ width: isActive ? "100%" : "0%", backgroundColor: color }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
