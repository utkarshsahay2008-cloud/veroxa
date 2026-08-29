import React, { useState } from 'react';
import { X, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { DeductionResult, SchemeResult } from '../types';

interface WhyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  deduction?: DeductionResult;
  scheme?: SchemeResult;
}

export const WhyModal: React.FC<WhyModalProps> = ({ isOpen, onClose, title, deduction, scheme }) => {
  const [showTechnical, setShowTechnical] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            WHY THIS APPEARED
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {deduction && (
          <div className="space-y-4 text-xs">
            {/* Human Explanation First */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-4 text-emerald-900 space-y-1">
              <span className="font-bold text-[11px] uppercase tracking-wider block text-emerald-800">IN SIMPLE TERMS</span>
              <p className="text-xs font-medium leading-relaxed">
                {deduction.eligible 
                  ? `Your reported ${deduction.name.toLowerCase()} payment may qualify for a tax deduction under the configured rule.`
                  : `This deduction requirement is currently unmet based on your reported household information.`}
              </p>
            </div>

            {/* Simple Breakdown Table */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2.5">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">You reported</span>
                <span className="font-bold text-slate-900">₹{deduction.inputValue.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Relevant rule</span>
                <span className="font-bold text-slate-900">Section {deduction.ruleId}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Maximum considered under rule</span>
                <span className="font-bold text-slate-900">₹{deduction.maximumAllowed.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between pt-1 font-bold">
                <span className="text-slate-800">Potentially applicable</span>
                <span className="text-emerald-800 text-sm">₹{deduction.potentialDeduction.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Optional Technical Reference Toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 hover:underline"
              >
                {showTechnical ? 'Hide technical rule reference' : 'View technical rule reference →'}
              </button>

              {showTechnical && (
                <div className="mt-3 bg-slate-900 text-slate-200 p-3.5 rounded-lg text-[11px] space-y-2 font-mono">
                  <div className="text-amber-300">// {deduction.source} ({deduction.effectiveYear})</div>
                  <div>Passed: {deduction.passedConditions.join(', ') || 'None'}</div>
                  {deduction.failedConditions.length > 0 && (
                    <div className="text-slate-400">Failed: {deduction.failedConditions.join(', ')}</div>
                  )}
                  <p className="font-sans text-xs text-slate-300 pt-1 border-t border-slate-800">{deduction.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {scheme && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheme ID</span>
                <span className="font-bold text-slate-900">{scheme.schemeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-900">{scheme.category}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span>Eligibility Status</span>
                <span className={scheme.eligible ? 'text-emerald-800' : 'text-slate-600'}>
                  {scheme.eligible ? 'Potentially Eligible' : 'Ineligible'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 leading-relaxed">
              <strong className="block text-slate-900 font-semibold mb-1">Key Benefit & Source:</strong>
              {scheme.benefit} — {scheme.source} ({scheme.effectiveYear})
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Close explanation
          </button>
        </div>
      </div>
    </div>
  );
};
