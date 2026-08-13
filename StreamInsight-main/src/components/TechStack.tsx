import React from 'react';

export const TechStack: React.FC = () => {
  return (
    <section className="py-20 border-t-3 border-[#050505] bg-[#F4F4F9] relative overflow-hidden">
      <div className="text-center mb-10">
        <span className="px-3.5 py-1.5 rounded-full bg-[#FFD600] text-[#050505] text-xs font-black uppercase tracking-[0.2em] border-2 border-[#050505] shadow-[2px_2px_0_#050505] inline-block">
          Powered By Enterprise Architecture
        </span>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-4 max-w-4xl mx-auto">
        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center gap-2.5 hover:bg-[#FFD600] transition-colors cursor-default">
          <span className="w-3 h-3 rounded-full bg-[#FFD600] border border-[#050505]" />
          <span className="text-sm font-black text-[#050505] tracking-wide">Power BI</span>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center gap-2.5 hover:bg-[#00F0FF] transition-colors cursor-default">
          <span className="w-3 h-3 rounded-full bg-[#00F0FF] border border-[#050505]" />
          <span className="text-sm font-black text-[#050505] tracking-wide">Python ETL</span>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center gap-2.5 hover:bg-[#7000FF] hover:text-white transition-colors cursor-default">
          <span className="w-3 h-3 rounded-full bg-[#7000FF] border border-[#050505]" />
          <span className="text-sm font-black text-[#050505] tracking-wide">Gemini 2.5 AI</span>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center gap-2.5 hover:bg-[#FF007A] hover:text-white transition-colors cursor-default">
          <span className="w-3 h-3 rounded-full bg-[#FF007A] border border-[#050505]" />
          <span className="text-sm font-black text-[#050505] tracking-wide">Tailwind CSS v4</span>
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl border-2 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center gap-2.5 hover:bg-[#1CD760] transition-colors cursor-default">
          <span className="w-3 h-3 rounded-full bg-[#1CD760] border border-[#050505]" />
          <span className="text-sm font-black text-[#050505] tracking-wide">React 19 & WebGL</span>
        </div>
      </div>
    </section>
  );
};
