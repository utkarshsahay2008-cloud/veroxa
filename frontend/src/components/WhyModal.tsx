import React, { useState } from 'react';
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
            {scheme ? (scheme.eligible ? 'WHY YOU QUALIFY' : 'WHY INELIGIBLE') : 'WHY THIS APPEARED'}
          </span>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. DEDUCTION EXPLANATION */}
        {deduction && (
          <div className="space-y-4 text-xs">
            {/* Brief 1-Sentence Human Summary */}
            <div className={`p-4 rounded-lg border space-y-1 ${
              deduction.eligible 
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className="font-bold text-[11px] uppercase tracking-wider block">IN BRIEF</span>
              <p className="text-xs font-medium leading-relaxed">
                {deduction.eligible 
                  ? `Your reported ${deduction.name.toLowerCase()} payment of ₹${deduction.inputValue.toLocaleString('en-IN')} qualifies for up to ₹${deduction.potentialDeduction.toLocaleString('en-IN')} tax deduction under Section ${deduction.ruleId}.`
                  : `You currently do not receive a deduction for Section ${deduction.ruleId} because no eligible expenses were reported in your profile.`}
              </p>
            </div>

            {/* Structured Financial Breakdown */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">You reported</span>
                <span className="font-bold text-slate-900">₹{deduction.inputValue.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Relevant tax rule</span>
                <span className="font-bold text-slate-900">Section {deduction.ruleId}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Maximum limit under rule</span>
                <span className="font-bold text-slate-900">₹{deduction.maximumAllowed.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between pt-1 font-bold">
                <span className="text-slate-800">Allowed deduction</span>
                <span className="text-emerald-800 text-sm">₹{deduction.potentialDeduction.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Conditions Passed / Unmet */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Condition Checklist</span>

              {deduction.passedConditions.length > 0 && (
                <div className="space-y-1">
                  {deduction.passedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-emerald-50 text-emerald-900 p-2 rounded border border-emerald-200 flex items-start gap-2 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}

              {deduction.failedConditions.length > 0 && (
                <div className="space-y-1">
                  {deduction.failedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-slate-100 text-slate-700 p-2 rounded border border-slate-200 flex items-start gap-2 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technical Rule Reference Toggle */}
            <div className="pt-1">
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 hover:underline"
              >
                {showTechnical ? 'Hide technical reference' : 'View technical reference →'}
              </button>

              {showTechnical && (
                <div className="mt-3 bg-slate-900 text-slate-200 p-3.5 rounded-lg text-[11px] space-y-2 font-mono">
                  <div className="text-amber-300">// {deduction.source} ({deduction.effectiveYear})</div>
                  <p className="font-sans text-xs text-slate-300 pt-1 border-t border-slate-800">{deduction.explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. GOVERNMENT SCHEME EXPLANATION */}
        {scheme && (
          <div className="space-y-4 text-xs">
            {/* Brief 1-Sentence Takeaway */}
            <div className={`p-4 rounded-lg border space-y-1 ${
              scheme.eligible 
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}>
              <span className="font-bold text-[11px] uppercase tracking-wider block">IN BRIEF</span>
              <p className="text-xs font-medium leading-relaxed">
                {scheme.eligible
                  ? `You are potentially eligible for ${scheme.schemeName} based on your age and household profile.`
                  : `You are currently ineligible for ${scheme.schemeName} because key criteria (such as minimum age or dependents) were not satisfied in your profile.`}
              </p>
            </div>

            {/* Scheme Summary Panel */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Scheme name</span>
                <span className="font-bold text-slate-900">{scheme.schemeName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Category</span>
                <span className="font-bold text-slate-900">{scheme.category}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Key benefit</span>
                <span className="font-semibold text-slate-800">{scheme.benefit}</span>
              </div>

              <div className="flex justify-between pt-1 font-bold">
                <span className="text-slate-800">Status</span>
                <span className={scheme.eligible ? 'text-emerald-800' : 'text-amber-800'}>
                  {scheme.eligible ? 'Potentially Eligible' : 'Ineligible'}
                </span>
              </div>
            </div>

            {/* Condition Checklist (Why Passed / Why Failed) */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Eligibility Criteria Checked</span>

              {scheme.passedConditions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-emerald-800 text-[11px]">Satisfied Criteria:</span>
                  {scheme.passedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-emerald-50 text-emerald-900 p-2 rounded border border-emerald-200 flex items-start gap-2 text-[11px]">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}

              {scheme.failedConditions.length > 0 && (
                <div className="space-y-1">
                  <span className="font-semibold text-amber-800 text-[11px]">Unmet Criteria:</span>
                  {scheme.failedConditions.map((cond, idx) => (
                    <div key={idx} className="bg-amber-50 text-amber-900 p-2 rounded border border-amber-200 flex items-start gap-2 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{cond}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Legal Source */}
            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2">
              Official Reference: <strong>{scheme.source} ({scheme.effectiveYear})</strong>
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
