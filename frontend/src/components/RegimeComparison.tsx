import React, { useState } from 'react';
import { TaxAnalysis } from '../types';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface RegimeComparisonProps {
  analysis: TaxAnalysis;
}

export const RegimeComparison: React.FC<RegimeComparisonProps> = ({ analysis }) => {
  const [showSlabs, setShowSlabs] = useState(false);
  const oldR = analysis.oldRegime;
  const newR = analysis.newRegime;
  const isOldWinner = analysis.recommendedRegime === 'Old Tax Regime';
  const diff = Math.abs(oldR.totalTax - newR.totalTax);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
            REGIME COMPARISON
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Which tax regime fits your situation?</h2>
          <p className="text-xs text-slate-500">Calculated under Indian Income Tax Act FY 2024-25</p>
        </div>

        <button
          onClick={() => setShowSlabs(!showSlabs)}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
        >
          {showSlabs ? 'Hide calculation details' : 'See the calculation'}
          {showSlabs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Side-by-Side Clean Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`rounded-xl p-5 border transition-all ${
          isOldWinner ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900/10' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-base">Old Tax Regime</h3>
            {isOldWinner && (
              <span className="bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Appears Favorable
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹{oldR.totalTax.toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-500 block mt-0.5">Estimated Tax Payable</span>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 mt-3">
            Includes standard deduction & Chapter VI-A deductions
          </div>
        </div>

        <div className={`rounded-xl p-5 border transition-all ${
          !isOldWinner ? 'border-slate-900 bg-slate-50/80 ring-1 ring-slate-900/10' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-base">New Tax Regime</h3>
            {!isOldWinner && (
              <span className="bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Appears Favorable
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">₹{newR.totalTax.toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-500 block mt-0.5">Estimated Tax Payable</span>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 mt-3">
            Includes ₹75,000 standard deduction (No Chapter VI-A)
          </div>
        </div>
      </div>

      {/* Human Why Explanation Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <span className="text-sm font-bold text-emerald-400">
            {isOldWinner ? 'OLD REGIME' : 'NEW REGIME'} appears better by ₹{diff.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-400">Based on your reported household profile</span>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <strong className="block text-white font-semibold text-xs">WHY IS THIS DIFFERENT?</strong>
          <p className="leading-relaxed">
            {isOldWinner 
              ? 'Because your profile contains deductions that are considered under the configured Old Regime rules:' 
              : 'The New Regime provides lower tax slab rates and a higher ₹75,000 standard deduction, which outweighs your reported deductions.'}
          </p>

          {isOldWinner && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-medium text-slate-200">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Reported Section 80C investments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Health insurance premium</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Home loan interest / rent benefits</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Calculation Details (Hidden by Default) */}
      {showSlabs && (
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Step-by-Step Slab Calculation Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-900">Old Tax Regime Slabs</div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-1">Slab</th>
                    <th className="py-1">Rate</th>
                    <th className="py-1">Taxable</th>
                    <th className="py-1 text-right">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {oldR.slabBreakdown.map((s, idx) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="py-1">{s.slab}</td>
                      <td className="py-1">{s.rate}%</td>
                      <td className="py-1">₹{s.taxableInSlab.toLocaleString('en-IN')}</td>
                      <td className="py-1 text-right font-mono">₹{s.taxAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-900">New Tax Regime Slabs</div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-1">Slab</th>
                    <th className="py-1">Rate</th>
                    <th className="py-1">Taxable</th>
                    <th className="py-1 text-right">Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {newR.slabBreakdown.map((s, idx) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="py-1">{s.slab}</td>
                      <td className="py-1">{s.rate}%</td>
                      <td className="py-1">₹{s.taxableInSlab.toLocaleString('en-IN')}</td>
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
  );
};
