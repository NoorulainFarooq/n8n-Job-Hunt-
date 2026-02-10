
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CompanyCard from './components/CompanyCard';
import InsightsPanel from './components/InsightsPanel';
import { CompanyDetail, MarketInsight, SearchResponse } from './types';
import { fetchCompanyData } from './services/geminiService';

// n8n workflow webhook URL
const WEBHOOK_URL = 'https://noorulain3.app.n8n.cloud/webhook/53cf372c-8f77-498a-990f-9d2d348389b7';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyDetail[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
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
      // 1. Send data to the n8n workflow
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            role, 
            timestamp: new Date().toISOString(),
            platform: 'AI Company Scout Dashboard'
          }),
        });
      } catch (webhookErr) {
        console.warn('Webhook delivery failed, proceeding with search...');
      }

      // 2. Fetch company data from Gemini
      const data: SearchResponse = await fetchCompanyData(role);
      setCompanies(data.companies);
      setInsights(data.insights);
    } catch (err) {
      setError('Search failed. Please ensure your API Key is correctly configured in the deployment environment.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors font-sans selection:bg-primary-100 dark:selection:bg-primary-900/40">
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Company Scout <span className="text-primary-600">AI</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">
            Enter a role to discover companies actively hiring or investing in that expertise.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
            
            {!lastSearch && !loading && (
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <p className="text-lg">Start by searching for a job role above</p>
              </div>
            )}
            
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                ))}
              </div>
            )}
          </div>

          {(insights.length > 0) && (
            <InsightsPanel insights={insights} />
          )}
        </div>
      </main>

      <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} AI Company Scout. Professional talent extraction dashboard.</p>
      </footer>
    </div>
  );
};

export default App;
