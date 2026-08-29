import React, { useState } from 'react';
import { DeductionResult } from '../types';
import { WhyModal } from './WhyModal';

interface DeductionCardProps {
  deduction: DeductionResult;
}

export const DeductionCard: React.FC<DeductionCardProps> = ({ deduction }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <>
      <div className={`rounded-xl border p-5 transition-all flex flex-col justify-between space-y-4 ${
        deduction.eligible 
          ? 'bg-white border-slate-200 hover:border-slate-400' 
          : 'bg-slate-50/70 border-slate-200/70 opacity-75'
      }`}>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Section {deduction.ruleId}
            </span>

            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
              deduction.eligible 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {deduction.eligible ? 'Applicable' : 'Unclaimed'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-base">{deduction.name}</h4>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{deduction.reason}</p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-500">Potential Deduction</span>
            <span className={`text-base font-bold ${deduction.eligible ? 'text-slate-900' : 'text-slate-400'}`}>
              ₹{deduction.potentialDeduction.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Reported: ₹{deduction.inputValue.toLocaleString('en-IN')}</span>
            <span>Limit: ₹{deduction.maximumAllowed.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={() => setIsWhyOpen(true)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs py-2 px-3 rounded-md transition-colors text-center"
          >
            Why am I seeing this?
          </button>
        </div>
      </div>

      <WhyModal
        isOpen={isWhyOpen}
        onClose={() => setIsWhyOpen(false)}
        title={`Section ${deduction.ruleId} Explanation`}
        deduction={deduction}
      />
    </>
  );
};
