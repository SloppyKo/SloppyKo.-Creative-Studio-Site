"use client";

import { useState, useEffect, useRef } from "react";

// Small "i" button that reveals a note on hover (desktop) or tap (touch).
export default function InfoTip({
  label,
  tone = "dark",
  children,
}: {
  label: string;
  tone?: "dark" | "light"; // "light" = sits on a cream background
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={`flex items-center justify-center w-6 h-6 rounded-full border transition-colors duration-200 ${
          tone === "light"
            ? "border-black/15 text-black/40 hover:text-black/80 hover:border-black/30"
            : "border-white/15 text-white/40 hover:text-white/80 hover:border-white/30"
        }`}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v5M12 8h.01" />
        </svg>
      </button>

      <div
        role="tooltip"
        className={`absolute bottom-full right-0 mb-3 w-64 max-w-[calc(100vw-2rem)] rounded-md border border-white/[0.06] bg-[#1a1d26] p-3.5 text-left text-[0.8125rem] leading-relaxed text-gray-300 shadow-2xl transition-all duration-200 z-20 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
