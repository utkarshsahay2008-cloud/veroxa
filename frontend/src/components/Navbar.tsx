import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';

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
        {/* Brand */}
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

        {/* Lightweight Nav per Section 3 */}
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('landing')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
              currentTab === 'landing' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setCurrentTab('profile')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              currentTab === 'profile' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Profile & Demo
          </button>

          {hasAnalysis && (
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                currentTab === 'dashboard' ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tax Dashboard
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => setCurrentTab('profile')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 shrink-0 ml-1"
          >
            Try the demo
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>
      </div>
    </header>
  );
};
