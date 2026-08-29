import React, { useState } from 'react';
import { SchemeResult } from '../types';
import { WhyModal } from './WhyModal';

interface SchemeCardProps {
  scheme: SchemeResult;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <>
      <div className={`rounded-xl border p-5 transition-all flex flex-col justify-between space-y-4 ${
        scheme.eligible
          ? 'bg-white border-slate-200 hover:border-slate-400'
          : 'bg-slate-50/70 border-slate-200/70 opacity-75'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {scheme.category}
            </span>

            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
              scheme.eligible
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {scheme.eligible ? 'Potentially Eligible' : 'Ineligible'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-base">{scheme.schemeName}</h4>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{scheme.shortDescription}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
          <span className="font-semibold text-slate-900 text-[11px] block">Key Benefit:</span>
          <p className="text-slate-600 font-medium leading-relaxed">{scheme.benefit}</p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Source: {scheme.source}</span>
            <span>{scheme.effectiveYear}</span>
          </div>

          <button
            onClick={() => setIsWhyOpen(true)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs py-2 px-3 rounded-md transition-colors text-center"
          >
            Why am I eligible?
          </button>
        </div>
      </div>

      <WhyModal
        isOpen={isWhyOpen}
        onClose={() => setIsWhyOpen(false)}
        title={`Scheme Eligibility — ${scheme.schemeId}`}
        scheme={scheme}
      />
    </>
  );
};
