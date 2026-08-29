import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-center gap-2 font-medium">
      <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
      <span>
        <strong>Educational Guidance Only:</strong> Veroxa operates strictly on synthetic demo data and configured tax rules. It is not a certified tax authority or professional tax advisor. No real financial data is stored.
      </span>
    </div>
  );
};
