import React from 'react';
import { MarketInsight } from '../types';

interface InsightsPanelProps {
  insights: MarketInsight[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  if (insights.length === 0) return null;

  return (
    <div className="lg:w-80 space-y-4">
      <h2 className="text-lg font-bold text-indigo-deep dark:text-white flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-electric">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        Market Insights
      </h2>
      <div className="space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-indigo-deep dark:text-white text-sm">{insight.title}</h3>
              {insight.trend === 'up' && <span className="text-green-500 text-xs animate-pulse">▲</span>}
              {insight.trend === 'down' && <span className="text-red-500 text-xs">▼</span>}
              {insight.trend === 'stable' && <span className="text-slate-soft text-xs">●</span>}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
