import React from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import { DeductionResult, SchemeResult } from '../types';

interface WhyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  deduction?: DeductionResult;
  scheme?: SchemeResult;
}

export const WhyModal: React.FC<WhyModalProps> = ({ isOpen, onClose, title, deduction, scheme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {deduction && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Configured Rule</span>
                <span className="font-semibold text-slate-900">Section {deduction.ruleId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Your Reported Data</span>
                <span className="font-semibold text-slate-900">₹{deduction.inputValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Statutory Ceiling</span>
                <span className="font-semibold text-slate-900">₹{deduction.maximumAllowed.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span>Allowed Deduction</span>
                <span className="text-emerald-700">₹{deduction.potentialDeduction.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Condition Evaluation</span>

              {deduction.passedConditions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-emerald-800">Passed Conditions:</span>
                  {deduction.passedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-emerald-50 text-emerald-900 p-2 rounded-md border border-emerald-200 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}

              {deduction.failedConditions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-slate-600">Unmet Criteria:</span>
                  {deduction.failedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-slate-50 text-slate-700 p-2 rounded-md border border-slate-200 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600 leading-relaxed">
              <strong className="block text-slate-900 font-semibold mb-1">Official Reference:</strong>
              {deduction.source} ({deduction.effectiveYear}) — {deduction.reason}
            </div>
          </div>
        )}

        {scheme && (
          <div className="space-y-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheme ID</span>
                <span className="font-semibold text-slate-900">{scheme.schemeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold text-slate-900">{scheme.category}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span>Eligibility Status</span>
                <span className={scheme.eligible ? 'text-emerald-700' : 'text-slate-600'}>
                  {scheme.eligible ? 'Potentially Eligible' : 'Ineligible'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Condition Evaluation</span>

              {scheme.passedConditions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-emerald-800">Passed Conditions:</span>
                  {scheme.passedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-emerald-50 text-emerald-900 p-2 rounded-md border border-emerald-200 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}

              {scheme.failedConditions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-slate-600">Unmet Conditions:</span>
                  {scheme.failedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-slate-50 text-slate-700 p-2 rounded-md border border-slate-200 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}
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
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
