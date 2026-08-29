import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { TaxSnapshot } from '../components/TaxSnapshot';
import { RegimeComparison } from '../components/RegimeComparison';
import { DeductionCard } from '../components/DeductionCard';
import { SchemeCard } from '../components/SchemeCard';
import { ChatAssistant } from '../components/ChatAssistant';

interface DashboardPageProps {
  analysis: CompleteAnalysisResponse;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'opportunities' | 'deductions' | 'schemes' | 'assistant'>('all');
  const deductionsRef = React.useRef<HTMLDivElement>(null);

  const scrollToDeductions = () => {
    deductionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);
  const eligibleSchemes = analysis.schemes.filter(s => s.eligible);
  const unclaimedOpps = analysis.unclaimedOpportunities || [];
  const totalExtraSavings = unclaimedOpps.reduce((sum, o) => sum + o.estimatedTaxSaving, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-8 px-4">
      {/* 1. Tax Snapshot */}
      <TaxSnapshot
        analysis={analysis.taxAnalysis}
        profile={analysis.profile}
        fullResponse={analysis}
        onExploreDeductions={scrollToDeductions}
      />

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 shrink-0 ${
            activeTab === 'all' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Overview & Comparison
        </button>

        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 shrink-0 ${
            activeTab === 'opportunities' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Extra Savings Checklist ({unclaimedOpps.length})
        </button>

        <button
          onClick={() => setActiveTab('deductions')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 shrink-0 ${
            activeTab === 'deductions' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Claimed Deductions ({eligibleDeductions.length})
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 shrink-0 ${
            activeTab === 'schemes' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Government Schemes ({eligibleSchemes.length})
        </button>

        <button
          onClick={() => setActiveTab('assistant')}
          className={`pb-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 shrink-0 ${
            activeTab === 'assistant' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Ask Veroxa
        </button>
      </div>

      {/* 2. Tax Regime Comparison */}
      {(activeTab === 'all') && (
        <RegimeComparison analysis={analysis.taxAnalysis} />
      )}

      {/* 3. Actionable Unclaimed Opportunities */}
      {(activeTab === 'all' || activeTab === 'opportunities') && unclaimedOpps.length > 0 && (
        <section className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                ACTIONABLE TAX SAVINGS CHECKLIST
              </span>
              <h3 className="text-xl font-bold">Unclaimed Deduction Headroom Available</h3>
              <p className="text-xs text-slate-300">
                You have unused deduction headroom under the Old Tax Regime. Taking these steps can reduce your tax payable further.
              </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-right shrink-0">
              <span className="text-[11px] text-slate-400 font-medium">Potential Extra Tax Savings</span>
              <div className="text-xl font-bold text-emerald-400">₹{totalExtraSavings.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unclaimedOpps.map((opp, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 bg-slate-700 px-2 py-0.5 rounded">
                    {opp.ruleId}
                  </span>
                  <span className="text-xs font-semibold text-emerald-400">
                    Save Extra ₹{opp.estimatedTaxSaving.toLocaleString('en-IN')}
                  </span>
                </div>

                <h4 className="font-bold text-white text-sm">{opp.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{opp.actionRecommendation}</p>

                <div className="pt-2 flex justify-between text-[11px] text-slate-400 border-t border-slate-700/60">
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
              <h3 className="text-lg font-bold text-slate-900">Tax Deductions Evaluated</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Deterministic Chapter VI-A evaluation under Old Tax Regime
              </p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200">
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
              <h3 className="text-lg font-bold text-slate-900">Government Tax-Saving Schemes</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against configured government scheme eligibility rules
              </p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200">
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
            <h3 className="text-lg font-bold text-slate-900">Ask Veroxa</h3>
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
