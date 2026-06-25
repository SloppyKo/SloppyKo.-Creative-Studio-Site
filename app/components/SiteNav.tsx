"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
] as const;

export default function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#11131a]/85 backdrop-blur-md border-b border-white/10">
      <div className="relative flex items-center justify-between px-4 md:px-8 py-4 max-w-7xl mx-auto">
        <Link href="/">
          <img
            src="/images/redesign_wordmark.svg"
            alt="SloppyKo Logo"
            className="h-10 w-auto"
          />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src="/images/Boy Seismic_White Outline.png"
            alt="Boy Seismic"
            className="h-10 w-auto opacity-90"
          />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#f4f1ea]/80">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="group relative hover:text-[#f4f1ea] transition-colors duration-200">
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#f4f1ea]/70 transition-[width] duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/#contact"
            className="inline-flex h-9 px-5 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
          >
            Contact
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 text-[#f4f1ea]"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t border-white/10 bg-[#11131a] px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-lg text-[#f4f1ea]/80 hover:text-[#f4f1ea] transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center bg-[#4f8cff] text-white rounded-full hover:opacity-90 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
