import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { TaxSnapshot } from '../components/TaxSnapshot';
import { TaxCheckupOverview } from '../components/TaxCheckupOverview';
import { DontLeaveMoneyOnTable } from '../components/DontLeaveMoneyOnTable';
import { RegimeComparison } from '../components/RegimeComparison';
import { DeductionCard } from '../components/DeductionCard';
import { SchemeCard } from '../components/SchemeCard';
import { LifeEventCheck } from '../components/LifeEventCheck';
import { ChatAssistant } from '../components/ChatAssistant';

interface DashboardPageProps {
  analysis: CompleteAnalysisResponse;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ analysis }) => {
  const [selectedRuleIdForModal, setSelectedRuleIdForModal] = useState<string | null>(null);
  const deductionsRef = React.useRef<HTMLDivElement>(null);

  const scrollToDeductions = () => {
    deductionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreRule = (ruleId: string) => {
    setSelectedRuleIdForModal(ruleId);
    scrollToDeductions();
  };

  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);
  const eligibleSchemes = analysis.schemes.filter(s => s.eligible);

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 px-4">
      {/* 1. TAX CHECKUP */}
      <section className="space-y-6">
        <TaxSnapshot
          analysis={analysis.taxAnalysis}
          profile={analysis.profile}
          fullResponse={analysis}
          onExploreDeductions={scrollToDeductions}
        />

        <TaxCheckupOverview
          analysis={analysis}
          onExploreDeduction={handleExploreRule}
        />
      </section>

      {/* 2. WHAT YOU MAY BE MISSING ("Don't leave money on the table") */}
      <section>
        <DontLeaveMoneyOnTable deductions={analysis.deductions} />
      </section>

      {/* 3. OLD VS NEW REGIME ("Which tax regime fits your situation?") */}
      <section>
        <RegimeComparison analysis={analysis.taxAnalysis} />
      </section>

      {/* 4. WHY THESE RECOMMENDATIONS APPEARED */}
      <section ref={deductionsRef} className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Why These Recommendations Appeared</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Deterministic Chapter VI-A rule evaluation for your household profile
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200">
            {eligibleDeductions.length} Deductions Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysis.deductions.map((deduction) => (
            <DeductionCard key={deduction.ruleId} deduction={deduction} />
          ))}
        </div>

        {/* Government Schemes Section */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-lg font-bold text-slate-900">Potentially Relevant Government Schemes</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against configured government scheme eligibility criteria
              </p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200">
              {eligibleSchemes.length} Schemes Evaluated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.schemes.map((scheme) => (
              <SchemeCard key={scheme.schemeId} scheme={scheme} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. LIFE EVENT CHECK ("What's changed in your life this year?") */}
      <section>
        <LifeEventCheck
          analysis={analysis}
          onExploreRule={handleExploreRule}
        />
      </section>

      {/* 6. ASK VEROXA */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Ask Veroxa</h3>
          <p className="text-xs text-slate-500">
            Ask questions about your tax analysis, deductions, or regime selection. Answers are strictly derived from verified rule-engine results.
          </p>
        </div>

        <ChatAssistant analysisContext={analysis} />
      </section>
    </div>
  );
};
