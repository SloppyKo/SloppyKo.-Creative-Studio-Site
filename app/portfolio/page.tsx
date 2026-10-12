import type { Metadata } from "next";
import Image from "next/image";
import PortfolioNav from "../components/PortfolioNav";
import Reveal from "../components/Reveal";
import PortalShowcase from "../components/PortalShowcase";
import VideoLightbox from "../components/VideoLightbox";

const DESCRIPTION =
  "Web Design, Google profile management, and branding SloppyKo has built for small businesses in Hanford, San Luis Obispo, and across the Central Valley and Central Coast.";

export const metadata: Metadata = {
  title: "Web Design & Branding Portfolio",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    siteName: "SloppyKo",
    title: "Web Design & Branding Portfolio | SloppyKo",
    description: DESCRIPTION,
    url: "/portfolio",
    locale: "en_US",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Branding Portfolio | SloppyKo",
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
};

type Theme = "dark" | "cream" | "navy" | "red" | "rose";

const themes = {
  dark: { section: "bg-[#11131a] text-[#f4f1ea]", body: "text-[#f4f1ea]/70", muted: "text-gray-500", rule: "border-white/10", button: "border-white/20 hover:bg-white/5" },
  cream: { section: "bg-[#f4f1ea] text-[#11131a]", body: "text-black/60", muted: "text-black/45", rule: "border-black/10", button: "border-black/20 hover:bg-black/5" },
  // Matches the Radiantly Bare mockup's background exactly
  // SloppyKo red; text stays near-full white so it reads well on red
  red: { section: "bg-[#D64545] text-white", body: "text-white/90", muted: "text-white/80", rule: "border-white/25", button: "border-white/40 hover:bg-white/10" },
  // Dusty rose for Kahlo, echoing the roses in their logo; dark text reads well on it
  rose: { section: "bg-[#E2B4AB] text-[#11131a]", body: "text-black/70", muted: "text-black/55", rule: "border-black/15", button: "border-black/25 hover:bg-black/5" },
  navy: { section: "bg-[#374369] text-[#f4f1ea]", body: "text-[#f4f1ea]/75", muted: "text-white/55", rule: "border-white/15", button: "border-white/30 hover:bg-white/10" },
};

function CaseStudy({
  id,
  theme,
  flip,
  services,
  client,
  description,
  results,
  link,
  media,
}: {
  id: string;
  theme: Theme;
  flip?: boolean;
  services: string[];
  client: string;
  description: React.ReactNode;
  results?: [string, string][];
  link?: { label: string; href: string };
  media: React.ReactNode;
}) {
  const t = themes[theme];
  return (
    <section id={id} className={`${t.section} py-20 md:py-32 px-4 md:px-8 overflow-hidden`}>
      <div className="max-w-6xl mx-auto grid gap-12 md:gap-16 md:grid-cols-[1.25fr_1fr] md:items-start">
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
          <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${t.muted} mb-4`}>
            {services.join("  ·  ")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{client}</h2>
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
        </Reveal>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <main>
      {/* INTRO */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="aurora">
          <span className="aurora-glow aurora-1" />
          <span className="aurora-glow aurora-2" />
          <span className="aurora-glow aurora-3" />
          <span className="aurora-glow aurora-current" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24">
          <h1 className="font-[Comfortaa,sans-serif] mb-4 text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-[#EACE76]">
            SloppyKo. | Web Design &amp; Branding Portfolio
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
        theme="dark"
        services={["Web Design", "Google Management", "Branding"]}
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
          ["#1", "On Google for “body shop hanford ca”"],
        ]}
        link={{ label: "Visit site ↗", href: "https://www.countrycollisionhanford.com" }}
        media={
          <Image
            src="/images/home_featured_cc/countrycollision_featured_new1.webp"
            alt="Country Collision website on a laptop and phone"
            width={2400}
            height={1543}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="w-full h-auto md:mt-6"
          />
        }
      />

      <CaseStudy
        id="radiantly-bare"
        theme="navy"
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
            src="/images/radiantlybare_laptop_3.webp"
            alt="Radiantly Bare esthetician website on a laptop"
            width={2400}
            height={1618}
            sizes="(min-width: 768px) 62vw, 100vw"
            className="w-full h-auto md:scale-[1.12]"
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
            Kahlo Salsas y Mas is a premium wedding and corporate caterer with bold flavors. We hand drew a premium logo that feels festive and elegant. It&apos;s built to work on menus, packaging, and screens. Then we built them a receipt tool to log and organize expenses without a SaaS solution.
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
