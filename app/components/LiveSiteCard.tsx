"use client";

import { useRef, useState, useEffect } from "react";

export default function LiveSiteCard({ label, url }: { label: string; url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      style={{
        padding: "1.8px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0.08) 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <div className="overflow-hidden bg-[#11131a]" style={{ borderRadius: "18px" }}>

        {/* Browser chrome */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1c1f2a] border-b border-white/[0.07]">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 bg-[#11131a] rounded-full px-4 py-1 text-[11px] text-white/35 font-mono truncate">
            {url.replace("https://www.", "").replace("https://", "")}
          </div>
        </div>

        {/* Live site */}
        <div ref={containerRef} className="relative overflow-hidden" style={{ aspectRatio: "2 / 1" }}>
          <div className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 backdrop-blur-sm px-4 py-2 text-xs font-black text-white border border-white/15 pointer-events-none">
            {label}
          </div>
          <iframe
            src={url}
            title={label}
            style={{
              display: "block",
              border: "none",
              width: "1440px",
              height: "730px",
              transformOrigin: "top left",
              transform: `scale(${scale})`,
            }}
          />
        </div>

      </div>
    </div>
  );
}
