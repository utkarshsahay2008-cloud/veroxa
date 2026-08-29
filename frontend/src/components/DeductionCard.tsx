import React, { useState } from 'react';
import { DeductionResult } from '../types';
import { WhyModal } from './WhyModal';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DeductionCardProps {
  deduction: DeductionResult;
}

export const DeductionCard: React.FC<DeductionCardProps> = ({ deduction }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className={`rounded-xl border p-4 transition-all space-y-3 ${
        deduction.eligible
          ? 'bg-white border-slate-200 hover:border-slate-400'
          : 'bg-slate-50/70 border-slate-200/70 opacity-75'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Section {deduction.ruleId}
              </span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                deduction.eligible 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {deduction.eligible ? 'Potentially Applicable' : 'Unclaimed'}
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">{deduction.name}</h4>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-400 block">Potential Deduction</span>
              <span className={`text-sm font-bold ${deduction.eligible ? 'text-slate-900' : 'text-slate-400'}`}>
                ₹{deduction.potentialDeduction.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1"
            >
              {expanded ? 'Less' : 'Why?'}
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Compact Accordion Expansion */}
        {expanded && (
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs pt-3 border-t border-slate-200/80">
            <p className="text-slate-600 leading-relaxed">{deduction.reason}</p>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500">
              <div>Reported: <strong className="text-slate-800">₹{deduction.inputValue.toLocaleString('en-IN')}</strong></div>
              <div>Statutory Ceiling: <strong className="text-slate-800">₹{deduction.maximumAllowed.toLocaleString('en-IN')}</strong></div>
            </div>

            <div className="pt-1 flex justify-end">
              <button
                onClick={() => setIsWhyOpen(true)}
                className="text-[11px] font-semibold text-slate-900 hover:underline bg-white border border-slate-200 px-3 py-1 rounded transition-colors"
              >
                Why am I seeing this? →
              </button>
            </div>
          </div>
        )}
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
