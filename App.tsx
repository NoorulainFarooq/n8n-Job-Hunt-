
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CompanyCard from './components/CompanyCard';
import InsightsPanel from './components/InsightsPanel';
import { CompanyDetail, MarketInsight, SearchResponse } from './types';
import { fetchCompanyData } from './services/geminiService';

const WEBHOOK_URL = 'https://noorulain-28.app.n8n.cloud/webhook/8650e67f-47bd-4b0a-8927-0fd5b8b7e1c4';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyDetail[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [sources, setSources] = useState<Array<{ title: string; uri: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastSearch, setLastSearch] = useState<string>('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (role: string) => {
    setLoading(true);
    setError(null);
    setLastSearch(role);

    try {
      // Triggering the production n8n workflow for external tracking/logging
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            role, 
            timestamp: new Date().toISOString(),
            platform: 'AI Company Scout Dashboard',
            source: 'Explore Button',
            intent: 'Live Indeed Search'
          }),
        });
      } catch (webhookErr) {
        console.warn('Webhook delivery failed, proceeding with direct search...');
      }

      const data: SearchResponse = await fetchCompanyData(role);
      setCompanies(data.companies.slice(0, 5));
      setInsights(data.insights);
      setSources(data.sources || []);
    } catch (err) {
      setError('Search failed to fetch live data. Please ensure your API_KEY is valid and has search grounding enabled.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40 pb-20">
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-indigo-deep dark:text-white mb-6 tracking-tight leading-tight">
            Live Indeed <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-cyan-electric">Scout</span>
          </h2>
          <p className="text-slate-soft dark:text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            Searching Indeed.com and global career boards for current <span className="text-indigo-700 dark:text-indigo-400 font-bold italic underline decoration-cyan-electric/30 underline-offset-4">real</span> opportunities.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="max-w-2xl mx-auto mb-10 p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
            {error}
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-10">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companies.map((company, index) => (
                <div key={company.id} className={index === 4 ? 'md:col-span-2 md:max-w-md md:mx-auto w-full' : ''}>
                  <CompanyCard company={company} />
                </div>
              ))}
            </div>
            
            {sources.length > 0 && (
              <div className="mt-16 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                  Verified Data Sources
                </h3>
                <div className="flex flex-wrap gap-4">
                  {sources.map((src, idx) => (
                    <a 
                      key={idx} 
                      href={src.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:underline px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg transition-colors border border-indigo-100 dark:border-indigo-800/50"
                    >
                      {src.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {!lastSearch && !loading && (
              <div className="flex flex-col items-center justify-center py-24 group">
                <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform border border-slate-100 dark:border-zinc-800">
                  <svg className="w-10 h-10 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-slate-soft dark:text-zinc-600 tracking-tight">Search live for your next role</p>
              </div>
            )}
            
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className={`h-64 bg-slate-200/50 dark:bg-zinc-800/50 rounded-3xl ${i === 5 ? 'md:col-span-2 md:max-w-md md:mx-auto w-full' : ''}`}></div>
                ))}
              </div>
            )}
          </div>

          {(insights.length > 0) && (
            <InsightsPanel insights={insights} />
          )}
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-zinc-800 text-center text-slate-soft dark:text-zinc-600 text-sm font-medium">
        <p>© {new Date().getFullYear()} AI Company Scout. Powering your career with live search grounding.</p>
      </footer>
    </div>
  );
};

export default App;
