import { Fragment } from "react";
import Link from "next/link";

const EMAIL = "kieran@sloppyko.com";
const PHONE_DISPLAY = "(559) 589-4790";
const PHONE_HREF = "tel:+15595894790";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/sloppykocreativestudio/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kieran-apgar-518b59196/" },
];

const PAGES = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  // Any #contact link opens the contact form (see ContactModal).
  { href: "/#contact", label: "Contact" },
];

const linkClass = "hover:text-[#f4f1ea] transition-colors duration-200";
// Hidden on phones, where the row wraps and a divider could dangle at a line end.
const dividerClass = "hidden sm:block h-4 w-px bg-[#f4f1ea]/20";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#11131a] text-[#f4f1ea]/60 py-12 px-4 md:px-8 border-t border-white/10">
      {/* Fainter echo of the hero aurora */}
      <div aria-hidden="true" className="aurora aurora-faint">
        <span className="aurora-glow aurora-1" />
        <span className="aurora-glow aurora-3" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        {/* Site pages */}
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {PAGES.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass}>{label}</Link>
          ))}
        </nav>

        <p className="mt-16 text-center text-sm text-[#f4f1ea]/40">
          Serving San Luis Obispo, Hanford, and the greater Central Coast and Central Valley.
        </p>

        {/* Contact and socials in one row, separated by thin dividers like an email signature */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          <a href={PHONE_HREF} className={linkClass}>{PHONE_DISPLAY}</a>
          <span aria-hidden="true" className={dividerClass} />
          <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>{EMAIL}</a>
          {SOCIALS.map(({ label, href }) => (
            <Fragment key={href}>
              <span aria-hidden="true" className={dividerClass} />
              <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{label}</a>
            </Fragment>
          ))}
        </div>

        <div className="mt-20 md:mt-24 flex flex-col items-center gap-3 text-[0.625rem] text-[#f4f1ea]/40">
          <img
            src="/images/Boy Seismic_White Outline.png"
            alt="SloppyKo mascot"
            className="h-8 w-8 object-contain opacity-50"
          />
          <p className="text-center">
            Built by SloppyKo. Creative Studio &copy; 2026 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
