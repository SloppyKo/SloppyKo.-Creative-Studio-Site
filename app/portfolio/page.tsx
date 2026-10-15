import type { Metadata } from "next";
import Image from "next/image";
import PortfolioNav from "../components/PortfolioNav";
import Reveal from "../components/Reveal";
import ResultsReveal from "../components/ResultsReveal";
import PortalShowcase from "../components/PortalShowcase";
import VideoLightbox from "../components/VideoLightbox";

const DESCRIPTION =
  "Web design, local SEO, and branding SloppyKo has built for small businesses in Hanford, San Luis Obispo, and across the Central Valley and Central Coast.";

export const metadata: Metadata = {
  title: "Web Design, Local SEO, & Branding Portfolio | Hanford & SLO",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    siteName: "SloppyKo",
    title: "Web Design, Local SEO, & Branding Portfolio | Hanford & SLO | SloppyKo",
    description: DESCRIPTION,
    url: "/portfolio",
    locale: "en_US",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, Local SEO, & Branding Portfolio | Hanford & SLO | SloppyKo",
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
};

type Theme = "dark" | "cream" | "navy" | "red" | "rose" | "sky" | "mint";

const themes = {
  dark: { section: "bg-[#11131a] text-[#f4f1ea]", body: "text-[#f4f1ea]/70", muted: "text-gray-500", rule: "border-white/10", button: "border-white/20 hover:bg-white/5" },
  cream: { section: "bg-[#f4f1ea] text-[#11131a]", body: "text-black/60", muted: "text-black/45", rule: "border-black/10", button: "border-black/20 hover:bg-black/5" },
  // Baby blue for Country Collision, matching their mockup's background
  sky: { section: "bg-[linear-gradient(180deg,#d2e6f7_0%,#bcd8f0_100%)] text-[#11131a]", body: "text-black/70", muted: "text-black/55", rule: "border-black/15", button: "border-black/25 hover:bg-black/5" },
  // Mint for Radiantly Bare, matching their mockup's background
  mint: { section: "bg-[linear-gradient(135deg,#dcefdc_0%,#b8dfc5_100%)] text-[#11131a]", body: "text-black/70", muted: "text-black/55", rule: "border-black/15", button: "border-black/25 hover:bg-black/5" },
  // SloppyKo red; text stays near-full white so it reads well on red
  red: { section: "bg-[#D64545] text-white", body: "text-white/90", muted: "text-white/80", rule: "border-white/25", button: "border-white/40 hover:bg-white/10" },
  // Dusty rose for Kahlo, echoing the roses in their logo; dark text reads well on it
  rose: { section: "bg-[#E2B4AB] text-[#11131a]", body: "text-black/70", muted: "text-black/55", rule: "border-black/15", button: "border-black/25 hover:bg-black/5" },
  navy: { section: "bg-[#374369] text-[#f4f1ea]", body: "text-[#f4f1ea]/75", muted: "text-white/55", rule: "border-white/15", button: "border-white/30 hover:bg-white/10" },
};

// Fades a mockup's edges so its own background blends into the section's gradient
const FEATHER: React.CSSProperties = {
  maskImage:
    "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

function CaseStudy({
  id,
  theme,
  flip,
  services,
  client,
  description,
  results,
  pin,
  link,
  media,
}: {
  id: string;
  theme: Theme;
  flip?: boolean;
  services: string[];
  client: string;
  description: React.ReactNode;
  results?: [React.ReactNode, string][];
  pin?: boolean; // desktop: pin the section and reveal the results as the visitor scrolls
  link?: { label: string; href: string };
  media: React.ReactNode;
}) {
  const t = themes[theme];
  const pinned = pin && results;
  const header = (
    <>
      <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${t.muted} mb-4`}>
        {services.join("  ·  ")}
      </p>
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${pinned ? "md:whitespace-nowrap" : ""}`}>{client}</h2>
    </>
  );
  const section = (
    <section
      id={id}
      className={`${t.section} py-20 px-4 md:px-8 overflow-hidden ${
        // Pinned below the main nav + project tabs (124px), filling the rest of the screen
        pinned
          ? "md:sticky md:top-[124px] md:h-[calc(100svh-124px)] md:py-0 md:flex md:items-center md:group-data-[fit=no]:static md:group-data-[fit=no]:h-auto md:group-data-[fit=no]:py-32"
          : "md:py-32"
      }`}
    >
      {/* Pinned: the text column is exactly as wide as the one-line client name; the photo takes the rest */}
      <div
        className={`w-full max-w-6xl mx-auto grid gap-12 md:gap-16 ${
          pinned ? "md:grid-cols-[minmax(0,1fr)_min-content] md:items-center" : "md:grid-cols-[1.25fr_1fr] md:items-start"
        }`}
      >
        <Reveal from={flip ? "right" : "left"} className={`flex flex-col items-center ${flip ? "md:order-2" : ""}`}>
          {link ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit the ${client} website`}
              className="block w-full transition-transform duration-500 hover:scale-[1.02]"
            >
              {media}
            </a>
          ) : (
            <div className="w-full">{media}</div>
          )}

          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex h-11 px-6 items-center justify-center border ${t.button} rounded-full hover:scale-[1.04] active:scale-[0.97] transition-all duration-200`}
            >
              {link.label}
            </a>
          )}
        </Reveal>

        <Reveal from="up" delay={150} className={flip ? "md:order-1" : ""}>
          {pinned ? (
            <ResultsReveal
              header={header}
              description={description}
              results={results}
              bodyClass={t.body}
              mutedClass={t.muted}
              ruleClass={t.rule}
            />
          ) : (
            <>
              {header}
              <p className={`text-lg leading-relaxed ${t.body}`}>{description}</p>

              {results && (
                <dl className={`mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t ${t.rule} pt-8`}>
                  {results.map(([value, label]) => (
                    <div key={label}>
                      <dt className="text-3xl font-medium mb-1">{value}</dt>
                      <dd className={`text-sm ${t.muted}`}>{label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </>
          )}
        </Reveal>
      </div>
    </section>
  );

  // The runway gives the pinned section about one screen of scroll to play out;
  // ResultsReveal sets data-fit="no" on screens too short to pin, collapsing it
  return pinned ? (
    <div data-pin className="group md:h-[calc(200svh-124px)] md:data-[fit=no]:h-auto">{section}</div>
  ) : (
    section
  );
}

export default function PortfolioPage() {
  return (
    <main>
      {/* INTRO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24">
          <h1 className="font-[Comfortaa,sans-serif] mb-4 text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-[#EACE76]">
            SloppyKo. | Web Design, Local SEO, &amp; Branding Portfolio
          </h1>

          <h2 className="mb-12 md:mb-14 text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
            Our Favorites
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70 max-w-2xl">
            A few projects we&apos;re proud of plus an internal tool we developed for our operations.
          </p>
        </div>
      </section>

      {/* Sticky project tabs, below the intro so the H1 lines up with other pages */}
      <PortfolioNav />

      <CaseStudy
        id="country-collision"
        theme="sky"
        pin
        services={["Web Design", "Local SEO", "Branding"]}
        client="Country Collision"
        description={
          <>
            {/* TODO: confirm branding work */}
            A collision repair and custom paint shop in Hanford, California. We designed and built their website, took over their Google Business Profile, and refreshed their brand. Today, they rank <strong>#1 on Google</strong>{" "}for &ldquo;body shop hanford ca.&rdquo;
          </>
        }
        results={[
          ["6", "Phone calls that turned into real jobs"],
          ["50+", "Search terms now surface the shop"],
          ["+27%", "Profile views in first 10 weeks post re-launch"],
          [<span key="rank" className="text-[#D64545]">#1</span>, "On Google for “body shop hanford ca”"],
        ]}
        link={{ label: "Visit site ↗", href: "https://www.countrycollisionhanford.com" }}
        media={
          <Image
            src="/images/countrycollision.webp"
            alt="Country Collision website on a laptop and phone"
            width={1200}
            height={813}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="w-full h-auto md:mt-6"
            style={FEATHER}
            loading="eager" // first thing on screen below the intro
          />
        }
      />

      <CaseStudy
        id="radiantly-bare"
        theme="mint"
        flip
        services={["Web Design"]}
        client="Radiantly Bare"
        description={
          <>
            An esthetician studio in Central California that needed a static site. We designed and built a simple website for mobile and laptop devices.
          </>
        }
        link={{ label: "Visit site ↗", href: "https://radiantlybare.com" }}
        media={
          <Image
            src="/images/radiantlybare-green.webp"
            alt="Radiantly Bare esthetician website on a laptop"
            width={2265}
            height={1448}
            sizes="(min-width: 768px) 75vw, 100vw"
            className="w-full h-auto scale-[1.12] md:scale-[1.3]"
            style={FEATHER}
          />
        }
      />

      <CaseStudy
        id="kahlo"
        theme="rose"
        services={["Branding", "Web App"]}
        client="Kahlo"
        description={
          <>
            Kahlo Salsas y Mas is a premium wedding and corporate caterer with bold flavors. We hand drew a premium logo that feels festive and elegant. It&apos;s built to work on menus, packaging, and screens. Then we built them a receipt tool to log and organize expenses without an SaaS subscription.
          </>
        }
        media={
          // Clicking the laptop plays the receipt tool video full screen
          <VideoLightbox
            video="/images/portfolio/receipt-tool.mp4"
            label="Kahlo receipt tool"
            buttonLabel="View tool"
            buttonClassName={themes.rose.button}
          >
            <Image
              src="/images/portfolio/kahlo-laptop.webp"
              alt="Kahlo Salsas y Mas logo on a laptop"
              width={1248}
              height={878}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="w-full h-auto md:mt-6"
            />
          </VideoLightbox>
        }
      />

      {/* OPERATIONS PORTAL: laptop runs off the right edge of the screen */}
      <section id="operations-portal" className="relative overflow-hidden bg-[#11131a] text-[#f4f1ea] pt-20 md:pt-32 pb-8">
        {/* Left padding lines the text up with the other sections' content */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 px-4 md:pr-0 md:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
          <Reveal from="up" className="shrink-0 md:max-w-sm md:pt-8 relative z-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
              Web App  ·  Next.js  ·  PostgreSQL  ·  Clerk
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Operations Portal</h2>
            <p className="text-lg leading-relaxed text-[#f4f1ea]/70">
              SaaS solutions weren&apos;t cutting it, so we built a custom web application to manage our projects, clients, and finances in one place.
            </p>
          </Reveal>

          <Reveal from="right" delay={150} className="shrink-0 w-full md:w-[92vw] md:-ml-36 md:-mt-16">
            <Image
              src="/images/hero/laptopfinal4.webp"
              alt="Operations Portal dashboard on a laptop"
              width={2600}
              height={1829}
              sizes="(min-width: 768px) 92vw, 100vw"
              className="w-full h-auto"
            />
          </Reveal>
        </div>

        {/* Soft fade where the laptop leaves the screen */}
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-40 pointer-events-none bg-gradient-to-l from-[#11131a] to-transparent" />
      </section>

      {/* Scrolling feature walkthrough, continues the Operations Portal section */}
      <PortalShowcase />
    </main>
  );
}
