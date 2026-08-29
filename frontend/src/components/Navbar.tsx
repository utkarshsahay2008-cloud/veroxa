import React from 'react';
import { Calculator, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: 'landing' | 'profile' | 'dashboard';
  setCurrentTab: (tab: 'landing' | 'profile' | 'dashboard') => void;
  activePersonaName?: string;
  hasAnalysis: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, activePersonaName, hasAnalysis }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={() => setCurrentTab('landing')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Veroxa</span>
              <span className="bg-brand-50 text-brand-700 border border-brand-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">AI MVP</span>
            </div>
            <p className="text-[11px] text-slate-500 -mt-0.5">Explainable Tax Guidance</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentTab('landing')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              currentTab === 'landing' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'profile' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Profile & Demo
          </button>
          {hasAnalysis && (
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'dashboard' ? 'bg-brand-600 text-white shadow-sm' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Tax Dashboard
            </button>
          )}
        </nav>

        {activePersonaName && (
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Active Demo: <strong>{activePersonaName}</strong></span>
          </div>
        )}
      </div>
    </header>
  );
};
