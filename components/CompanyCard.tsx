
import React from 'react';
import { CompanyDetail } from '../types';

interface CompanyCardProps {
  company: CompanyDetail;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-7 hover:shadow-2xl hover:shadow-indigo-900/10 transition-all hover:-translate-y-1.5 group relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-900/5 to-cyan-electric/5 -mr-10 -mt-10 rounded-full blur-2xl group-hover:blur-xl transition-all"></div>
      
      <div className="flex justify-between items-start mb-5 relative">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-black text-indigo-deep dark:text-white group-hover:text-indigo-700 transition-colors leading-tight">
              {company.name}
            </h3>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse shrink-0" title="Live Listing"></span>
          </div>
          <p className="text-xs font-bold text-cyan-electric uppercase tracking-widest">
            {company.product}
          </p>
        </div>
        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800 uppercase tracking-tighter shrink-0">
          {company.role}
        </span>
      </div>
      
      <div className="space-y-5 relative flex-1">
        <div className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">
          <p className="font-bold text-indigo-deep dark:text-zinc-200 mb-2 text-xs uppercase tracking-wide opacity-70">Role Brief</p>
          {company.details}
        </div>
        
        <div className="pt-5 mt-auto border-t border-slate-100 dark:border-zinc-800 space-y-3">
          {company.url && (
            <a 
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 px-4 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 group/btn"
            >
              <span>View Listing on Indeed</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          )}
          
          <a 
            href={`mailto:${company.email}`}
            className="flex items-center gap-3 text-slate-soft dark:text-zinc-500 group/link hover:text-indigo-700 transition-colors"
          >
            <div className="p-2 bg-slate-50 dark:bg-zinc-800 rounded-lg group-hover/link:bg-indigo-50 dark:group-hover/link:bg-indigo-900/30 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="text-xs font-bold truncate">
              {company.email}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
