import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md dark:bg-zinc-900/70 dark:border-zinc-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-700 to-cyan-electric rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-900/20">
            S
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-indigo-deep dark:text-white">
            Scout<span className="text-cyan-electric">.ai</span>
          </h1>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-soft dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-700 hover:shadow-md transition-all border border-transparent hover:border-indigo-200 dark:hover:border-zinc-700"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M3 12h2.25m.386-6.364l1.591 1.591M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
