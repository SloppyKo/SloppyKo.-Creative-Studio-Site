export default function SiteFooter() {
  return (
    <footer className="bg-[#11131a] text-[#f4f1ea]/60 py-12 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <img
          src="/images/redesign_submark.svg"
          alt="SloppyKo"
          className="h-10 w-auto"
        />

        <div className="flex gap-4 md:gap-8 text-sm">
          <a href="https://www.instagram.com/sloppykocreativestudio/" target="_blank" rel="noopener noreferrer" className="hover:text-[#f4f1ea] transition-colors duration-200">Instagram</a>
          <a href="https://www.linkedin.com/company/sloppyko" target="_blank" rel="noopener noreferrer" className="hover:text-[#f4f1ea] transition-colors duration-200">LinkedIn</a>
          <a href="/portfolio" className="hover:text-[#f4f1ea] transition-colors duration-200">Portfolio</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-8 flex flex-col items-center gap-3 text-[10px] text-[#f4f1ea]/40">
        <img
          src="/images/Boy Seismic_White Outline.png"
          alt="SloppyKo mascot"
          className="h-8 w-8 object-contain opacity-50"
        />
        <p className="text-center">
          Built by SloppyKo. Creative Studio &copy; 2026 All rights reserved
          &nbsp;|&nbsp; 0.0.1 &nbsp;|&nbsp; June 29, 2026
        </p>
      </div>
    </footer>
  );
}
