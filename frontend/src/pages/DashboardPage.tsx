import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { TaxSnapshot } from '../components/TaxSnapshot';
import { RegimeComparison } from '../components/RegimeComparison';
import { DeductionCard } from '../components/DeductionCard';
import { SchemeCard } from '../components/SchemeCard';
import { ChatAssistant } from '../components/ChatAssistant';
import { Sparkles, Award, Landmark, MessageSquare, TrendingUp, Lightbulb, CheckCircle2 } from 'lucide-react';

interface DashboardPageProps {
  analysis: CompleteAnalysisResponse;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'deductions' | 'opportunities' | 'schemes' | 'assistant'>('all');
  const deductionsRef = React.useRef<HTMLDivElement>(null);

  const scrollToDeductions = () => {
    deductionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);
  const eligibleSchemes = analysis.schemes.filter(s => s.eligible);
  const unclaimedOpps = analysis.unclaimedOpportunities || [];
  const totalExtraSavings = unclaimedOpps.reduce((sum, o) => sum + o.estimatedTaxSaving, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-6 px-4">
      {/* 1. Tax Snapshot Hero */}
      <TaxSnapshot
        analysis={analysis.taxAnalysis}
        profile={analysis.profile}
        fullResponse={analysis}
        onExploreDeductions={scrollToDeductions}
      />

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === 'all' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Full Tax Analysis Overview
        </button>

        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === 'opportunities' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Extra Savings Opportunities ({unclaimedOpps.length})
        </button>

        <button
          onClick={() => setActiveTab('deductions')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === 'deductions' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Claimed Deductions ({eligibleDeductions.length})
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${
            activeTab === 'schemes' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Landmark className="w-4 h-4" />
          Government Schemes ({eligibleSchemes.length})
        </button>

        <button
          onClick={() => setActiveTab('assistant')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center gap-1.5 shrink-0 ${
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

      {/* 3. Actionable Unclaimed Tax-Saving Opportunities */}
      {(activeTab === 'all' || activeTab === 'opportunities') && unclaimedOpps.length > 0 && (
        <section className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
            <div className="space-y-1">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                Actionable Tax Optimization Checklist
              </span>
              <h3 className="text-2xl font-bold">Additional Tax Savings Headroom Available</h3>
              <p className="text-xs text-slate-300">
                You have unused deduction limits under the Old Tax Regime. Taking these actions before tax filing can save you more money.
              </p>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-4 py-2 text-right">
              <span className="text-[11px] text-emerald-300 font-medium">Potential Extra Tax Savings</span>
              <div className="text-2xl font-extrabold text-emerald-400">₹{totalExtraSavings.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unclaimedOpps.map((opp, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-md">
                    {opp.ruleId}
                  </span>
                  <span className="text-xs font-bold text-emerald-300">
                    Save Extra ₹{opp.estimatedTaxSaving.toLocaleString('en-IN')}
                  </span>
                </div>

                <h4 className="font-bold text-base text-white">{opp.name}</h4>
                <p className="text-xs text-slate-200 leading-relaxed">{opp.actionRecommendation}</p>

                <div className="pt-2 flex justify-between text-[11px] text-slate-300 border-t border-white/10">
                  <span>Current Claim: ₹{opp.currentInput.toLocaleString('en-IN')}</span>
                  <span>Unused Headroom: ₹{opp.unusedHeadroom.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Deduction Opportunities */}
      {(activeTab === 'all' || activeTab === 'deductions') && (
        <section ref={deductionsRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Claimed & Potential Tax Deductions</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Deterministic Chapter VI-A evaluation under Old Tax Regime
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

      {/* 5. Government Schemes */}
      {(activeTab === 'all' || activeTab === 'schemes') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Eligible Government Tax-Saving Schemes</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against predefined government scheme eligibility rules
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

      {/* 6. AI Assistant */}
      {(activeTab === 'all' || activeTab === 'assistant') && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Ask Veroxa AI Assistant</h3>
            <p className="text-xs text-slate-500">
              Ask questions about your tax analysis, deductions, or regime selection. Answers are strictly derived from verified rule-engine results.
            </p>
          </div>

          <ChatAssistant analysisContext={analysis} />
        </section>
      )}
    </div>
  );
};
