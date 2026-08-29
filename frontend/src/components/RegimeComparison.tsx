import React, { useState } from 'react';
import { TaxAnalysis } from '../types';
import { ChevronDown, ChevronUp, CheckCircle, Info } from 'lucide-react';

interface RegimeComparisonProps {
  analysis: TaxAnalysis;
}

export const RegimeComparison: React.FC<RegimeComparisonProps> = ({ analysis }) => {
  const [showSlabs, setShowSlabs] = useState(false);
  const oldR = analysis.oldRegime;
  const newR = analysis.newRegime;
  const isOldWinner = analysis.recommendedRegime === 'Old Tax Regime';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Tax Regime Comparison</h3>
          <p className="text-xs text-slate-500 mt-0.5">Side-by-side breakdown under Indian Income Tax Act FY 2024-25</p>
        </div>

        <button
          onClick={() => setShowSlabs(!showSlabs)}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          {showSlabs ? 'Hide Tax Slabs' : 'View Tax Slabs'}
          {showSlabs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Regime Card */}
        <div className={`rounded-xl p-5 border transition-all ${
          isOldWinner ? 'border-brand-500 bg-brand-50/20 ring-2 ring-brand-500/10' : 'border-slate-200 bg-slate-50/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900">{oldR.regimeName}</h4>
              {isOldWinner && (
                <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Recommended
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Gross Income</span>
              <span className="font-semibold text-slate-800">₹{oldR.grossIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Standard Deduction</span>
              <span className="font-semibold text-emerald-600">-₹{oldR.standardDeduction.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Chapter VI-A Deductions (80C, 80D, etc.)</span>
              <span className="font-semibold text-emerald-600">-₹{(oldR.totalDeductions - oldR.standardDeduction).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Net Taxable Income</span>
              <span className="font-bold text-slate-900">₹{oldR.taxableIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Base Slab Tax</span>
              <span className="font-medium text-slate-800">₹{oldR.baseTax.toLocaleString('en-IN')}</span>
            </div>

            {oldR.rebate87A > 0 && (
              <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-emerald-600">
                <span>Section 87A Rebate</span>
                <span className="font-semibold">-₹{oldR.rebate87A.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Health & Education Cess (4%)</span>
              <span className="font-medium text-slate-800">₹{oldR.cess.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between pt-2 text-sm">
              <span className="font-bold text-slate-900">Total Tax Payable</span>
              <span className={`font-bold ${isOldWinner ? 'text-emerald-600' : 'text-slate-900'}`}>
                ₹{oldR.totalTax.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* New Regime Card */}
        <div className={`rounded-xl p-5 border transition-all ${
          !isOldWinner ? 'border-brand-500 bg-brand-50/20 ring-2 ring-brand-500/10' : 'border-slate-200 bg-slate-50/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900">{newR.regimeName}</h4>
              {!isOldWinner && (
                <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Recommended
                </span>
              )}
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Gross Income</span>
              <span className="font-semibold text-slate-800">₹{newR.grossIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Standard Deduction</span>
              <span className="font-semibold text-emerald-600">-₹{newR.standardDeduction.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Chapter VI-A Deductions</span>
              <span className="text-slate-400 font-medium">Not Allowed</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Net Taxable Income</span>
              <span className="font-bold text-slate-900">₹{newR.taxableIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Base Slab Tax</span>
              <span className="font-medium text-slate-800">₹{newR.baseTax.toLocaleString('en-IN')}</span>
            </div>

            {newR.rebate87A > 0 && (
              <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-emerald-600">
                <span>Section 87A Rebate</span>
                <span className="font-semibold">-₹{newR.rebate87A.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Health & Education Cess (4%)</span>
              <span className="font-medium text-slate-800">₹{newR.cess.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between pt-2 text-sm">
              <span className="font-bold text-slate-900">Total Tax Payable</span>
              <span className={`font-bold ${!isOldWinner ? 'text-emerald-600' : 'text-slate-900'}`}>
                ₹{newR.totalTax.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSlabs && (
        <div className="mt-6 border-t border-slate-200 pt-6 space-y-4">
          <h4 className="text-sm font-bold text-slate-900">Step-by-Step Slab Calculation Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-2">Old Regime Tax Slabs</div>
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

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-2">New Regime Tax Slabs</div>
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
