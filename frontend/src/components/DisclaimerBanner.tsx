import React from 'react';
import { Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 text-xs text-slate-700 flex items-center justify-center gap-2">
      <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
      <span>
        <strong className="font-semibold text-slate-900">Educational Guidance:</strong> Veroxa uses configured tax rules and synthetic data. It is not a certified tax authority or professional tax advisor. No real financial data is stored.
      </span>
    </div>
  );
};
