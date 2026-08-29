import React from 'react';
import { User, Cpu, FileText, ArrowRight } from 'lucide-react';

export const WhyPipeline: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Why These Recommendations Appeared</h3>
          <p className="text-xs text-slate-500">Every suggestion is backed by configured tax rules and your information.</p>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
          100% Deterministic Engine
        </span>
      </div>

      {/* 3 Step Visual Pipeline Flow per Images 2 & 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 items-center">
        {/* Step 1 */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-700">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">STEP 01</span>
            <h4 className="font-bold text-xs text-slate-900">Your information</h4>
            <p className="text-[11px] text-slate-500">Household profile data</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center gap-3 relative">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-700">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">STEP 02</span>
            <h4 className="font-bold text-xs text-slate-900">Rule engine</h4>
            <p className="text-[11px] text-slate-500">Configured tax rules</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-700">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">STEP 03</span>
            <h4 className="font-bold text-xs text-slate-900">Personalized analysis</h4>
            <p className="text-[11px] text-slate-500">Opportunities for your situation</p>
          </div>
        </div>
      </div>
    </div>
  );
};
