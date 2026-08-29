import React from 'react';
import { CompleteAnalysisResponse } from '../types';
import { Check, AlertCircle, ArrowRight, Download } from 'lucide-react';

interface TaxCheckupHeroProps {
  analysis: CompleteAnalysisResponse;
  onSeeWhy: () => void;
}

export const TaxCheckupHero: React.FC<TaxCheckupHeroProps> = ({ analysis, onSeeWhy }) => {
  const isOldRecommended = analysis.taxAnalysis.recommendedRegime === 'Old Tax Regime';
  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);

  const handleExportReport = () => {
    const reportLines = [
      `================================================================`,
      `                     VEROXA TAX CHECKUP REPORT                  `,
      `================================================================`,
      `Date Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      `Profile: ${analysis.profile.name || 'User'} (Age: ${analysis.profile.age})`,
      `Occupation: ${analysis.profile.occupation.toUpperCase()}`,
      `Gross Annual Income: ₹${analysis.profile.annualIncome.toLocaleString('en-IN')}`,
      `Recommended Tax Regime: ${analysis.taxAnalysis.recommendedRegime}`,
      `Estimated Savings: ₹${analysis.taxAnalysis.estimatedSavings.toLocaleString('en-IN')}`,
      ``,
      `SUMMARY REASONING:`,
      `${analysis.taxAnalysis.recommendationReason}`,
      ``,
      `ELIGIBLE DEDUCTIONS REVIEWED:`,
      ...eligibleDeductions.map(d => `• ${d.name} (Section ${d.ruleId}): Allowed ₹${d.potentialDeduction.toLocaleString('en-IN')}`),
      ``,
      `================================================================`,
      `DISCLAIMER: Educational guidance based on synthetic demo data and configured rules.`,
      `================================================================`
    ];

    const blob = new Blob([reportLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Veroxa_Tax_Report_${(analysis.profile.name || 'User').replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
            VEROXA TAX CHECKUP
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">Here's what matters for your household before you file.</h2>
          <p className="text-xs text-slate-500 mt-0.5">FY 2024-25 • Configured Rule Engine Analysis</p>
        </div>

        <button
          onClick={handleExportReport}
          className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          Save Report
        </button>
      </div>

      {/* 4 Status Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
          <span className="text-slate-500 font-medium block">Tax Position</span>
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>Reviewed</span>
          </div>
        </div>

        <div className="bg-emerald-50/80 p-3.5 rounded-lg border border-emerald-200/80 space-y-1">
          <span className="text-emerald-800 font-medium block">Tax Regime</span>
          <div className="font-bold text-emerald-900">
            {isOldRecommended ? 'Old regime appears better' : 'New regime appears better'}
          </div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-lg border border-amber-200/80 space-y-1">
          <span className="text-amber-800 font-medium block">Potential Opportunities</span>
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>{eligibleDeductions.length} worth checking</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
          <span className="text-slate-500 font-medium block">Documents</span>
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>2 worth checking</span>
          </div>
        </div>
      </div>

      {/* Concise Summary Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Recommendation Summary</span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            Your current profile suggests the <strong className="text-white font-semibold">{analysis.taxAnalysis.recommendedRegime}</strong> may be more favorable, estimated lower by <strong className="text-emerald-400">₹{analysis.taxAnalysis.estimatedSavings.toLocaleString('en-IN')}</strong> based on the deductions you reported.
          </p>
        </div>

        <button
          onClick={onSeeWhy}
          className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-md transition-colors flex items-center gap-1.5"
        >
          See why
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
