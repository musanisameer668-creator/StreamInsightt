import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white/70 border-y-4 border-[#050505] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <span className="px-4 py-1.5 rounded-full bg-[#00F0FF] text-[#050505] text-xs font-black uppercase tracking-widest border-2 border-[#050505] shadow-[3px_3px_0_#050505] inline-block mb-3">
            Workflow Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-[#050505] mb-4">
            From Raw Data to Cinematic Insights
          </h2>
          <p className="text-[#050505]/80 text-base sm:text-xl font-bold max-w-xl mx-auto">
            Three simple steps to unlock the power of your streaming catalog data.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Bar */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#050505] transform -translate-x-1/2" />

          <div className="space-y-16">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="md:w-1/2 md:pr-16 text-left md:text-right mb-6 md:mb-0 ml-16 md:ml-0">
                <span className="text-xs font-black uppercase tracking-widest text-[#FF007A] bg-[#050505] px-2.5 py-1 rounded-md">
                  Step 01
                </span>
                <h3 className="text-3xl font-black text-[#050505] mt-2 mb-2">
                  Upload Dataset
                </h3>
                <p className="text-[#050505]/80 text-sm font-bold leading-relaxed">
                  Drop your CSV or Excel files containing streaming catalog titles directly into our secure ingestion engine, or pick from our benchmark snapshots.
                </p>
              </div>

              <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-2xl bg-[#FF007A] border-3 border-[#050505] transform -translate-x-1/2 flex items-center justify-center shadow-[4px_4px_0_#050505] z-10 text-white font-black text-sm">
                01
              </div>

              <div className="md:w-1/2 md:pl-16 ml-16 md:ml-0">
                <div className="glass-card p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505]">
                  <div className="flex items-center gap-3 text-[#050505] mb-3">
                    <div className="p-2 rounded-xl bg-[#FF007A] border-2 border-[#050505] text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="text-sm font-black">streaming_catalog_2024.csv</span>
                  </div>
                  <div className="h-3 w-full bg-[#F4F4F9] border-2 border-[#050505] rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF007A] w-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between group">
              <div className="md:w-1/2 md:pl-16 text-left mb-6 md:mb-0 ml-16 md:ml-0">
                <span className="text-xs font-black uppercase tracking-widest text-[#050505] bg-[#00F0FF] px-2.5 py-1 rounded-md border border-[#050505]">
                  Step 02
                </span>
                <h3 className="text-3xl font-black text-[#050505] mt-2 mb-2">
                  Power BI Processing
                </h3>
                <p className="text-[#050505]/80 text-sm font-bold leading-relaxed">
                  Our AI engine cleanses and structure-maps the data, linking platform genres, release cohorts, and ratings for enterprise-grade Power BI modeling.
                </p>
              </div>

              <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-2xl bg-[#00F0FF] border-3 border-[#050505] transform -translate-x-1/2 flex items-center justify-center shadow-[4px_4px_0_#050505] z-10 text-[#050505] font-black text-sm">
                02
              </div>

              <div className="md:w-1/2 md:pr-16 ml-16 md:ml-0 flex justify-end">
                <div className="glass-card p-6 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] w-full text-center">
                  <div className="inline-block animate-spin text-[#7000FF] mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <p className="text-xs font-black text-[#050505] uppercase tracking-widest">
                    Building Data Relationships...
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
              <div className="md:w-1/2 md:pr-16 text-left md:text-right mb-6 md:mb-0 ml-16 md:ml-0">
                <span className="text-xs font-black uppercase tracking-widest text-white bg-[#7000FF] px-2.5 py-1 rounded-md">
                  Step 03
                </span>
                <h3 className="text-3xl font-black text-[#050505] mt-2 mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-[#050505]/80 text-sm font-bold leading-relaxed">
                  Interact with high-impact visualizations, filter by platform or genre, and invoke Gemini AI to generate automated platform strategy reports.
                </p>
              </div>

              <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-2xl bg-[#7000FF] border-3 border-[#050505] transform -translate-x-1/2 flex items-center justify-center shadow-[4px_4px_0_#050505] z-10 text-white font-black text-sm">
                03
              </div>

              <div className="md:w-1/2 md:pl-16 ml-16 md:ml-0">
                <div className="glass-card p-4 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] grid grid-cols-2 gap-3">
                  <div className="h-12 bg-[#FFD600] rounded-xl flex items-center px-3 text-xs text-[#050505] font-black border-2 border-[#050505]">
                    Platform Share
                  </div>
                  <div className="h-12 bg-[#00F0FF] rounded-xl flex items-center px-3 text-xs text-[#050505] font-black border-2 border-[#050505]">
                    IMDb Distribution
                  </div>
                  <div className="col-span-2 h-16 bg-[#7000FF] text-white rounded-xl border-2 border-[#050505] flex items-center justify-center text-xs font-black">
                    Interactive Power BI View
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
