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

export default function Home() {
  const [servicesRef, servicesVisible] = useScrollReveal(0.1);
  const [missionRef, missionVisible] = useScrollReveal(0.2);
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  return (
    <main>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-16 md:pb-24 flex flex-col items-center text-center">
        <h1
          className="fade-in-up text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-10 w-full"
          style={{ animationDelay: "200ms" }}
        >
          Keep Creativity
          <br />
          <span className="text-[#EACE76]">Human</span>
        </h1>

        <p
          className="fade-in-up text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
          style={{ animationDelay: "350ms" }}
        >
          Branding, websites, and application development powered by human creativity.
        </p>

        <div
          className="fade-in-up flex flex-col sm:flex-row gap-4 mb-24"
          style={{ animationDelay: "500ms" }}
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

        {/* Scroll cue */}
        <a
          href="#services"
          className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          aria-label="Scroll to services"
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
      </section>

      {/* WHAT WE DO */}
      <section id="services" className="bg-[#f4f1ea] text-[#11131a] py-16 md:py-32 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What We Do
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-black/60 max-w-2xl mb-16">
            We are a San Luis Obispo based creative studio that builds creative and technical solutions around the way your small business already operates.
          </p>

          <div ref={servicesRef} className="space-y-8">
            {[
              {
                title: "Websites",
                text: "Custom-built from scratch. Designed for your customers, and optimized for desktops, tablets, and cell phones.",
              },
              {
                title: "Applications",
                text: "Custom-built operational tools and data pipelines. Tailored around your business processes.",
              },
              {
                title: "Branding",
                text: "Hand-crafted graphic design, animation, and marketing materials. Built to help your business tell the right story.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`group border-b border-black/20 py-8 transition-all duration-300 reveal cursor-pointer${servicesVisible ? " visible" : ""}`}
                style={{ transitionDelay: servicesVisible ? `${i * 80}ms` : "0ms" }}
                onClick={() => setOpenServiceIndex(openServiceIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                    {item.title}
                  </h3>

                  <span className={`text-3xl transition-transform duration-300 group-hover:rotate-45${openServiceIndex === i ? " rotate-45" : ""}`}>
                    +
                  </span>
                </div>

                <div className={`overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100${openServiceIndex === i ? " max-h-40 opacity-100" : " max-h-0 opacity-0"}`}>
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

          <div className="shrink-0 w-full md:w-[78vw] relative md:-ml-36 md:-mt-16">
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
            We build affordable, high quality brands, websites, and internal tools for small businesses, made by creatives who care about getting it right.
          </p>

          <div className="h-8" />

          <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70 max-w-3xl mx-auto mb-6">
            And we give young creatives the chance to own real projects, end-to-end.
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

