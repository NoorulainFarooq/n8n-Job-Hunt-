import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (role: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-16">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-6 h-6 text-slate-soft group-focus-within:text-indigo-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search roles like 'Senior AI Engineer'..."
          className="block w-full pl-14 pr-36 py-5 border border-slate-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-soft focus:outline-none focus:ring-4 focus:ring-indigo-700/10 focus:border-indigo-700 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all text-lg"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2.5 top-2.5 bottom-2.5 px-8 bg-indigo-700 hover:bg-indigo-800 active:scale-95 disabled:bg-slate-300 dark:disabled:bg-zinc-800 text-white font-bold rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-900/30"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Explore'
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
