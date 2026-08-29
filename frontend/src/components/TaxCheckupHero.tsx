import React from 'react';
import { CompleteAnalysisResponse } from '../types';
import { Check, AlertCircle, ArrowRight, Info, Download } from 'lucide-react';

interface TaxCheckupHeroProps {
  analysis: CompleteAnalysisResponse;
  onSeeWhy: () => void;
}

export const TaxCheckupHero: React.FC<TaxCheckupHeroProps> = ({ analysis, onSeeWhy }) => {
  const isOldRecommended = analysis.taxAnalysis.recommendedRegime === 'Old Tax Regime';
  const oldR = analysis.taxAnalysis.oldRegime;
  const newR = analysis.taxAnalysis.newRegime;
  const diff = Math.abs(oldR.totalTax - newR.totalTax);
  const eligibleDeductions = analysis.deductions.filter(d => d.eligible);

  const handleExportReport = () => {
    const reportLines = [
      `================================================================`,
      `                     VEROXA TAX CHECKUP REPORT                  `,
      `================================================================`,
      `Date Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      `User Profile: ${analysis.profile.name || 'User'} (Age: ${analysis.profile.age})`,
      `Occupation: ${analysis.profile.occupation.toUpperCase()}`,
      `Gross Annual Income: ₹${analysis.profile.annualIncome.toLocaleString('en-IN')}`,
      `Recommended Tax Regime: ${analysis.taxAnalysis.recommendedRegime}`,
      `Estimated Difference: ₹${diff.toLocaleString('en-IN')}`,
      ``,
      `OLD REGIME TOTAL TAX: ₹${oldR.totalTax.toLocaleString('en-IN')}`,
      `NEW REGIME TOTAL TAX: ₹${newR.totalTax.toLocaleString('en-IN')}`,
      ``,
      `SUMMARY REASONING:`,
      `${analysis.taxAnalysis.recommendationReason}`,
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
    <div className="space-y-6">
      {/* Top Right Winner Panel per Images 2 & 3 */}
      <div className="bg-emerald-50/70 rounded-xl border border-emerald-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
            Recommended for your situation
          </span>

          <h3 className="text-xl font-bold text-slate-900">
            {isOldRecommended ? 'Old Tax Regime appears better' : 'New Tax Regime appears better'}
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-slate-600 text-xs font-medium">Potential difference</span>
            <span className="text-lg font-extrabold text-emerald-700">₹{diff.toLocaleString('en-IN')} lower tax</span>
          </div>

          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Your reported deductions (health insurance, home loan, PPF) reduce your taxable income below the New Regime threshold.
          </p>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          {/* Visual Comparison Bar Indicator per Images 2 & 3 */}
          <div className="flex items-end gap-1.5 h-12">
            <div className="flex flex-col items-center">
              <div className="w-5 bg-emerald-600 rounded-t" style={{ height: isOldRecommended ? '40px' : '48px' }} />
              <span className="text-[9px] font-semibold text-slate-600 mt-1">Old</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-5 bg-slate-300 rounded-t" style={{ height: !isOldRecommended ? '40px' : '48px' }} />
              <span className="text-[9px] font-semibold text-slate-600 mt-1">New</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReport}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" /> Save
            </button>

            <button
              onClick={onSeeWhy}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-1.5 rounded-md transition-colors flex items-center gap-1"
            >
              See why <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Veroxa Tax Checkup Status Grid per Images 2 & 3 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Veroxa Tax Checkup</h3>
            <p className="text-[11px] text-slate-500">Here's what matters for your household before you file.</p>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Updated just now</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Tax position</span>
              <span className="font-bold text-slate-900">Reviewed</span>
            </div>
            <Check className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-800 font-medium block">Potential opportunities</span>
              <span className="font-bold text-amber-900">{eligibleDeductions.length} worth checking</span>
            </div>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Documents</span>
              <span className="font-bold text-slate-900">2 worth checking</span>
            </div>
            <AlertCircle className="w-4 h-4 text-slate-400" />
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block">Information gaps</span>
              <span className="font-bold text-slate-900">1 item</span>
            </div>
            <Info className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
