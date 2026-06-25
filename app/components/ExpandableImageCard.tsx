"use client";

import { useState } from "react";

const variants = {
  yellow: {
    gradient: "linear-gradient(135deg, #EACE76 0%, #f5d78e 100%)",
    shadow: "0 0 32px rgba(234,206,118,0.22), 0 0 64px rgba(234,206,118,0.1), 0 20px 48px rgba(0,0,0,0.5)",
  },
  red: {
    gradient: "linear-gradient(135deg, #ff5c6c 0%, #ff8a94 100%)",
    shadow: "0 0 32px rgba(255,92,108,0.22), 0 0 64px rgba(255,92,108,0.1), 0 20px 48px rgba(0,0,0,0.5)",
  },
  silver: {
    gradient: "linear-gradient(135deg, rgba(234,206,118,0.35) 0%, rgba(234,206,118,0.15) 50%, rgba(234,206,118,0.28) 100%)",
    shadow: "0 0 32px rgba(234,206,118,0.06), 0 20px 48px rgba(0,0,0,0.5)",
  },
  blue: {
    gradient: "linear-gradient(135deg, #4f8cff 0%, #7ab3ff 100%)",
    shadow: "0 0 32px rgba(79,140,255,0.22), 0 0 64px rgba(79,140,255,0.1), 0 20px 48px rgba(0,0,0,0.5)",
  },
};

export default function ExpandableImageCard({
  label,
  image,
  variant = "red",
  aspectRatio = "4/3",
  href,
  stretch = false,
  videoSrc,
  objectFit = "cover",
  containPadding = "p-14",
  tags,
}: {
  label: string;
  image: string;
  variant?: keyof typeof variants;
  aspectRatio?: string;
  href?: string;
  stretch?: boolean;
  videoSrc?: string;
  objectFit?: "cover" | "contain";
  containPadding?: string;
  tags?: string[];
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (href) {
      window.location.href = href;
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <div
        className={stretch ? "flex-1 min-h-0" : undefined}
        style={{
          padding: "1.8px",
          borderRadius: "18px",
          background: variants[variant].gradient,
          boxShadow: variants[variant].shadow,
        }}
      >
        <div
          className={`group relative overflow-hidden bg-[#11131a] ${href ? "cursor-pointer" : "cursor-zoom-in"} ${stretch ? "h-full min-h-0" : ""}`}
          style={{ borderRadius: "16px" }}
          onClick={handleClick}
        >
          {aspectRatio === "auto" ? (
            <img
              src={image}
              alt={label}
              className={`w-full block transition duration-500 group-hover:scale-105 ${stretch ? "h-full object-cover" : "h-auto"}`}
            />
          ) : (
            <div style={{ aspectRatio }}>
              <img
                src={image}
                alt={label}
                className={`h-full w-full transition duration-500 group-hover:scale-105 ${objectFit === "contain" ? `object-contain ${containPadding}` : "object-cover"}`}
              />
            </div>
          )}
          <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-sm px-4 py-2 text-xs font-black text-white border border-white/15">
            {label}
          </div>
          {tags && tags.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white/75 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            {videoSrc ? (
              <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-sm p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className={`relative w-full ${videoSrc ? "max-w-4xl rounded-2xl overflow-hidden bg-[#0d0f14]" : "max-w-4xl"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white text-lg"
            >
              ×
            </button>
            {videoSrc ? (
              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full"
              />
            ) : (
              <img
                src={image}
                alt={label}
                className="w-full rounded-xl"
                style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.9)" }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
