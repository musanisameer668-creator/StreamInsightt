import React, { useState } from 'react';
import { StreamingItem } from '../types';

interface PowerBIEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: StreamingItem[];
}

export const PowerBIEmbedModal: React.FC<PowerBIEmbedModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [activeTab, setActiveTab] = useState<'executive' | 'platforms' | 'ratings' | 'streamHours'>('executive');
  const [filterPlatform, setFilterPlatform] = useState<string>('All');

  if (!isOpen) return null;

  const filteredItems = filterPlatform === 'All'
    ? items
    : items.filter((i) => i.platform === filterPlatform);

  const totalTitles = filteredItems.length;
  const totalHours = filteredItems.reduce((acc, curr) => acc + curr.streamHoursMillions, 0);
  const avgRating = totalTitles
    ? (filteredItems.reduce((acc, curr) => acc + curr.imdbRating, 0) / totalTitles).toFixed(1)
    : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="glass-panel w-full max-w-6xl h-[90vh] rounded-2xl flex flex-col overflow-hidden border border-white/20 shadow-2xl">
        {/* Power BI Workspace Header Bar */}
        <div className="bg-[#111827] px-6 py-4 border-b border-white/10 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F2C811] flex items-center justify-center text-black font-extrabold text-xs shadow-md">
              PBI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-base">
                  StreamInsight Analytics Workspace
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Microsoft Power BI Embedded Report v4.2 • DirectQuery Mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Slicer Selector */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-white/10 text-xs">
              <span className="text-gray-400 font-mono">Platform Slicer:</span>
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900 text-white">All Services</option>
                <option value="Netflix" className="bg-slate-900 text-white">Netflix</option>
                <option value="Prime Video" className="bg-slate-900 text-white">Prime Video</option>
                <option value="Disney+" className="bg-slate-900 text-white">Disney+</option>
                <option value="HBO Max" className="bg-slate-900 text-white">HBO Max</option>
                <option value="Hulu" className="bg-slate-900 text-white">Hulu</option>
                <option value="Apple TV+" className="bg-slate-900 text-white">Apple TV+</option>
              </select>
            </div>

            <button
              onClick={() => alert('Exporting report snapshot to Power BI PDF...')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-gray-200 border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-red-600/80 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Close Report"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Power BI Page Tabs Bar */}
        <div className="bg-slate-900/90 px-6 py-2 border-b border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('executive')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'executive'
                ? 'bg-[#00A8E1] text-white shadow'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            📊 Executive KPI Canvas
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'platforms'
                ? 'bg-[#00A8E1] text-white shadow'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            🏢 Service Competition Matrix
          </button>
          <button
            onClick={() => setActiveTab('ratings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'ratings'
                ? 'bg-[#00A8E1] text-white shadow'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            ⭐ Audience Perception & Ratings
          </button>
          <button
            onClick={() => setActiveTab('streamHours')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'streamHours'
                ? 'bg-[#00A8E1] text-white shadow'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            🔥 Viewership & Engagement
          </button>
        </div>

        {/* Power BI Canvas Main Content Area */}
        <div className="flex-1 bg-[#0B0F19] p-6 overflow-y-auto space-y-6">
          {/* Top Power BI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-xl border-l-4 border-l-[#E50914] flex justify-between items-center">
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Filtered Titles</p>
                <h4 className="text-2xl font-extrabold text-white mt-1">{totalTitles}</h4>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#E50914]/20 flex items-center justify-center text-[#FF5252]">
                🎬
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-[#00A8E1] flex justify-between items-center">
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Stream Volume</p>
                <h4 className="text-2xl font-extrabold text-white mt-1">{totalHours.toFixed(1)}M <span className="text-xs font-normal text-gray-400">hrs</span></h4>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#00A8E1]/20 flex items-center justify-center text-[#00A8E1]">
                ⏱️
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border-l-4 border-l-[#7C3AED] flex justify-between items-center">
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Average Rating</p>
                <h4 className="text-2xl font-extrabold text-white mt-1">{avgRating} <span className="text-xs font-normal text-gray-400">/ 10</span></h4>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center text-[#d2bbff]">
                ⭐
              </div>
            </div>
          </div>

          {/* Report Tab Visualizations */}
          {activeTab === 'executive' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center justify-between">
                  <span>Platform Distribution Overview</span>
                  <span className="text-xs font-mono text-gray-400">Visual ID: PBI_DIST_01</span>
                </h4>
                <div className="space-y-4">
                  {['Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'Hulu', 'Apple TV+'].map((platform) => {
                    const count = filteredItems.filter((i) => i.platform === platform).length;
                    const pct = totalTitles ? Math.round((count / totalTitles) * 100) : 0;
                    return (
                      <div key={platform} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-gray-300">
                          <span>{platform}</span>
                          <span>{count} titles ({pct}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00A8E1] to-[#E50914] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    Executive Summary Notes
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed space-y-2">
                    Power BI DirectQuery analysis reveals strong viewer concentration in Sci-Fi and High-Concept Drama series. Platforms with balanced movie and TV show ratios retain users up to 28% longer.
                  </p>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-gray-300 space-y-2 font-mono">
                  <div className="text-[#00A8E1] font-bold">Power BI DAX Measure Formula:</div>
                  <code className="block bg-black/40 p-2 rounded text-[11px] text-emerald-400">
                    [AvgStreamHours] = DIVIDE(SUM(Catalog[StreamHours]), COUNT(Catalog[TitleID]), 0)
                  </code>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'platforms' && (
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">
                Service Catalog Breakdown
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-slate-800 text-gray-400 uppercase font-mono">
                    <tr>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Movies</th>
                      <th className="p-3">TV Shows</th>
                      <th className="p-3">Total Titles</th>
                      <th className="p-3">Avg Rating</th>
                      <th className="p-3">Stream Hours (M)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {['Netflix', 'Prime Video', 'Disney+', 'HBO Max', 'Hulu', 'Apple TV+'].map((p) => {
                      const pItems = items.filter((i) => i.platform === p);
                      const movies = pItems.filter((i) => i.type === 'Movie').length;
                      const tv = pItems.filter((i) => i.type === 'TV Show').length;
                      const hrs = pItems.reduce((acc, curr) => acc + curr.streamHoursMillions, 0);
                      const avgR = pItems.length
                        ? (pItems.reduce((acc, curr) => acc + curr.imdbRating, 0) / pItems.length).toFixed(1)
                        : 'N/A';

                      return (
                        <tr key={p} className="hover:bg-white/5 transition-colors">
                          <td className="p-3 font-bold text-white">{p}</td>
                          <td className="p-3">{movies}</td>
                          <td className="p-3">{tv}</td>
                          <td className="p-3">{pItems.length}</td>
                          <td className="p-3 text-amber-400 font-semibold">{avgR}</td>
                          <td className="p-3 text-[#00A8E1] font-mono">{hrs.toFixed(1)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="glass-card p-6 rounded-xl border border-white/10 space-y-4">
              <h4 className="text-sm font-semibold text-white">
                IMDb Rating Distribution across Titles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.slice(0, 6).map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-sm font-bold text-white line-clamp-1">{item.title}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          ★ {item.imdbRating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{item.platform} • {item.genre} • {item.releaseYear}</p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-xs font-mono text-gray-300">
                      <span>Stream Hours:</span>
                      <span className="text-[#00A8E1]">{item.streamHoursMillions}M</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'streamHours' && (
            <div className="glass-card p-6 rounded-xl border border-white/10 space-y-4">
              <h4 className="text-sm font-semibold text-white">
                Top Streamed Content Leaderboard
              </h4>
              <div className="space-y-3">
                {[...filteredItems].sort((a, b) => b.streamHoursMillions - a.streamHoursMillions).slice(0, 5).map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs text-gray-300 font-bold">
                        #{idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-white text-sm">{item.title}</span>
                        <p className="text-xs text-gray-400">{item.platform} • {item.genre}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#00A8E1] font-mono">{item.streamHoursMillions} M hrs</div>
                      <div className="text-[10px] text-gray-400">Release: {item.releaseYear}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Power BI Bar */}
        <div className="bg-[#111827] px-6 py-3 border-t border-white/10 flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span>Microsoft Power BI Embedded</span>
            <span>•</span>
            <span>Capacity: P1 Premium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-mono">Dataset Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
};
