import React from 'react';
import { UserProfile } from '../types';
import { User, Edit3 } from 'lucide-react';

interface HouseholdSnapshotProps {
  profile: UserProfile;
  onEdit: () => void;
}

export const HouseholdSnapshot: React.FC<HouseholdSnapshotProps> = ({ profile, onEdit }) => {
  const formatIncome = (income: number) => {
    if (income >= 100000) {
      const lakhs = (income / 100000).toFixed(income % 100000 === 0 ? 0 : 1);
      return `₹${lakhs}L`;
    }
    return `₹${income.toLocaleString('en-IN')}`;
  };

  const chips: string[] = [];
  if (profile.maritalStatus) chips.push(profile.maritalStatus);
  if (profile.numberOfChildren && profile.numberOfChildren > 0) {
    chips.push(`${profile.numberOfChildren} ${profile.numberOfChildren === 1 ? 'child' : 'children'}`);
  }
  if (profile.supportingParents) chips.push('Supporting parents');
  if (profile.rent > 0) chips.push('Renting');
  if (profile.hasHomeLoan || profile.homeLoanInterest > 0) chips.push('Home loan');
  if (profile.healthInsuranceSelf > 0 || profile.healthInsuranceParents > 0) chips.push('Health insurance');
  if (profile.evLoanInterest && profile.evLoanInterest > 0) chips.push('Electric Vehicle loan');

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
            DEMO PROFILE
          </span>
          <span className="text-xs text-slate-400 font-medium">Household Context</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            {profile.name || 'Sample User'}
          </h3>
          <span className="text-xs text-slate-300">
            {profile.occupation.toUpperCase()} • Age {profile.age}
          </span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
            {formatIncome(profile.annualIncome)} Annual Income
          </span>
        </div>

        {/* Small Inline Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {chips.map((chip, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-slate-800 text-slate-200 border border-slate-700/80 px-2.5 py-0.5 rounded-md"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onEdit}
        className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
      >
        <Edit3 className="w-3.5 h-3.5" />
        Edit household
      </button>
    </div>
  );
};
