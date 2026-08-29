import React, { useState } from 'react';
import { DeductionResult } from '../types';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { WhyModal } from './WhyModal';

interface DontLeaveMoneyOnTableProps {
  deductions: DeductionResult[];
}

export const DontLeaveMoneyOnTable: React.FC<DontLeaveMoneyOnTableProps> = ({ deductions }) => {
  const [selectedDeduction, setSelectedDeduction] = useState<DeductionResult | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const eligibleDeductions = deductions.filter(d => d.eligible);
  const visibleDeductions = showAll ? eligibleDeductions : eligibleDeductions.slice(0, 3);
  const hasMore = eligibleDeductions.length > 3;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
          FEATURED OPPORTUNITIES
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Don't leave money on the table</h2>
        <p className="text-xs text-slate-600">
          We found a few potential opportunities worth checking based on your household information.
        </p>
      </div>

      {/* Trust Philosophy Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-700 space-y-1">
        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
          Veroxa Trust Philosophy
        </div>
        <p className="leading-relaxed">
          Tax benefits should not be the only reason to make a financial decision. We focus on identifying tax treatments for expenses you already have.
        </p>
      </div>

      {/* Top 3 Opportunities Grid */}
      <div className="space-y-4">
        {visibleDeductions.map((d, idx) => (
          <div key={d.ruleId} className="bg-slate-50 rounded-lg border border-slate-200 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-400 text-xs">0{idx + 1}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    Section {d.ruleId}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{d.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{d.reason}</p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] text-slate-500 block">Potential Deduction</span>
                <span className="text-base font-bold text-slate-900">₹{d.potentialDeduction.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
              <span className="text-slate-500">
                Reported in profile: <strong className="text-slate-800">₹{d.inputValue.toLocaleString('en-IN')}</strong> (Cap: ₹{d.maximumAllowed.toLocaleString('en-IN')})
              </span>

              <button
                onClick={() => setSelectedDeduction(d)}
                className="text-xs font-semibold text-slate-900 hover:underline bg-white border border-slate-200 px-3.5 py-1.5 rounded-md transition-colors"
              >
                Why am I seeing this? →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Toggle */}
      {hasMore && (
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {showAll ? 'Show top 3 opportunities only' : `View all potential opportunities (${eligibleDeductions.length})`}
            {showAll ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      <WhyModal
        isOpen={Boolean(selectedDeduction)}
        onClose={() => setSelectedDeduction(null)}
        title={selectedDeduction ? `Section ${selectedDeduction.ruleId} Breakdown` : ''}
        deduction={selectedDeduction || undefined}
      />
    </div>
  );
};
