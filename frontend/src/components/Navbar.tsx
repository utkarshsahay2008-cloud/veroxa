import React from 'react';
import { UserCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: 'landing' | 'profile' | 'dashboard';
  setCurrentTab: (tab: 'landing' | 'profile' | 'dashboard') => void;
  activePersonaName?: string;
  hasAnalysis: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, activePersonaName, hasAnalysis }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div 
          onClick={() => setCurrentTab('landing')} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base">Veroxa</span>
            <span className="text-[11px] text-slate-500 block -mt-1 font-normal">Tax Guidance</span>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentTab('landing')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              currentTab === 'landing' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentTab('profile')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              currentTab === 'profile' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Profile & Demo
          </button>

          {hasAnalysis && (
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                currentTab === 'dashboard' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              Tax Dashboard
            </button>
          )}
        </nav>

        {activePersonaName && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
            <span>Demo Profile: <strong className="text-slate-900 font-semibold">{activePersonaName}</strong></span>
          </div>
        )}
      </div>
    </header>
  );
};
