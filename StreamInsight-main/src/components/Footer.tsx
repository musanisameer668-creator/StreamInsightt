import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#050505] w-full py-12 border-t-3 border-[#050505] relative z-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 lg:px-12 max-w-7xl mx-auto gap-8 md:gap-0">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF007A] border-2 border-[#050505] shadow-[3px_3px_0_#050505] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5V19L19 12L8 5Z" />
            </svg>
          </div>
          <div>
            <div className="font-black text-xl text-[#050505]">
              Stream<span className="text-[#FF007A]">Insight</span>
            </div>
            <p className="text-xs font-bold text-[#050505]/70">
              AI Multi-Platform Streaming Analytics
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-black text-[#050505]">
          <a href="#" className="hover:text-[#FF007A] hover:underline transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#FF007A] hover:underline transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#FF007A] hover:underline transition-colors">
            Power BI API Docs
          </a>
          <a href="#" className="hover:text-[#FF007A] hover:underline transition-colors">
            Support
          </a>
        </div>

        {/* Copyright */}
        <div className="text-[#050505] font-black text-xs bg-[#FFD600] px-3 py-1.5 rounded-lg border-2 border-[#050505] shadow-[2px_2px_0_#050505]">
          © {new Date().getFullYear()} StreamInsight. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
