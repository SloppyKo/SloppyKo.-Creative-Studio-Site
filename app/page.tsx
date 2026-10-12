import Image from "next/image";
import BusinessJsonLd from "./components/BusinessJsonLd";
import InfoTip from "./components/InfoTip";
import PhotoStack from "./components/PhotoStack";

export default function Home() {
  return (
    <main>
      <BusinessJsonLd />

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Slow aurora glow behind the hero */}
        <div aria-hidden="true" className="aurora">
          <span className="aurora-glow aurora-1" />
          <span className="aurora-glow aurora-2" />
          <span className="aurora-glow aurora-3" />
          <span className="aurora-glow aurora-current" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-20 pb-16 md:pb-24 flex flex-col items-center text-center">
          <h1
            className="fade-in-up text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-12 md:mb-14 w-full"
            style={{ animationDelay: "200ms" }}
          >
            Your Web Design 
            <br />
            <span className="text-[#EACE76]">Partner</span>
          </h1>

          <p
            className="fade-in-up text-xl text-[#f4f1ea]/70 leading-relaxed mb-10 md:mb-12 max-w-2xl"
            style={{ animationDelay: "350ms" }}
          >
            Websites, Google/SEO management, social media, and branding for small businesses in Hanford, San Luis Obispo, and across the Central Valley and Central Coast.
          </p>

          <p
            className="fade-in-up text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-8 md:mb-10"
            style={{ animationDelay: "425ms" }}
          >
            Built by Cal Poly &amp; UCSB Alumni
          </p>

          {/* Scroll cue */}
          <a
            href="#work"
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
        </div>
      </section>

      {/* FEATURED SUCCESS STORY (right after the hero: proof first) */}
      <section id="work" className="relative bg-[#11131a] text-[#f4f1ea] py-16 md:py-32 px-4 md:px-8">
        {/* Faint divider from the hero, fading out at both ends */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-[4%] right-[4%] h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1)_18%,rgba(255,255,255,0.1)_82%,transparent)]"
        />
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-8">
            Success Story  ·  Web Design &amp; Google/Seo Management
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10">
            Country Collision
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-gray-300 max-w-2xl">
            We designed a new website for local body shop, Country Collision, and took over their Google Business Profile. Today, they rank <strong><span className="text-[#EACE76]">#1</span> on Google</strong>{" "}for &ldquo;body shop hanford ca.&rdquo;
          </p>

          <div className="relative w-full max-w-3xl mt-12 md:mt-14">
            <div className="absolute -top-8 right-0">
              {/* TODO: replace placeholder copy */}
              <InfoTip label="Where these numbers come from">
                These numbers come from Country Collision&apos;s Google Business Profile performance data. We review it regularly and adjust their profile, posts, and website based on what&apos;s working.
              </InfoTip>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {[
                ["6","Phone calls that turned into real jobs"],
                ["50+", "Search terms now surface the shop"],
                ["+27%", "Profile views in first 10 weeks post re-launch"],
              ].map(([value, label]) => (
                <div key={label} className="px-6 py-6 sm:py-2">
                  <p className="text-3xl md:text-4xl font-medium text-[#f4f1ea] mb-2">{value}</p>
                  <p className="text-sm text-gray-400 max-w-[14rem] mx-auto">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://www.countrycollisionhanford.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit the Country Collision website"
            className="block w-full mt-10 md:mt-14 transition-transform duration-500 hover:scale-[1.02]"
          >
            <Image
              src="/images/home_featured_cc/countrycollision_featured_new1.webp"
              alt="Country Collision website on a laptop and phone"
              width={2400}
              height={1543}
              sizes="(min-width: 1536px) 75vw, (min-width: 1152px) 1152px, 100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </a>

          <a
            href="https://www.countrycollisionhanford.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 md:mt-8 inline-flex h-10 w-36 items-center justify-center border border-white/20 rounded-full hover:bg-white/5 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
          >
            Visit Site ↗
          </a>

          <figure className="mt-16 md:mt-24 max-w-3xl">
            <span aria-hidden="true" className="block text-7xl leading-none text-[#EACE76] mb-2">
              &ldquo;
            </span>
            <blockquote className="text-xl md:text-2xl leading-relaxed text-[#f4f1ea]/80">
              SloppyKo is top notch and has made the whole digital marketing process stress free. Best of all, their behind-the-scenes work has shown real-life results that you can see for yourself.
            </blockquote>
            <figcaption className="mt-6 text-xs font-semibold tracking-[0.2em] uppercase text-gray-500">
              Levi, Owner of Country Collision
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="get-started" className="relative overflow-hidden bg-[#f4f1ea] text-[#11131a] py-20 md:py-32 px-4 md:px-8">
        <div className="relative max-w-6xl mx-auto">
          {/* Split header: copy on the left, Contact on the right (stacks on phones) */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                We&apos;re ready to be your{" "}
                {/* Each letter cycles through the logo colors: red, blue, yellow */}
                <span className="sr-only">creative</span>
                <span aria-hidden="true">
                  {"creative".split("").map((letter, i) => (
                    <span key={i} style={{ color: ["#D64545", "#5DAADD", "#E0A21B"][i % 3] }}>
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                partner
              </h2>

              <p className="text-lg md:text-xl leading-relaxed text-black/60">
                Tell us what&apos;s going on. We&apos;ll build something just for you.
              </p>
            </div>

            <a
              href="#contact"
              className="shrink-0 inline-flex h-14 w-52 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
            >
              Contact
            </a>
          </div>

          {/* Endless rotating stack of our work */}
          <div className="w-full mt-12 md:mt-16">
            <PhotoStack />
          </div>
        </div>
      </section>
    </main>
  );
}

