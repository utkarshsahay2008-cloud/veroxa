import React from 'react';
import { TaxAnalysis, UserProfile } from '../types';
import { TrendingDown, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface TaxSnapshotProps {
  analysis: TaxAnalysis;
  profile: UserProfile;
  onExploreDeductions: () => void;
}

export const TaxSnapshot: React.FC<TaxSnapshotProps> = ({ analysis, profile, onExploreDeductions }) => {
  const isOldRecommended = analysis.recommendedRegime === 'Old Tax Regime';
  const recResult = isOldRecommended ? analysis.oldRegime : analysis.newRegime;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Deterministic Tax Summary</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Tax Snapshot for {profile.name || 'User'}</h2>
          <p className="text-sm text-slate-500 mt-1">FY 2024-25 (AY 2025-26) • Synthetic Demo Evaluation</p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-sm font-semibold">
          <Award className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Recommended: {analysis.recommendedRegime}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Gross Annual Income</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹{analysis.grossIncome.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-400">Total reported earnings</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Estimated Taxable Income</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹{recResult.taxableIncome.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-400">Under recommended regime</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Estimated Tax Payable</span>
          <div className="text-2xl font-bold text-brand-600 mt-1">₹{recResult.totalTax.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-400">Includes 4% Cess & Rebate</span>
        </div>

        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            Estimated Tax Savings
          </span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">₹{analysis.estimatedSavings.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-emerald-600 font-medium">Saved vs alternative regime</span>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            Regime Comparison Insight
          </div>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {analysis.recommendationReason}
          </p>
        </div>

        <button
          onClick={onExploreDeductions}
          className="shrink-0 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          View Opportunities
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
