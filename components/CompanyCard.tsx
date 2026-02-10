
import React from 'react';
import { CompanyDetail } from '../types';

interface CompanyCardProps {
  company: CompanyDetail;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
            {company.name}
          </h3>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1 uppercase tracking-wider">
            {company.product}
          </p>
        </div>
        <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary-100 dark:border-primary-800">
          {company.role}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          <p className="font-semibold text-slate-900 dark:text-slate-200 mb-1 italic">Company Insight:</p>
          {company.details}
        </div>
        
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 group/link">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <a 
              href={`mailto:${company.email}`}
              className="text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors underline decoration-slate-200 dark:decoration-slate-700 underline-offset-4"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
