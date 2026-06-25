"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PortalShowcase from "./components/PortalShowcase";
import CopyEmailButton from "./components/CopyEmailButton";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

const heroSlides: { label: string; image: string; rawImage?: boolean; phoneMockup?: boolean; liveUrl?: string; clickVideo?: boolean }[] = [
  {
    label: "Website Creation",
    image: "/images/radiantlybare_iphone.webp",
    phoneMockup: true,
    liveUrl: "https://www.radiantlybare.com",
  },
  {
    label: "Application Development",
    image: "/images/page hero/khalo hero.png",
    rawImage: true,
    clickVideo: true,
  },
  {
    label: "Brand Design",
    image: "/images/hoodie_screenshot.webp",
    rawImage: true,
  },
];

export default function Home() {
  const [servicesRef, servicesVisible] = useScrollReveal(0.1);
  const [missionRef, missionVisible] = useScrollReveal(0.2);

  return (
    <main>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-24 md:pb-56 grid md:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
        <div>
          <h1
            className="fade-in-up text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] mb-10 max-w-4xl"
            style={{ animationDelay: "0ms" }}
          >
            Keep Creativity
            <br />
            <span className="text-[#EACE76]">Human</span>
          </h1>

          <p
            className="fade-in-up text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
            style={{ animationDelay: "150ms" }}
          >
            Branding, websites, and application development powered by human creativity.
          </p>

          <div
            className="fade-in-up flex flex-col sm:flex-row gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#contact"
              className="inline-flex h-10 w-36 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
            >
              Contact
            </a>

            <a
              href="#services"
              className="inline-flex h-10 w-36 items-center justify-center border border-white/20 rounded-full hover:bg-white/5 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
            >
              Services
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[#4f8cff]/20 blur-3xl rounded-full pointer-events-none"></div>
          <HeroCarousel />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="services" className="bg-[#f4f1ea] text-[#11131a] py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What We Do
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-black/60 max-w-2xl mb-16">
            We build creative and technical solutions around the way your business already operates.
          </p>

          <div ref={servicesRef} className="space-y-8">
            {[
              {
                title: "Websites",
                text: "Custom-built websites",
              },
              {
                title: "Applications",
                text: "Custom-built operational tools and data pipelines",
              },
              {
                title: "Branding",
                text: "Graphic design, animation, and marketing",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`group border-b border-black/20 py-8 transition-all duration-300 reveal${servicesVisible ? " visible" : ""}`}
                style={{ transitionDelay: servicesVisible ? `${i * 80}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                    {item.title}
                  </h3>

                  <span className="text-3xl transition-transform duration-300 group-hover:rotate-45">
                    +
                  </span>
                </div>

                <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500">
                  <p className="pt-6 max-w-2xl text-lg leading-relaxed text-black/70">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL HERO */}
      <section id="featured-application" className="relative bg-[#11131a] pt-24 md:pt-64 pb-24 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-start md:gap-16 px-4 md:pl-16 md:pr-0 gap-10">
          <div className="shrink-0 md:max-w-sm flex flex-col pt-2 relative z-10">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-[#f4f1ea] mb-8">
              Featured Project
            </h2>
            <p className="text-2xl font-semibold text-[#ff5c6c] mb-6">
              OPERATIONS PORTAL
            </p>
            <p className="text-base text-[#f4f1ea]/60 leading-relaxed mb-6">
              SaaS solutions weren't cutting it, so we built a custom web application to manage our projects, clients, and finances in one place.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "PostgreSQL", "Clerk"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#f4f1ea]/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 w-full md:w-[78vw] md:max-w-[900px] relative md:-ml-36 md:-mt-16">
            <Image
              src="/images/hero/laptopfinal1.png"
              alt="Operations Portal Dashboard"
              width={2821}
              height={1853}
              sizes="78vw"
              quality={100}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>

        {/* Scroll arrow */}
        <div className="flex justify-center mt-10 relative z-10">
          <a
            href="#portal-details"
            className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            aria-label="Explore portal features"
          >
            <svg
              className="w-4 h-4 text-white/50 group-hover:text-white/80 group-hover:translate-y-0.5 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Right-edge fade */}
        <div className="absolute inset-y-0 right-0 w-40 pointer-events-none bg-gradient-to-l from-[#11131a] to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-[#11131a] to-transparent" />
      </section>

      <PortalShowcase />

      {/* MISSION SECTION */}
      <section id="mission" className="bg-[#11131a] text-[#f4f1ea] py-16 md:py-32 px-4 md:px-8">
        <div
          ref={missionRef}
          className={`max-w-4xl mx-auto text-center reveal${missionVisible ? " visible" : ""}`}
        >
          <p className="uppercase tracking-[0.3em] text-base md:text-lg text-[#EACE76] mb-8">
            Our Mission
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mb-10">
            Keep Creativity Human
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70 max-w-2xl mx-auto">
            Technology should enhance human ideas, not replace them.
          </p>

          <div className="h-8" />

          <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70 max-w-3xl mx-auto mb-6">
            SloppyKo. exists to help small businesses embrace modern technology while creating meaningful opportunities for the next generation of creatives.
          </p>

          <div
            id="contact"
            className="mt-16 flex flex-col items-center justify-center text-center"
          >
            <p className="text-lg text-[#f4f1ea]/70 mb-5">
              We would love to hear from you.
            </p>

            <CopyEmailButton />
          </div>
        </div>
      </section>

    </main>
  );
}

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [hoodieOpen, setHoodieOpen] = useState(false);

  const nextSlide = () => setActiveIndex((c) => (c + 1) % heroSlides.length);
  const prevSlide = () => setActiveIndex((c) => (c - 1 + heroSlides.length) % heroSlides.length);

  return (
    <>
      <div className="w-full max-w-[460px] mx-auto">
      <div className="relative z-10 w-full aspect-[340/420]">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isNext = index === (activeIndex + 1) % heroSlides.length;
          const isPrev = index === (activeIndex - 1 + heroSlides.length) % heroSlides.length;
          let positionClass = "translate-x-0 translate-y-10 scale-75 opacity-0 z-0 blur-sm";
          if (isActive) positionClass = "translate-x-0 translate-y-0 scale-100 opacity-100 z-30 blur-0";
          else if (isNext) positionClass = "translate-x-16 translate-y-8 scale-75 opacity-45 z-10 blur-[1px]";
          else if (isPrev) positionClass = "-translate-x-16 translate-y-8 scale-75 opacity-45 z-10 blur-[1px]";

          return (
            <div
              key={slide.label}
              className={`absolute inset-0 transition-all duration-700 ease-out ${positionClass}`}
            >
              {slide.rawImage ? (
                <>
                  <div className="relative h-full w-full flex items-center justify-center">
                    <img
                      src={slide.image}
                      alt={slide.label}
                      className={`h-full w-full object-contain scale-[1.18] transition-transform duration-300 ${isActive ? "cursor-pointer hover:scale-[1.22]" : ""}`}
                      onClick={isActive ? () => slide.clickVideo ? setVideoOpen(true) : setHoodieOpen(true) : undefined}
                    />
                    {isActive && slide.clickVideo && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                        style={{ paddingBottom: "8%" }}
                      >
                        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="mt-2 text-[9px] uppercase tracking-widest text-white/60">Watch Demo</p>
                      </div>
                    )}
                  </div>
                  <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-white">
                    {slide.label}
                  </p>
                </>
              ) : slide.phoneMockup ? (
                <>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div
                      className="relative rounded-[36px] p-[4px] mx-auto w-[70%]"
                      style={{
                        background: "linear-gradient(160deg, #c0b8b0 0%, #787068 20%, #b2aaa2 42%, #6a6258 62%, #a8a098 80%, #c4bcb4 100%)",
                        boxShadow: "0 0 0 1px rgba(255,255,255,0.18), 0 24px 60px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.28)",
                      }}
                    >
                      <div
                        className="relative rounded-[33px] bg-black"
                        style={{ aspectRatio: "9/18", clipPath: "inset(0 round 33px)" }}
                      >
                        {slide.liveUrl ? (
                          <PhoneEmbed src={slide.liveUrl} />
                        ) : slide.image ? (
                          <img
                            src={slide.image}
                            alt={slide.label}
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        ) : null}
                        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[80px] h-[3px] rounded-full bg-white/35 z-10" />
                      </div>
                    </div>
                  </div>
                  <p className="absolute bottom-[-58px] left-0 right-0 text-center text-xs uppercase tracking-[0.22em] text-white z-40">
                    {slide.label}
                  </p>
                </>
              ) : (
                <>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#11131a]">
                      {slide.image && (
                        <img
                          src={slide.image}
                          alt={slide.label}
                          className="h-full w-full object-contain p-2"
                        />
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-white">
                    {slide.label}
                  </p>
                </>
              )}
            </div>
          );
        })}

        {/* Desktop side buttons */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-[-44px] top-1/2 z-40 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#11131a]/80 text-white backdrop-blur hover:bg-white/10 transition"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-[-44px] top-1/2 z-40 h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#11131a]/80 text-white backdrop-blur hover:bg-white/10 transition"
        >
          ›
        </button>
      </div>

      {/* Mobile bottom controls */}
      <div className="flex md:hidden justify-center gap-6 mt-6">
        <button
          onClick={prevSlide}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#11131a]/80 text-white backdrop-blur hover:bg-white/10 transition"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#11131a]/80 text-white backdrop-blur hover:bg-white/10 transition"
        >
          ›
        </button>
      </div>
      </div>

      {/* Hoodie lightbox */}
      {hoodieOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setHoodieOpen(false)}
        >
          <div
            className="relative max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHoodieOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white text-lg"
            >
              ×
            </button>
            <img
              src="/images/hoodie_screenshot.webp"
              alt="Brand Design"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Video modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-[#0d0f14]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white text-lg"
            >
              ×
            </button>
            <video
              src="/images/receipt%20tool.mp4"
              controls
              autoPlay
              className="w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}

function PhoneEmbed({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 560);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {scale !== null && (
        <iframe
          src={src}
          title="live site"
          style={{
            display: "block",
            border: "none",
            width: "560px",
            height: "1120px",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        />
      )}
    </div>
  );
}
