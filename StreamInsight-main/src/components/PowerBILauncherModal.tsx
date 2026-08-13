import React, { useEffect, useState } from 'react';

export type DetectedPlatform = 'netflix' | 'prime' | 'hotstar';

interface PowerBILauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: DetectedPlatform | null;
  fileName: string;
}

// Real Power BI share link (opens the live interactive report in a new tab)
export const POWER_BI_SHARE_LINK =
  'https://app.powerbi.com/links/kk6IokLV4O?ctid=2145b90d-af2a-43cb-b93b-fa836c9b4b84&pbi_source=linkShare&bookmarkGuid=103b8408-0116-4a5a-bd97-b18196ad8de2';

// QR code image lives in /public, referenced from the site root
const QR_CODE_SRC = '/powerbi-qr-code.jpg';

const PLATFORM_CONFIG: Record<
  DetectedPlatform,
  {
    label: string;
    accent: string;
    accentSoft: string;
    glow: string;
    gradient: string;
    badgeText: string;
    emoji: string;
  }
> = {
  netflix: {
    label: 'Netflix Dataset Detected',
    accent: '#E50914',
    accentSoft: 'rgba(229,9,20,0.15)',
    glow: 'shadow-[0_0_60px_rgba(229,9,20,0.35)]',
    gradient: 'from-[#E50914] to-[#ff4d4d]',
    badgeText: 'Netflix',
    emoji: '🎬',
  },
  prime: {
    label: 'Amazon Prime Video Dataset Detected',
    accent: '#00A8E1',
    accentSoft: 'rgba(0,168,225,0.15)',
    glow: 'shadow-[0_0_60px_rgba(0,168,225,0.35)]',
    gradient: 'from-[#00A8E1] to-[#0057ff]',
    badgeText: 'Prime Video',
    emoji: '📦',
  },
  hotstar: {
    label: 'Disney Hotstar Dataset Detected',
    accent: '#0EDCF2',
    accentSoft: 'rgba(14,220,242,0.15)',
    glow: 'shadow-[0_0_60px_rgba(14,220,242,0.35)]',
    gradient: 'from-[#0EDCF2] to-[#1CD760]',
    badgeText: 'Disney Hotstar',
    emoji: '⭐',
  },
};

export const PowerBILauncherModal: React.FC<PowerBILauncherModalProps> = ({
  isOpen,
  onClose,
  platform,
  fileName,
}) => {
  const [copied, setCopied] = useState(false);

  // ESC key closes the modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Reset "copied" state whenever the modal is (re)opened
  useEffect(() => {
    if (isOpen) setCopied(false);
  }, [isOpen]);

  if (!isOpen || !platform) return null;

  const config = PLATFORM_CONFIG[platform];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(POWER_BI_SHARE_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl ${config.glow} transition-all duration-300`}
      >
        {/* Ambient gradient glow backdrop */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[80%] h-48 rounded-full blur-3xl opacity-40"
          style={{ background: config.accent }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-all duration-200 hover:scale-110 cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-[1] p-6 sm:p-10 space-y-7">
          {/* Status Badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Power BI Workspace Connected
            </span>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <div
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border border-white/10"
              style={{ background: config.accentSoft }}
            >
              {config.emoji}
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
            >
              ✨ {config.label}
            </h2>
            <p className="text-xs text-gray-500 font-mono truncate">{fileName}</p>
            <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Your dataset has been successfully mapped to the StreamInsight OTT Analytics Workspace.
            </p>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] w-fit">
              <img
                src={QR_CODE_SRC}
                alt="Scan to open Power BI dashboard"
                className="w-36 h-36 sm:w-44 sm:h-44 object-contain mx-auto"
              />
            </div>
            <p className="text-[11px] text-gray-500 tracking-wide uppercase">Scan to open on mobile</p>
          </div>

          {/* Power BI Link Section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Power BI Report Link</p>
            <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-xl px-4 py-3 font-mono text-xs sm:text-sm">
              <span className="flex-1 text-emerald-400 truncate">{POWER_BI_SHARE_LINK}</span>
              <button
                onClick={handleCopy}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 text-xs font-semibold transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            {copied && (
              <p className="text-[11px] text-emerald-400 animate-fadeIn">Link copied to clipboard!</p>
            )}
          </div>

          {/* Primary Button */}
          <a
            href={POWER_BI_SHARE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r ${config.gradient} border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_45px_rgba(255,255,255,0.15)] cursor-pointer`}
          >
            <span className="text-lg">🚀</span>
            Open Interactive Power BI Dashboard
          </a>

          <p className="text-center text-[11px] text-gray-500">
            Opens in a new tab with full slicers, filters &amp; cross-platform navigation.
          </p>
        </div>
      </div>
    </div>
  );
};
