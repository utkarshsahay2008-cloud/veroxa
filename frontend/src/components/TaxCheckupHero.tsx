import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { ChevronDown, ChevronUp, Check, Download } from 'lucide-react';

interface TaxCheckupHeroProps {
  analysis: CompleteAnalysisResponse;
  onSeeWhy: () => void;
}

export const TaxCheckupHero: React.FC<TaxCheckupHeroProps> = ({ analysis, onSeeWhy }) => {
  const [showCalculation, setShowCalculation] = useState(false);

  const oldR = analysis.taxAnalysis.oldRegime;
  const newR = analysis.taxAnalysis.newRegime;
  const isOldWinner = analysis.taxAnalysis.recommendedRegime === 'Old Tax Regime';
  const diff = Math.abs(oldR.totalTax - newR.totalTax);

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
      {/* Page Heading per Master Prompt Section 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your tax checkup</h1>
          <p className="text-sm text-slate-600 mt-1">See what may matter for your household before you file.</p>
        </div>

        <button
          onClick={handleExportReport}
          className="shrink-0 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          Save report
        </button>
      </div>

      {/* Main Result Focal Point per Master Prompt Section 6 */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Which option looks better for you?</h2>
          <button
            onClick={() => setShowCalculation(!showCalculation)}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
          >
            {showCalculation ? 'Hide calculation' : 'See calculation'}
            {showCalculation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`rounded-xl p-5 border transition-all ${
            isOldWinner ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900/10' : 'border-slate-200 bg-white'
          }`}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">OLD TAX REGIME</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">₹{oldR.totalTax.toLocaleString('en-IN')}</div>
            <span className="text-xs text-slate-500 block mt-1">Estimated tax payable</span>
          </div>

          <div className={`rounded-xl p-5 border transition-all ${
            !isOldWinner ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900/10' : 'border-slate-200 bg-white'
          }`}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">NEW TAX REGIME</div>
            <div className="text-3xl font-extrabold text-slate-900 mt-2">₹{newR.totalTax.toLocaleString('en-IN')}</div>
            <span className="text-xs text-slate-500 block mt-1">Estimated tax payable</span>
          </div>
        </div>

        {/* Conclusion Banner */}
        <div className="bg-emerald-50/90 border border-emerald-200 rounded-lg p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] block">
              {isOldWinner ? 'OLD REGIME APPEARS BETTER' : 'NEW REGIME APPEARS BETTER'}
            </span>
            <p className="text-emerald-800 font-medium">
              Potential difference: <strong className="font-bold">₹{diff.toLocaleString('en-IN')} lower</strong> based on your reported household deductions.
            </p>
          </div>

          <button
            onClick={onSeeWhy}
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-md transition-colors"
          >
            Why?
          </button>
        </div>

        {/* Hidden Calculation Details */}
        {showCalculation && (
          <div className="border-t border-slate-200 pt-6 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Slab Breakdown Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-900">Old Regime Slabs</div>
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-1">Slab</th>
                      <th className="py-1">Rate</th>
                      <th className="py-1 text-right">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {oldR.slabBreakdown.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-1">{s.slab}</td>
                        <td className="py-1">{s.rate}%</td>
                        <td className="py-1 text-right font-mono">₹{s.taxAmount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-900">New Regime Slabs</div>
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-1">Slab</th>
                      <th className="py-1">Rate</th>
                      <th className="py-1 text-right">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newR.slabBreakdown.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-1">{s.slab}</td>
                        <td className="py-1">{s.rate}%</td>
                        <td className="py-1 text-right font-mono">₹{s.taxAmount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
