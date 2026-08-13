import React, { useState } from 'react';
import { StreamingItem, AIInsightResult } from '../types';

interface AIInsightsPanelProps {
  items: StreamingItem[];
  datasetName: string;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  items,
  datasetName,
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIInsightResult | null>(null);

  const totalTitles = items.length;
  const avgRating = totalTitles
    ? (items.reduce((a, c) => a + c.imdbRating, 0) / totalTitles).toFixed(1)
    : '0';

  const datasetSummary = {
    datasetName,
    totalTitles,
    avgRating,
    platforms: Array.from(new Set(items.map((i) => i.platform))),
    genres: Array.from(new Set(items.map((i) => i.genre))),
  };

  const handleGenerateInsight = async (customQuestion?: string) => {
    setLoading(true);
    setAiResult(null);

    const activeQuestion = customQuestion || prompt || 'Analyze this streaming catalog and provide high-ROI content acquisition strategies.';

    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetSummary,
          userPrompt: activeQuestion,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiResult({
          success: true,
          insight: data.insight,
          recommendations: data.recommendations || [],
        });
      } else {
        setAiResult({
          success: false,
          insight: 'Failed to generate insights.',
          recommendations: [],
          error: data.error,
        });
      }
    } catch (err: any) {
      setAiResult({
        success: false,
        insight: 'Network request error generating AI strategy report.',
        recommendations: [],
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-insights" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-3 border-[#050505] shadow-[6px_6px_0_#050505] relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7000FF] border-2 border-[#050505] shadow-[2px_2px_0_#050505] text-xs font-black text-white mb-2">
                <span>✨ StreamInsight AI Advisor</span>
                <span>•</span>
                <span>Gemini 2.5 Flash</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#050505]">
                Executive Strategy Generator
              </h2>
              <p className="text-[#050505]/80 text-sm font-bold mt-1">
                Ask Gemini AI to perform deep audience retention, genre ROI, and competitive gap analysis on your active catalog ({totalTitles} titles).
              </p>
            </div>

            <button
              onClick={() => handleGenerateInsight()}
              disabled={loading}
              className="bg-[#7000FF] hover:bg-[#FF007A] text-white font-black px-6 py-4 rounded-2xl border-3 border-[#050505] shadow-[4px_4px_0_#050505] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Analyzing Dataset...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-[#FFD600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Full AI Strategy Report</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-[#050505] font-black self-center mr-1">Quick Prompts:</span>
            {[
              'Which platform has the highest rating efficiency per stream hour?',
              'Identify genre voids in Netflix vs Prime Video.',
              'What content types drive highest retention in 2024?',
            ].map((qp) => (
              <button
                key={qp}
                onClick={() => {
                  setPrompt(qp);
                  handleGenerateInsight(qp);
                }}
                className="px-3.5 py-2 rounded-xl bg-[#F4F4F9] hover:bg-[#FFD600] text-[#050505] font-bold border-2 border-[#050505] transition-colors cursor-pointer"
              >
                "{qp}"
              </button>
            ))}
          </div>

          {/* Prompt Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask custom question about this catalog dataset (e.g. 'Predict Sci-Fi performance for Disney+ in 2025')..."
              className="flex-1 bg-[#F4F4F9] border-2 border-[#050505] rounded-xl px-4 py-3 text-sm text-[#050505] font-bold focus:outline-none focus:bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleGenerateInsight();
              }}
            />
            <button
              onClick={() => handleGenerateInsight()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#050505] hover:bg-[#7000FF] text-white font-black text-sm border-2 border-[#050505] transition-colors cursor-pointer disabled:opacity-50"
            >
              Ask
            </button>
          </div>

          {/* AI Result Card */}
          {aiResult && (
            <div className="p-6 rounded-2xl bg-[#FFD600] border-3 border-[#050505] shadow-[5px_5px_0_#050505] space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b-2 border-[#050505] pb-3">
                <span className="text-xs font-black text-[#050505] uppercase tracking-wider">
                  AI Strategy Analysis Output
                </span>
                <span className="text-[10px] text-[#050505] font-black">
                  Analyzed {totalTitles} items across {datasetSummary.platforms.length} platforms
                </span>
              </div>

              <div className="prose max-w-none text-sm text-[#050505] font-bold whitespace-pre-wrap leading-relaxed">
                {aiResult.insight}
              </div>

              {aiResult.recommendations.length > 0 && (
                <div className="pt-4 border-t-2 border-[#050505] space-y-2">
                  <h4 className="text-xs font-black text-[#7000FF] uppercase">
                    Key Executive Action Items:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {aiResult.recommendations.map((rec, i) => (
                      <li key={i} className="p-3 rounded-xl bg-white border-2 border-[#050505] text-[#050505] font-bold shadow-[2px_2px_0_#050505]">
                        <span className="text-[#FF007A] font-black mr-1">#{i + 1}</span> {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
