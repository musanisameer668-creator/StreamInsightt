import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onUploadClick: () => void;
  onDashboardClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onUploadClick, onDashboardClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b-4 border-[#050505] shadow-[0_6px_0_#050505] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-12">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 font-extrabold text-2xl tracking-tight text-[#050505] group"
        >
          {/* Custom Vibrant Logo Box */}
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#7000FF] border-2 border-[#050505] shadow-[2px_2px_0_#050505] -rotate-6 group-hover:rotate-0 transition-transform">
            <svg
              className="w-5 h-5 text-white transform translate-x-[1px]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 5V19L19 12L8 5Z"
                fill="#FFD600"
              />
            </svg>
          </div>
          <span className="font-black text-2xl text-[#050505] tracking-tight">
            Stream<span className="text-[#FF007A]">Insight</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3 font-bold text-sm">
          <a
            href="#about"
            className="px-4 py-2 rounded-full text-[#050505] hover:bg-[#00F0FF] hover:border-2 hover:border-[#050505] transition-all"
          >
            About
          </a>
          <a
            href="#how-it-works"
            className="px-4 py-2 rounded-full text-[#050505] hover:bg-[#FFD600] hover:border-2 hover:border-[#050505] transition-all"
          >
            How it Works
          </a>
          <a
            href="#dashboard"
            onClick={onDashboardClick}
            className="px-4 py-2 rounded-full text-[#050505] hover:bg-[#FF007A] hover:text-white hover:border-2 hover:border-[#050505] transition-all"
          >
            Dashboard
          </a>
          <a
            href="#ai-insights"
            className="px-4 py-2 rounded-full text-[#050505] hover:bg-[#7000FF] hover:text-white hover:border-2 hover:border-[#050505] transition-all"
          >
            AI Strategy
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onUploadClick}
            className="bg-[#050505] text-white font-black text-xs uppercase tracking-wider px-6 py-2.5 rounded-full border-2 border-[#050505] hover:bg-[#FF007A] transition-all shadow-[3px_3px_0_#050505] hover:shadow-[5px_5px_0_#050505] flex items-center gap-2 cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-[#FFD600]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload Dataset
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#050505] p-2 font-bold"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-4 border-[#050505] px-4 py-6 space-y-4 shadow-[0_8px_0_#050505]">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#050505] font-bold hover:text-[#FF007A] py-2"
          >
            About
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#050505] font-bold hover:text-[#7000FF] py-2"
          >
            How it Works
          </a>
          <a
            href="#dashboard"
            onClick={() => {
              onDashboardClick();
              setMobileMenuOpen(false);
            }}
            className="block text-[#050505] font-bold hover:text-[#00F0FF] py-2"
          >
            Dashboard
          </a>
          <a
            href="#ai-insights"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#050505] font-bold hover:text-[#FFD600] py-2"
          >
            AI Strategy
          </a>
          <button
            onClick={() => {
              onUploadClick();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-[#FF007A] text-white font-black text-sm py-3 rounded-full border-2 border-[#050505] shadow-[4px_4px_0_#050505] flex items-center justify-center gap-2"
          >
            Upload Dataset
          </button>
        </div>
      )}
    </nav>
  );
};
