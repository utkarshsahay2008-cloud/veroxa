import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, FileCheck2, Scale, Sparkles, BookOpen } from 'lucide-react';
import { SyntheticPersona } from '../types';

interface LandingPageProps {
  personas: SyntheticPersona[];
  onSelectPersona: (persona: SyntheticPersona) => void;
  onTryDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ personas, onSelectPersona, onTryDemo }) => {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6 px-4">
        <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" />
          Deterministic Tax Engine + Grounded AI Explanation
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Understand your taxes. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-500">
            Discover your savings.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
          AI-powered tax guidance explained in plain language. Uncover deductions, evaluate government schemes, and compare Old vs New tax regimes deterministically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            Try Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            Upload Sample Document
          </button>
        </div>

        <div className="pt-4 text-xs text-slate-400 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Synthetic Data Only</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Scale className="w-3.5 h-3.5 text-brand-600" /> Config-Driven Rules</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5 text-slate-600" /> Zero Hallucinations</span>
        </div>
      </section>

      {/* Synthetic Demo Personas */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">Try Pre-Loaded Synthetic Personas</h2>
          <p className="text-sm text-slate-500">Test different tax scenarios with synthetic demo profiles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personas.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPersona(p)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-brand-500 transition-all cursor-pointer space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    SYNTHETIC DEMO DATA
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Age {p.profile.age}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-600 transition-colors">{p.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{p.tagline}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Income: ₹{p.profile.annualIncome.toLocaleString('en-IN')}</span>
                <span className="text-brand-600 font-semibold group-hover:underline flex items-center gap-1">
                  Load <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Critical Design Architecture Cards */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">How Veroxa Works</h2>
          <p className="text-sm text-slate-500">Separating deterministic calculations from plain-language LLM explanations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">1. Structured Profile Normalization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Converts synthetic documents, CSVs, or inputs into a normalized profile containing income, rent, investments, insurance, and loans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">2. Deterministic Rule Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates exact tax liability under Old & New regimes, evaluates Section 80C/80D limits, and verifies scheme eligibility criteria from JSON configs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">3. Plain-Language AI Explanations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Translates rule engine findings into clear conversational responses. The LLM never invents tax rules or calculates numbers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
