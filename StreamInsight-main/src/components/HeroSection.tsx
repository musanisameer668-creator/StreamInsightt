import React from 'react';

interface HeroSectionProps {
  onUploadClick: () => void;
  onDashboardClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onUploadClick,
  onDashboardClick,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Power BI Live Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFD600] border-3 border-[#050505] shadow-[4px_4px_0_#050505]">
          <span className="w-3 h-3 rounded-full bg-[#FF007A] animate-pulse" />
          <span className="text-xs font-black text-[#050505] tracking-wider uppercase">
            Power BI Integration Live
          </span>
        </div>

        {/* Main Display Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#050505] leading-none">
          Design the <br />
          <span className="text-gradient">Streaming Future</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-bold text-[#050505]/80 max-w-2xl mx-auto leading-relaxed">
          AI-powered multi-streaming analytics with Microsoft Power BI. Uncover content trends, genre insights, and platform dominance instantly.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-5 mt-2 w-full sm:w-auto">
          <button
            onClick={onUploadClick}
            className="bg-[#7000FF] text-white font-black px-8 py-4 rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0_#050505] hover:bg-[#FF007A] hover:shadow-[8px_8px_0_#050505] transition-all flex items-center justify-center gap-3 text-lg cursor-pointer transform hover:-translate-y-1"
          >
            <svg
              className="w-6 h-6 text-[#FFD600]"
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
          <button
            onClick={onDashboardClick}
            className="bg-white text-[#050505] font-black px-8 py-4 rounded-2xl border-4 border-[#050505] shadow-[6px_6px_0_#050505] hover:bg-[#00F0FF] hover:shadow-[8px_8px_0_#050505] transition-all flex items-center justify-center gap-3 text-lg cursor-pointer transform hover:-translate-y-1"
          >
            <svg
              className="w-6 h-6 text-[#7000FF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            View Demo Dashboard
          </button>
        </div>

        {/* Streaming Service Pills */}
        <div className="pt-8 flex flex-wrap justify-center items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#050505] font-black mr-2">
            Platforms Analyzed:
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#FF007A] text-white border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
            Netflix
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#00F0FF] text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
            Prime Video
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#7000FF] text-white border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
            Disney+
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#FFD600] text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
            HBO Max
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-[#1CD760] text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
            Hulu
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-white text-[#050505] border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
            Apple TV+
          </span>
        </div>
      </div>

      {/* Down Arrow */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#050505] font-black hover:text-[#FF007A] transition-colors animate-bounce"
      >
        <span className="text-[10px] font-black tracking-widest uppercase">
          Scroll to explore
        </span>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
};
