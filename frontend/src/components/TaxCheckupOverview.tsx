import React from 'react';
import { CompleteAnalysisResponse } from '../types';
import { Check, AlertCircle, ArrowRight } from 'lucide-react';

interface TaxCheckupOverviewProps {
  analysis: CompleteAnalysisResponse;
  onExploreDeduction: (ruleId: string) => void;
}

export const TaxCheckupOverview: React.FC<TaxCheckupOverviewProps> = ({ analysis, onExploreDeduction }) => {
  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);
  const isOldRegime = analysis.taxAnalysis.recommendedRegime === 'Old Tax Regime';
  const topItemsToCheck = eligibleDeductions.slice(0, 3);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            VEROXA TAX CHECKUP
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">What should you know before you file?</h2>
          <p className="text-xs text-slate-500">A status-oriented tax review for {analysis.profile.name || 'your household'}</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-900">
          Estimated Savings: ₹{analysis.taxAnalysis.estimatedSavings.toLocaleString('en-IN')} ({analysis.taxAnalysis.recommendedRegime})
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Income & Salary</div>
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>Reviewed</span>
          </div>
          <div className="text-[11px] text-slate-400">₹{analysis.profile.annualIncome.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Tax Regimes</div>
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>Compared</span>
          </div>
          <div className="text-[11px] text-slate-400">{isOldRegime ? 'Old Regime Lower' : 'New Regime Lower'}</div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-lg border border-amber-200/80 space-y-1">
          <div className="text-amber-800 font-medium">Potential Deductions</div>
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{eligibleDeductions.length} worth checking</span>
          </div>
          <div className="text-[11px] text-amber-700">Chapter VI-A evaluated</div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
          <div className="text-slate-500 font-medium">Household Context</div>
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>Reviewed</span>
          </div>
          <div className="text-[11px] text-slate-400">Age {analysis.profile.age} • {analysis.profile.occupation}</div>
        </div>
      </div>

      {/* Top 3 things worth checking */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          {topItemsToCheck.length} Things Worth Checking Before You File
        </h3>

        <div className="space-y-3">
          {topItemsToCheck.map((item, idx) => (
            <div key={item.ruleId} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400">0{idx + 1}</span>
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Section {item.ruleId} — {item.name}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed max-w-2xl">{item.reason}</p>
              </div>

              <button
                onClick={() => onExploreDeduction(item.ruleId)}
                className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
              >
                See why
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
