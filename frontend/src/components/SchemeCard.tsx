import React, { useState } from 'react';
import { SchemeResult } from '../types';
import { ShieldCheck, HelpCircle, ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';
import { WhyModal } from './WhyModal';

interface SchemeCardProps {
  scheme: SchemeResult;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const [isWhyOpen, setIsWhyOpen] = useState(false);

  return (
    <>
      <div className={`rounded-2xl border p-5 transition-all flex flex-col justify-between space-y-4 ${
        scheme.eligible
          ? 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300'
          : 'bg-slate-50/70 border-slate-200/60 opacity-80'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {scheme.category}
            </span>

            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              scheme.eligible
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              {scheme.eligible ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-rose-600" />}
              {scheme.eligible ? 'Eligible' : 'Not Eligible'}
            </span>
          </div>

          <h4 className="font-bold text-slate-900 text-base leading-snug">{scheme.schemeName}</h4>
          <p className="text-xs text-slate-500 line-clamp-2">{scheme.shortDescription}</p>
        </div>

        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
          <span className="font-semibold text-slate-700 text-[11px] block">Key Benefit:</span>
          <p className="text-slate-600 font-medium leading-relaxed">{scheme.benefit}</p>
        </div>

        <div className="space-y-3 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Source: {scheme.source}</span>
            <span>{scheme.effectiveYear}</span>
          </div>

          <button
            onClick={() => setIsWhyOpen(true)}
            className="w-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-semibold text-xs py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 group"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            Why am I eligible?
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
          </button>
        </div>
      </div>

      <WhyModal
        isOpen={isWhyOpen}
        onClose={() => setIsWhyOpen(false)}
        title={`Scheme Eligibility Analysis — ${scheme.schemeId}`}
        scheme={scheme}
      />
    </>
  );
};
