import React, { useState } from 'react';
import { DeductionResult } from '../types';
import { ShieldCheck, Info } from 'lucide-react';
import { WhyModal } from './WhyModal';

interface DontLeaveMoneyOnTableProps {
  deductions: DeductionResult[];
}

export const DontLeaveMoneyOnTable: React.FC<DontLeaveMoneyOnTableProps> = ({ deductions }) => {
  const [selectedDeduction, setSelectedDeduction] = useState<DeductionResult | null>(null);
  const eligibleDeductions = deductions.filter(d => d.eligible);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
          HOUSEHOLD TAX CHECKUP
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Don't leave money on the table</h2>
        <p className="text-xs text-slate-600">
          Based on the information you provided, here are potential tax opportunities for expenses or investments you may already have.
        </p>
      </div>

      {/* Trust Philosophy Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 space-y-1">
        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
          Veroxa Trust Philosophy
        </div>
        <p className="leading-relaxed">
          Tax benefits should not be the only reason to make a financial decision. Veroxa prioritizes understanding your existing household expenses over encouraging new unnecessary spending.
        </p>
      </div>

      {/* Opportunities Grid */}
      <div className="space-y-4">
        {eligibleDeductions.map((d) => (
          <div key={d.ruleId} className="bg-slate-50 rounded-lg border border-slate-200 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  Section {d.ruleId}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{d.name}</h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-500 block">Potential Deduction</span>
                <span className="text-base font-bold text-slate-900">₹{d.potentialDeduction.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
              <div>
                <span className="text-slate-500 block">WHY IT MATCHED</span>
                <span className="font-medium text-slate-800">{d.passedConditions[0] || 'Eligible expense detected'}</span>
              </div>

              <div>
                <span className="text-slate-500 block">YOUR INFORMATION</span>
                <span className="font-medium text-slate-800">Reported: ₹{d.inputValue.toLocaleString('en-IN')}</span>
              </div>

              <div>
                <span className="text-slate-500 block">STATUTORY LIMIT</span>
                <span className="font-medium text-slate-800">Max Allowed: ₹{d.maximumAllowed.toLocaleString('en-IN')}</span>
              </div>

              <div>
                <span className="text-slate-500 block">RESULT</span>
                <span className="font-semibold text-emerald-800">Potentially Applicable</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDeduction(d)}
                className="text-xs font-semibold text-slate-900 hover:underline bg-white border border-slate-200 px-3 py-1.5 rounded-md transition-colors"
              >
                Why am I seeing this? →
              </button>
            </div>
          </div>
        ))}
      </div>

      <WhyModal
        isOpen={Boolean(selectedDeduction)}
        onClose={() => setSelectedDeduction(null)}
        title={selectedDeduction ? `Section ${selectedDeduction.ruleId} Breakdown` : ''}
        deduction={selectedDeduction || undefined}
      />
    </div>
  );
};
