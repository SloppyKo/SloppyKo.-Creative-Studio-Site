export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#11131a] text-[#f4f1ea]/60 py-12 px-4 md:px-8 border-t border-white/10">
      {/* Fainter echo of the hero aurora */}
      <div aria-hidden="true" className="aurora aurora-faint">
        <span className="aurora-glow aurora-1" />
        <span className="aurora-glow aurora-3" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex gap-6 md:gap-8 text-sm">
          <a href="https://www.instagram.com/sloppykocreativestudio/" target="_blank" rel="noopener noreferrer" className="hover:text-[#f4f1ea] transition-colors duration-200">Instagram</a>
          <a href="https://www.linkedin.com/in/kieran-apgar-518b59196/" target="_blank" rel="noopener noreferrer" className="hover:text-[#f4f1ea] transition-colors duration-200">LinkedIn</a>
          <a href="/portfolio" className="hover:text-[#f4f1ea] transition-colors duration-200">Portfolio</a>
        </div>

        <div className="mt-20 md:mt-24 flex flex-col items-center gap-3 text-[10px] text-[#f4f1ea]/40">
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
