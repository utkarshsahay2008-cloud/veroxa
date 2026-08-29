import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { SyntheticPersona } from '../types';
import { InteractiveProcessExplorer } from '../components/InteractiveProcessExplorer';

interface LandingPageProps {
  personas: SyntheticPersona[];
  onSelectPersona: (persona: SyntheticPersona) => void;
  onTryDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ personas, onSelectPersona, onTryDemo }) => {
  const howItWorksRef = React.useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 py-10 sm:py-14">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
          VEROXA — TAX CHECKUP FOR MIDDLE-INCOME HOUSEHOLDS
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.15]">
          Understand your taxes. <br className="hidden sm:inline" />
          Find what you might be missing.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          Veroxa evaluates your household income, expenses, investments, and life events against configured tax rules and explains why each recommendation applies.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Try the demo
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-sm px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            See how it works
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Snapshot Preview */}
        <div className="pt-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl mx-auto text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">Tax Checkup Preview — Household Scenario</span>
              <span className="bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded">Recommended: Old Tax Regime</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Annual Income</span>
                <span className="font-semibold text-slate-900 text-sm">₹15,00,000</span>
              </div>
              <div>
                <span className="text-slate-400 block">Deductions Found</span>
                <span className="font-semibold text-slate-900 text-sm">₹4,25,000</span>
              </div>
              <div>
                <span className="text-slate-400 block">Estimated Savings</span>
                <span className="font-semibold text-emerald-800 text-sm">₹18,200</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 flex justify-between items-center">
              <span>Home Loan Interest & Section 80C: <strong>Reviewed & Allowed</strong></span>
              <span className="text-slate-900 font-medium cursor-pointer hover:underline" onClick={onTryDemo}>
                Why am I seeing this? →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Synthetic Personas Section */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Try Synthetic Household Personas</h2>
          <p className="text-xs text-slate-500">Explore how Veroxa evaluates different middle-class household profiles using synthetic demo data</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPersona(p)}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-400 transition-all cursor-pointer space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                    SYNTHETIC DEMO
                  </span>
                  <span className="text-xs text-slate-500">Age {p.profile.age}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{p.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.tagline}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800">Income: ₹{p.profile.annualIncome.toLocaleString('en-IN')}</span>
                <span className="text-slate-900 font-semibold hover:underline">Select →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Process Explorer */}
      <section ref={howItWorksRef} className="max-w-5xl mx-auto px-4">
        <InteractiveProcessExplorer />
      </section>
    </div>
  );
};
