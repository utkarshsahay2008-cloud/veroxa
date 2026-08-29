import React from 'react';
import { X, CheckCircle2, AlertCircle, HelpCircle, BookOpen, Calculator } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="text-xs text-slate-500">Deterministic Rule Engine Reasoning</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {deduction && (
          <div className="space-y-5">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rule Identifier</span>
                <span className="bg-brand-100 text-brand-800 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  Section {deduction.ruleId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-slate-500">Reported Input Value</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">₹{deduction.inputValue.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="text-slate-500">Statutory Limit</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">₹{deduction.maximumAllowed.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="text-slate-500">Allowed Deduction</span>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">₹{deduction.potentialDeduction.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="text-slate-500">Applicable Regime</span>
                  <div className="text-sm font-semibold text-slate-700 mt-0.5">{deduction.applicableRegime}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-brand-600" />
                Condition Evaluation Breakdown
              </h4>

              {deduction.passedConditions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-emerald-700">Passed Conditions:</span>
                  <ul className="space-y-1.5">
                    {deduction.passedConditions.map((cond, idx) => (
                      <li key={idx} className="text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-200/60 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {deduction.failedConditions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-rose-700">Failed / Unmet Conditions:</span>
                  <ul className="space-y-1.5">
                    {deduction.failedConditions.map((cond, idx) => (
                      <li key={idx} className="text-xs bg-rose-50 text-rose-900 p-2.5 rounded-lg border border-rose-200/60 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                Official Legal Reference
              </span>
              <p>{deduction.source} ({deduction.effectiveYear})</p>
              <p className="pt-1 text-slate-600 leading-relaxed">{deduction.reason}</p>
            </div>
          </div>
        )}

        {scheme && (
          <div className="space-y-5">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Scheme ID</span>
                <span className="font-bold text-slate-800">{scheme.schemeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold text-slate-700">{scheme.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Eligibility Status</span>
                <span className={`font-bold ${scheme.eligible ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {scheme.eligible ? 'Eligible (High Confidence)' : 'Ineligible'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Condition Evaluation</h4>

              {scheme.passedConditions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-emerald-700">Satisfied Eligibility Rules:</span>
                  <ul className="space-y-1.5">
                    {scheme.passedConditions.map((cond, idx) => (
                      <li key={idx} className="text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-lg border border-emerald-200 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {scheme.failedConditions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-rose-700">Failed Eligibility Criteria:</span>
                  <ul className="space-y-1.5">
                    {scheme.failedConditions.map((cond, idx) => (
                      <li key={idx} className="text-xs bg-rose-50 text-rose-900 p-2.5 rounded-lg border border-rose-200 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{cond}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-1">
              <span className="font-bold">Key Benefit:</span>
              <p>{scheme.benefit}</p>
              <div className="pt-2 text-[11px] text-emerald-700">Source: {scheme.source} ({scheme.effectiveYear})</div>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Close Explanation
          </button>
        </div>
      </div>
    </div>
  );
};
