import React from 'react';
import { TaxAnalysis, UserProfile, CompleteAnalysisResponse } from '../types';
import { Download, ArrowRight } from 'lucide-react';

interface TaxSnapshotProps {
  analysis: TaxAnalysis;
  profile: UserProfile;
  fullResponse?: CompleteAnalysisResponse;
  onExploreDeductions: () => void;
}

export const TaxSnapshot: React.FC<TaxSnapshotProps> = ({ analysis, profile, fullResponse, onExploreDeductions }) => {
  const isOldRecommended = analysis.recommendedRegime === 'Old Tax Regime';
  const recResult = isOldRecommended ? analysis.oldRegime : analysis.newRegime;

  const handleExportTaxReport = () => {
    if (!fullResponse) return;

    const reportLines = [
      `================================================================`,
      `                     VEROXA TAX SAVINGS REPORT                  `,
      `================================================================`,
      `Date Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      `User Profile Name: ${profile.name || 'Sample User'} (Age: ${profile.age})`,
      `Occupation: ${profile.occupation.toUpperCase()}`,
      ``,
      `----------------------------------------------------------------`,
      `1. INCOME & TAX REGIME COMPARISON SUMMARY`,
      `----------------------------------------------------------------`,
      `Gross Annual Income:        ₹${analysis.grossIncome.toLocaleString('en-IN')}`,
      `Recommended Tax Regime:     ${analysis.recommendedRegime}`,
      `Estimated Tax Savings:      ₹${analysis.estimatedSavings.toLocaleString('en-IN')}`,
      ``,
      `OLD TAX REGIME BREAKDOWN:`,
      `  - Standard Deduction:     -₹${analysis.oldRegime.standardDeduction.toLocaleString('en-IN')}`,
      `  - Chapter VI-A Deductions: -₹${(analysis.oldRegime.totalDeductions - analysis.oldRegime.standardDeduction).toLocaleString('en-IN')}`,
      `  - Net Taxable Income:      ₹${analysis.oldRegime.taxableIncome.toLocaleString('en-IN')}`,
      `  - Total Tax Payable:       ₹${analysis.oldRegime.totalTax.toLocaleString('en-IN')}`,
      ``,
      `NEW TAX REGIME BREAKDOWN:`,
      `  - Standard Deduction:     -₹${analysis.newRegime.standardDeduction.toLocaleString('en-IN')}`,
      `  - Net Taxable Income:      ₹${analysis.newRegime.taxableIncome.toLocaleString('en-IN')}`,
      `  - Total Tax Payable:       ₹${analysis.newRegime.totalTax.toLocaleString('en-IN')}`,
      ``,
      `REGIME SELECTION REASON:`,
      `${analysis.recommendationReason}`,
      ``,
      `----------------------------------------------------------------`,
      `2. CLAIMED TAX DEDUCTIONS (OLD REGIME)`,
      `----------------------------------------------------------------`,
      ...fullResponse.deductions.filter(d => d.eligible).map(d => 
        `• ${d.name} (Section ${d.ruleId}): Reported ₹${d.inputValue.toLocaleString('en-IN')} | Allowed Deduction ₹${d.potentialDeduction.toLocaleString('en-IN')}`
      ),
      ``,
      `----------------------------------------------------------------`,
      `3. ACTIONABLE UNCLAIMED TAX SAVING OPPORTUNITIES`,
      `----------------------------------------------------------------`,
      ...(fullResponse.unclaimedOpportunities.length > 0 
        ? fullResponse.unclaimedOpportunities.map(o => 
            `• ${o.name}: Unused Headroom ₹${o.unusedHeadroom.toLocaleString('en-IN')} -> Save Extra ₹${o.estimatedTaxSaving.toLocaleString('en-IN')}\n  Action: ${o.actionRecommendation}`
          )
        : ['No unclaimed deduction headroom remaining. Maximum tax optimization achieved!']
      ),
      ``,
      `----------------------------------------------------------------`,
      `4. ELIGIBLE GOVERNMENT SAVINGS SCHEMES`,
      `----------------------------------------------------------------`,
      ...fullResponse.schemes.filter(s => s.eligible).map(s => 
        `• ${s.schemeName}: ${s.benefit} (${s.source})`
      ),
      ``,
      `================================================================`,
      `DISCLAIMER: Veroxa operates on synthetic demo data and configured tax rules for educational purposes only.`,
      `================================================================`
    ];

    const blob = new Blob([reportLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Veroxa_Tax_Report_${(profile.name || 'User').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">TAX SNAPSHOT</span>
          <h2 className="text-2xl font-bold text-slate-900 mt-0.5">Evaluation for {profile.name || 'User'}</h2>
          <p className="text-xs text-slate-500 mt-1">FY 2024-25 (AY 2025-26) • Configured Rule Engine Analysis</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-100 text-slate-900 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-semibold">
            Recommended: {analysis.recommendedRegime}
          </div>

          {fullResponse && (
            <button
              onClick={handleExportTaxReport}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Save Report
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Gross Annual Income</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">₹{analysis.grossIncome.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-400">Total reported earnings</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Estimated Taxable Income</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">₹{recResult.taxableIncome.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-400">Under recommended regime</span>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <span className="text-xs text-slate-500 font-medium">Estimated Tax Payable</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">₹{recResult.totalTax.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-slate-400">Includes 4% Cess & Rebates</span>
        </div>

        <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200/80">
          <span className="text-xs text-emerald-800 font-semibold">Estimated Tax Savings</span>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-1">₹{analysis.estimatedSavings.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-emerald-800">Savings vs alternative regime</span>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Regime Comparison Finding</span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
            {analysis.recommendationReason}
          </p>
        </div>

        <button
          onClick={onExploreDeductions}
          className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold px-4 py-2 rounded-md transition-colors flex items-center gap-1.5"
        >
          View Deductions
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
