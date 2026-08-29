import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { HouseholdSnapshot } from '../components/HouseholdSnapshot';
import { TaxCheckupHero } from '../components/TaxCheckupHero';
import { DontLeaveMoneyOnTable } from '../components/DontLeaveMoneyOnTable';
import { RegimeComparison } from '../components/RegimeComparison';
import { LifeEventCheck } from '../components/LifeEventCheck';
import { DeductionCard } from '../components/DeductionCard';
import { SchemeCard } from '../components/SchemeCard';
import { WhyPipeline } from '../components/WhyPipeline';
import { UnderstandYourTax } from '../components/UnderstandYourTax';
import { ChatAssistant } from '../components/ChatAssistant';

interface DashboardPageProps {
  analysis: CompleteAnalysisResponse;
  onEditProfile: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ analysis, onEditProfile }) => {
  const [selectedRuleIdForModal, setSelectedRuleIdForModal] = useState<string | null>(null);
  const regimeRef = React.useRef<HTMLDivElement>(null);
  const deductionsRef = React.useRef<HTMLDivElement>(null);
  const chatRef = React.useRef<HTMLDivElement>(null);

  const scrollToRegime = () => {
    regimeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeductions = () => {
    deductionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAskVeroxa = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreRule = (ruleId: string) => {
    setSelectedRuleIdForModal(ruleId);
    scrollToDeductions();
  };

  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);
  const eligibleSchemes = analysis.schemes.filter(s => s.eligible);

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6 px-4 sm:px-6">
      {/* Dashboard Page Title per User Directive (NO "Good morning Aarav") */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Your Tax Checkup</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Your household's tax checkup is ready for FY 2024-25 (AY 2025-26).</p>
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-md border border-slate-200 shrink-0">
          FY 2024-25 (AY 2025-26)
        </span>
      </div>

      {/* Hero Dual Grid per Images 2 & 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5">
          <HouseholdSnapshot
            profile={analysis.profile}
            onEdit={onEditProfile}
          />
        </div>

        <div className="lg:col-span-7">
          <TaxCheckupHero
            analysis={analysis}
            onSeeWhy={scrollToRegime}
          />
        </div>
      </div>

      {/* Don't Leave Money on the Table per Images 2 & 3 */}
      <section>
        <DontLeaveMoneyOnTable deductions={analysis.deductions} />
      </section>

      {/* Which Tax Regime Fits You? per Images 2 & 3 */}
      <section ref={regimeRef}>
        <RegimeComparison analysis={analysis.taxAnalysis} />
      </section>

      {/* What Changed in Your Life This Year? per Images 2 & 3 */}
      <section>
        <LifeEventCheck
          analysis={analysis}
          onExploreRule={handleExploreRule}
        />
      </section>

      {/* Why These Recommendations Appeared Pipeline per Images 2 & 3 */}
      <section>
        <WhyPipeline />
      </section>

      {/* Deduction Details */}
      <section ref={deductionsRef} className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">All Evaluated Chapter VI-A Deductions</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Deterministic calculation breakdown for your reported investments and expenses
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200">
            {eligibleDeductions.length} Deductions Evaluated
          </span>
        </div>

        <div className="space-y-3">
          {analysis.deductions.map((deduction) => (
            <DeductionCard key={deduction.ruleId} deduction={deduction} />
          ))}
        </div>

        {/* Government Schemes Section */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-base font-bold text-slate-900">Potentially Relevant Government Schemes</h4>
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

      {/* FAQ Section per Image 1 ("Clear answers.") */}
      <section className="pt-6 border-t border-slate-200">
        <UnderstandYourTax onAskVeroxa={scrollToAskVeroxa} />
      </section>

      {/* Ask Veroxa AI Assistant */}
      <section ref={chatRef} className="space-y-4 pt-6 border-t border-slate-200">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Ask Veroxa</h3>
          <p className="text-xs text-slate-500">
            Ask questions about your tax checkup, deductions, or regime selection. Answers are strictly derived from verified rule-engine results.
          </p>
        </div>

        <ChatAssistant analysisContext={analysis} />
      </section>

      {/* DISCLAIMER */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-[11px] text-slate-500 leading-relaxed text-center">
        <strong>Educational Guidance Disclaimer:</strong> Veroxa uses configured tax rules and synthetic demo data for educational purposes only. It is not a certified tax authority, tax professional, financial advisor, or tax filing service. No real financial data is stored.
      </div>
    </div>
  );
};
