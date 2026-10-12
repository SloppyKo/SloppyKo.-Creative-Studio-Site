"use client";

import { useEffect, useState } from "react";

// Wraps any content (e.g. an image) so clicking it opens a video in a full-screen player.
export default function VideoLightbox({
  video,
  label,
  buttonLabel,
  buttonClassName = "",
  children,
}: {
  video: string;
  label: string;
  buttonLabel?: string; // optional visible button under the content that also opens the video
  buttonClassName?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${label}`}
        className="group relative block w-full cursor-pointer text-left"
      >
        <span className="block transition-transform duration-500 group-hover:scale-[1.02]">{children}</span>
        {/* Play hint that appears on hover */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 text-[#11131a] shadow-lg">
            <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>

      {buttonLabel && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`mt-8 inline-flex h-11 px-6 items-center justify-center border rounded-full hover:scale-[1.04] active:scale-[0.97] transition-all duration-200 ${buttonClassName}`}
        >
          {buttonLabel}
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-4 right-5 text-white/80 hover:text-white text-3xl leading-none"
          >
            ×
          </button>
          <video
            src={video}
            autoPlay
            controls
            playsInline
            className="max-h-[85vh] max-w-full rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
