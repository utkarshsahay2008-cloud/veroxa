import React, { useState } from 'react';
import { TaxAnalysis } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RegimeComparisonProps {
  analysis: TaxAnalysis;
}

export const RegimeComparison: React.FC<RegimeComparisonProps> = ({ analysis }) => {
  const [showSlabs, setShowSlabs] = useState(false);
  const oldR = analysis.oldRegime;
  const newR = analysis.newRegime;
  const isOldWinner = analysis.recommendedRegime === 'Old Tax Regime';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Tax Regime Comparison</h3>
          <p className="text-xs text-slate-500 mt-0.5">Calculated under Indian Income Tax Act FY 2024-25</p>
        </div>

        <button
          onClick={() => setShowSlabs(!showSlabs)}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
        >
          {showSlabs ? 'Hide Tax Slabs' : 'View Tax Slabs'}
          {showSlabs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Regime */}
        <div className={`rounded-xl p-5 border ${
          isOldWinner ? 'border-slate-900 bg-slate-50/60 ring-1 ring-slate-900/10' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900">{oldR.regimeName}</h4>
            {isOldWinner && (
              <span className="bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Gross Income</span>
              <span className="font-medium text-slate-900">₹{oldR.grossIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Standard Deduction</span>
              <span className="font-medium text-slate-700">-₹{oldR.standardDeduction.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Chapter VI-A Deductions</span>
              <span className="font-medium text-slate-700">-₹{(oldR.totalDeductions - oldR.standardDeduction).toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60 font-semibold">
              <span className="text-slate-700">Net Taxable Income</span>
              <span className="text-slate-900">₹{oldR.taxableIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Base Slab Tax</span>
              <span className="text-slate-800">₹{oldR.baseTax.toLocaleString('en-IN')}</span>
            </div>

            {oldR.rebate87A > 0 && (
              <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-emerald-700 font-medium">
                <span>Section 87A Rebate</span>
                <span>-₹{oldR.rebate87A.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Health & Education Cess (4%)</span>
              <span className="text-slate-800">₹{oldR.cess.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between pt-2 text-sm font-bold">
              <span className="text-slate-900">Total Tax Payable</span>
              <span className={isOldWinner ? 'text-emerald-700' : 'text-slate-900'}>
                ₹{oldR.totalTax.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* New Regime */}
        <div className={`rounded-xl p-5 border ${
          !isOldWinner ? 'border-slate-900 bg-slate-50/60 ring-1 ring-slate-900/10' : 'border-slate-200 bg-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-slate-900">{newR.regimeName}</h4>
            {!isOldWinner && (
              <span className="bg-slate-900 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Gross Income</span>
              <span className="font-medium text-slate-900">₹{newR.grossIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Standard Deduction</span>
              <span className="font-medium text-slate-700">-₹{newR.standardDeduction.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Chapter VI-A Deductions</span>
              <span className="text-slate-400">Not Allowed</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60 font-semibold">
              <span className="text-slate-700">Net Taxable Income</span>
              <span className="text-slate-900">₹{newR.taxableIncome.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Base Slab Tax</span>
              <span className="text-slate-800">₹{newR.baseTax.toLocaleString('en-IN')}</span>
            </div>

            {newR.rebate87A > 0 && (
              <div className="flex justify-between py-1.5 border-b border-slate-200/60 text-emerald-700 font-medium">
                <span>Section 87A Rebate</span>
                <span>-₹{newR.rebate87A.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between py-1.5 border-b border-slate-200/60">
              <span className="text-slate-500">Health & Education Cess (4%)</span>
              <span className="text-slate-800">₹{newR.cess.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between pt-2 text-sm font-bold">
              <span className="text-slate-900">Total Tax Payable</span>
              <span className={!isOldWinner ? 'text-emerald-700' : 'text-slate-900'}>
                ₹{newR.totalTax.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSlabs && (
        <div className="border-t border-slate-200 pt-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Step-by-Step Slab Calculation Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">Old Regime Slabs</div>
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

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="font-semibold text-slate-900 mb-2">New Regime Slabs</div>
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
