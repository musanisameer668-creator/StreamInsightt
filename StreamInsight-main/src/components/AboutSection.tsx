import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="px-4 py-1.5 rounded-full bg-[#FF007A] text-white text-xs font-black uppercase tracking-widest border-2 border-[#050505] shadow-[3px_3px_0_#050505] inline-block mb-3">
          Unified Analytics
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-[#050505] mb-4">
          Unify Your Content Data
        </h2>
        <p className="text-[#050505]/80 text-base sm:text-xl font-bold max-w-2xl mx-auto">
          Consolidate catalogs from Netflix, Prime Video, Disney+, HBO Max, and more into a single, actionable analytical dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 - Electric Purple */}
        <div className="card-vibrant-purple p-8 rounded-3xl flex flex-col justify-between gap-6 hover:translate-y-[-4px] transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-white border-3 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center justify-center text-[#7000FF]">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white mb-2">Multi-Platform Support</h3>
            <p className="text-white/90 text-sm font-semibold leading-relaxed">
              Seamlessly ingest and analyze datasets containing titles across major streaming services simultaneously with unified schema mapping.
            </p>
          </div>
          <div className="px-3 py-1 bg-[#FFD600] text-[#050505] font-black text-xs rounded-lg border-2 border-[#050505] w-fit uppercase">
            Unified Schema
          </div>
        </div>

        {/* Card 2 - Neon Cyan */}
        <div className="card-vibrant-cyan p-8 rounded-3xl flex flex-col justify-between gap-6 hover:translate-y-[-4px] transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-white border-3 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center justify-center text-[#050505]">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#050505] mb-2">Content Trends</h3>
            <p className="text-[#050505]/90 text-sm font-semibold leading-relaxed">
              Identify shifting viewer preferences and forecast the next viral hit based on historical release velocity, IMDb ratings, and stream counts.
            </p>
          </div>
          <div className="px-3 py-1 bg-[#050505] text-white font-black text-xs rounded-lg border-2 border-[#050505] w-fit uppercase">
            Real-Time Trends
          </div>
        </div>

        {/* Card 3 - Sunny Yellow */}
        <div className="card-vibrant-yellow p-8 rounded-3xl flex flex-col justify-between gap-6 hover:translate-y-[-4px] transition-all group">
          <div className="w-14 h-14 rounded-2xl bg-white border-3 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center justify-center text-[#7000FF]">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#050505] mb-2">Genre Insights</h3>
            <p className="text-[#050505]/90 text-sm font-semibold leading-relaxed">
              Deep dive into genre performance metrics to understand which categories drive subscriber retention and reduce churn across global markets.
            </p>
          </div>
          <div className="px-3 py-1 bg-[#FF007A] text-white font-black text-xs rounded-lg border-2 border-[#050505] w-fit uppercase">
            Retention ROI
          </div>
        </div>
      </div>
    </section>
  );
};
