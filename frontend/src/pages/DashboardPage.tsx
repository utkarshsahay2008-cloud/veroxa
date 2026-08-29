import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { HouseholdSnapshot } from '../components/HouseholdSnapshot';
import { TaxCheckupHero } from '../components/TaxCheckupHero';
import { DontLeaveMoneyOnTable } from '../components/DontLeaveMoneyOnTable';
import { LifeEventCheck } from '../components/LifeEventCheck';
import { DeductionCard } from '../components/DeductionCard';
import { SchemeCard } from '../components/SchemeCard';
import { UnderstandYourTax } from '../components/UnderstandYourTax';
import { ChatAssistant } from '../components/ChatAssistant';

interface DashboardPageProps {
  analysis: CompleteAnalysisResponse;
  onEditProfile: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ analysis, onEditProfile }) => {
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
    <div className="max-w-5xl mx-auto space-y-10 py-8 px-4">
      {/* 1. HOUSEHOLD SNAPSHOT */}
      <section>
        <HouseholdSnapshot
          profile={analysis.profile}
          onEdit={onEditProfile}
        />
      </section>

      {/* 2. THE MAIN RESULT (TAX CHECKUP HERO) */}
      <section>
        <TaxCheckupHero
          analysis={analysis}
          onSeeWhy={scrollToDeductions}
        />
      </section>

      {/* 3. DON'T LEAVE MONEY ON THE TABLE */}
      <section>
        <DontLeaveMoneyOnTable deductions={analysis.deductions} />
      </section>

      {/* 4. WHAT CHANGED THIS YEAR? (LIFE EVENT CHECK) */}
      <section>
        <LifeEventCheck
          analysis={analysis}
          onExploreRule={handleExploreRule}
        />
      </section>

      {/* 5. WHY THESE RECOMMENDATIONS APPEARED */}
      <section ref={deductionsRef} className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Why these recommendations appeared</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Compact evaluation of Chapter VI-A rules for your household
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
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Potentially Relevant Government Schemes</h3>
              <p className="text-xs text-slate-600 mt-0.5">
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

      {/* 6. UNDERSTAND YOUR TAX */}
      <section>
        <UnderstandYourTax />
      </section>

      {/* 7. ASK VEROXA AI ASSISTANT */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Ask Veroxa</h2>
          <p className="text-xs text-slate-600">
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
