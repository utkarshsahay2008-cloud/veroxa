import React, { useState } from 'react';
import { DeductionResult } from '../types';
import { HelpCircle, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { WhyModal } from './WhyModal';

interface DeductionCardProps {
  deduction: DeductionResult;
}

export const DeductionCard: React.FC<DeductionCardProps> = ({ deduction }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <>
      <div className={`rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-4 ${
        deduction.eligible 
          ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-brand-300' 
          : 'bg-slate-50/60 border-slate-200/60 opacity-80'
      }`}>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
              Section {deduction.ruleId}
            </span>

            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              deduction.eligible 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-slate-100 text-slate-500'
            }`}>
              {deduction.eligible ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {deduction.eligible ? 'Applicable' : 'Unclaimed'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-base leading-snug">{deduction.name}</h4>
          <p className="text-xs text-slate-500 line-clamp-2">{deduction.reason}</p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-500 font-medium">Potential Deduction</span>
            <span className={`text-lg font-bold ${deduction.eligible ? 'text-brand-600' : 'text-slate-400'}`}>
              ₹{deduction.potentialDeduction.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Reported: ₹{deduction.inputValue.toLocaleString('en-IN')}</span>
            <span>Limit: ₹{deduction.maximumAllowed.toLocaleString('en-IN')}</span>
          </div>

          <button
            onClick={() => setIsWhyOpen(true)}
            className="w-full bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-semibold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 group"
          >
            <HelpCircle className="w-3.5 h-3.5 text-brand-600 group-hover:scale-110 transition-transform" />
            Why am I seeing this?
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-brand-600" />
          </button>
        </div>
      </div>

      <WhyModal
        isOpen={isWhyOpen}
        onClose={() => setIsWhyOpen(false)}
        title={`Why Section ${deduction.ruleId} Recommendation?`}
        deduction={deduction}
      />
    </>
  );
};
