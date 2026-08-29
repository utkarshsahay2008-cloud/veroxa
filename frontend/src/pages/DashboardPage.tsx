import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { TaxSnapshot } from '../components/TaxSnapshot';
import { RegimeComparison } from '../components/RegimeComparison';
import { DeductionCard } from '../components/DeductionCard';
import { SchemeCard } from '../components/SchemeCard';
import { ChatAssistant } from '../components/ChatAssistant';
import { Sparkles, ShieldCheck, HelpCircle, Award, Landmark, MessageSquare } from 'lucide-react';

interface DashboardPageProps {
  analysis: CompleteAnalysisResponse;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'deductions' | 'schemes' | 'assistant'>('all');
  const deductionsRef = React.useRef<HTMLDivElement>(null);

  const scrollToDeductions = () => {
    deductionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);
  const eligibleSchemes = analysis.schemes.filter(s => s.eligible);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6 px-4">
      {/* 1. Tax Snapshot Hero */}
      <TaxSnapshot
        analysis={analysis.taxAnalysis}
        profile={analysis.profile}
        onExploreDeductions={scrollToDeductions}
      />

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'all' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Full Tax Analysis Overview
        </button>

        <button
          onClick={() => setActiveTab('deductions')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'deductions' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Deduction Opportunities ({eligibleDeductions.length})
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'schemes' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Landmark className="w-4 h-4" />
          Government Schemes ({eligibleSchemes.length})
        </button>

        <button
          onClick={() => setActiveTab('assistant')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === 'assistant' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-brand-600" />
          AI Tax Assistant
        </button>
      </div>

      {/* 2. Tax Regime Comparison */}
      {(activeTab === 'all') && (
        <RegimeComparison analysis={analysis.taxAnalysis} />
      )}

      {/* 3. Deduction Opportunities */}
      {(activeTab === 'all' || activeTab === 'deductions') && (
        <section ref={deductionsRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Deduction Opportunities Found</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Deterministic Chapter VI-A evaluation for Old Tax Regime
              </p>
            </div>
            <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-3 py-1 rounded-full border border-brand-200">
              {eligibleDeductions.length} Applicable Deductions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.deductions.map((deduction) => (
              <DeductionCard key={deduction.ruleId} deduction={deduction} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Government Schemes */}
      {(activeTab === 'all' || activeTab === 'schemes') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Eligible Government Tax-Saving Schemes</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against predefined government eligibility rules
              </p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
              {eligibleSchemes.length} Schemes Recommended
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.schemes.map((scheme) => (
              <SchemeCard key={scheme.schemeId} scheme={scheme} />
            ))}
          </div>
        </section>
      )}

      {/* 5. AI Assistant */}
      {(activeTab === 'all' || activeTab === 'assistant') && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Ask Veroxa AI Assistant</h3>
            <p className="text-xs text-slate-500">
              Ask questions about your tax analysis. Answers are strictly derived from verified rule-engine results.
            </p>
          </div>

          <ChatAssistant analysisContext={analysis} />
        </section>
      )}
    </div>
  );
};
