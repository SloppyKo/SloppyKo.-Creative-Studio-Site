"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    title: "Client Management",
    blurb:
      "Centralize data by client: active projects, contacts, and financial history.",
    color: "#EACE76",
    images: ["/images/featured/clientdb_new.png"],
  },
  {
    title: "Project Operations",
    blurb:
      "Manage projects from one screen with visibility into project details, actions, agreement data, and invoices.",
    color: "#4f8cff",
    images: ["/images/featured/action_new.png"],
  },
  {
    title: "Agreement & Invoice Management",
    blurb:
      "Streamline agreement and invoice generation, client signatures, and record retention with just a few clicks.",
    color: "#ff5c6c",
    images: ["/images/featured/contract_new.png"],
  },
  {
    title: "KPI Dashboard",
    blurb:
      "See revenue, due date slips, and client trends in one clear operational dashboard.",
    color: "#9ca3af",
    images: ["/images/featured/dashboard_new.png"],
  },
];

export default function PortalShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [carouselIndices, setCarouselIndices] = useState<Record<number, number>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollAreaRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top + window.innerHeight * 0.5;
      const stride = window.innerHeight * 0.6;
      const idx = Math.min(slides.length - 1, Math.max(0, Math.floor(scrolled / stride)));
      setActiveIndex(idx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function getCarouselIndex(slideIdx: number) {
    return carouselIndices[slideIdx] ?? 0;
  }

  function setCarouselIndex(slideIdx: number, imgIdx: number) {
    setCarouselIndices((prev) => ({ ...prev, [slideIdx]: imgIdx }));
  }

  return (
    <>
      <section id="portal-details" className="py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-20 items-start">

            {/* Sticky screenshot panel */}
            <div className="sticky top-24 w-[50%] hidden md:block">
              <div className="relative">
                {slides.map((slide, i) => {
                  const imgIndex = getCarouselIndex(i);
                  const currentSrc = slide.images[imgIndex];
                  const hasCarousel = slide.images.length > 1;

                  return (
                    <div
                      key={i}
                      className={`transition-opacity duration-500 ${
                        activeIndex === i ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
                      }`}
                    >
                      {currentSrc ? (
                        <div className="relative">
                          <img
                            src={currentSrc}
                            alt={slide.title}
                            onMouseEnter={() => setHoveredSlide(i)}
                            onMouseLeave={() => setHoveredSlide(null)}
                            onClick={() => setLightboxSrc(currentSrc)}
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                              cursor: "zoom-in",
                              transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                              transform: hoveredSlide === i ? "scale(1.05)" : "scale(1)",
                            }}
                          />

                          {/* Arrows */}
                          {hasCarousel && (
                            <>
                              <button
                                onClick={() => setCarouselIndex(i, imgIndex - 1)}
                                disabled={imgIndex === 0}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white flex items-center justify-center text-xl hover:bg-black/80 transition disabled:opacity-20 disabled:cursor-not-allowed"
                                style={{ zIndex: 10 }}
                              >
                                ‹
                              </button>
                              <button
                                onClick={() => setCarouselIndex(i, imgIndex + 1)}
                                disabled={imgIndex === slide.images.length - 1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white flex items-center justify-center text-xl hover:bg-black/80 transition disabled:opacity-20 disabled:cursor-not-allowed"
                                style={{ zIndex: 10 }}
                              >
                                ›
                              </button>

                              {/* Dots */}
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-2.5 py-1.5 rounded-full" style={{ zIndex: 10 }}>
                                {slide.images.map((_, j) => (
                                  <button
                                    key={j}
                                    onClick={() => setCarouselIndex(i, j)}
                                    className="w-2 h-2 rounded-full transition-all duration-300"
                                    style={{ backgroundColor: j === imgIndex ? slide.color : "rgba(255,255,255,0.3)" }}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64">
                          <span className="text-white/20 text-sm uppercase tracking-widest">
                            {slide.title}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scrollable blurbs */}
            <div ref={scrollAreaRef} className="flex-1 flex flex-col md:pb-[40vh]">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`md:min-h-[60vh] flex flex-col justify-center py-8 md:py-16 transition-all duration-500 ${
                    activeIndex === i ? "opacity-100" : "md:opacity-30"
                  }`}
                >
                  {/* Mobile-only image shown inline above blurb */}
                  {slide.images[0] && (
                    <div className="md:hidden mb-6">
                      <img
                        src={slide.images[0]}
                        alt={slide.title}
                        className="w-full rounded-xl"
                      />
                    </div>
                  )}
                  <div
                    className="w-1 h-10 mb-8 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        activeIndex === i ? slide.color : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <h3 className="text-xl font-bold text-[#f4f1ea] mb-3">
                    {slide.title}
                  </h3>
                  <p className="text-base text-[#f4f1ea]/60 leading-relaxed">
                    {slide.blurb}
                  </p>
                </div>
              ))}

              <div className="md:min-h-[60vh] flex flex-col items-center justify-center py-12 md:py-16">
                <p className="text-lg text-[#f4f1ea]/60 max-w-xl mb-8 text-center">
                  Need a custom solution for your business?
                </p>
                <a
                  href="/#contact"
                  className="inline-block rounded-full bg-[#4f8cff] px-6 py-3 text-sm font-black text-white transition hover:opacity-90 hover:scale-[1.04] active:scale-[0.97]"
                >
                  Contact
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-sm p-8"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white text-lg"
            >
              ×
            </button>
            <img
              src={lightboxSrc}
              alt="Enlarged view"
              className="w-full rounded-xl"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.9)" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
