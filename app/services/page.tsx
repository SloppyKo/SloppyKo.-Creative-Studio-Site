import type { Metadata } from "next";
import ServicesList from "../components/ServicesList";

const DESCRIPTION =
  "Custom websites, Google Business Profile management, social media marketing, and brand design for small businesses in Hanford, San Luis Obispo, and across the Central Valley and Central Coast.";

export const metadata: Metadata = {
  title: "Web Design, Google, & Branding Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    siteName: "SloppyKo",
    title: "Web Design, Google, & Branding Services | SloppyKo",
    description: DESCRIPTION,
    url: "/services",
    locale: "en_US",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design, Google, & Branding Services | SloppyKo",
    description: DESCRIPTION,
    images: [{ url: "/twitter-image.png", width: 1200, height: 630, alt: "SloppyKo Creative Studio logo" }],
  },
};

export default function ServicesPage() {
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
            SloppyKo. | Web Design &amp; Marketing Services
          </h1>

          <h2 className="mb-12 md:mb-14 text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
            Services
          </h2>

          <p className="text-lg md:text-xl leading-relaxed text-[#f4f1ea]/70 max-w-2xl">
            You run your business and we help people find it. We offer custom, affordable solutions with white glove service, so we stick around after the job is done.
          </p>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="bg-[#f4f1ea] text-[#11131a] py-16 md:py-28 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ServicesList />

          <div className="mt-16 md:mt-24 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-lg md:text-xl leading-relaxed text-black/60">
              We would love to help. Tell us about your business and we&apos;ll point you in the right direction.
            </p>
            <a
              href="#contact"
              className="shrink-0 inline-flex h-14 w-52 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
            >
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
