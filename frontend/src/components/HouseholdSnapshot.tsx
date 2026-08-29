import React from 'react';
import { UserProfile } from '../types';
import { Edit3, Shield } from 'lucide-react';

interface HouseholdSnapshotProps {
  profile: UserProfile;
  onEdit: () => void;
}

export const HouseholdSnapshot: React.FC<HouseholdSnapshotProps> = ({ profile, onEdit }) => {
  const householdItems: string[] = [];
  if (profile.maritalStatus) householdItems.push(profile.maritalStatus);
  if (profile.numberOfChildren && profile.numberOfChildren > 0) {
    householdItems.push(`${profile.numberOfChildren} ${profile.numberOfChildren === 1 ? 'child' : 'children'}`);
  }
  if (profile.supportingParents) householdItems.push('Supporting parents');
  if (profile.rent > 0) householdItems.push('Renting');

  const benefitItems: string[] = [];
  if (profile.healthInsuranceSelf > 0 || profile.healthInsuranceParents > 0) benefitItems.push('Health insurance');
  if (profile.hasHomeLoan || profile.homeLoanInterest > 0) benefitItems.push('Home loan');
  if (profile.ppf > 0 || profile.elss > 0 || profile.epf > 0) benefitItems.push('Investments');
  if (profile.evLoanInterest && profile.evLoanInterest > 0) benefitItems.push('Electric Vehicle loan');
  if (profile.educationLoanInterest && profile.educationLoanInterest > 0) benefitItems.push('Education loan');

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
            HOUSEHOLD SNAPSHOT
          </span>
          <span className="text-[10px] font-semibold text-slate-400">DEMO PROFILE</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-xl font-extrabold text-slate-900">
            ₹{profile.annualIncome.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Annual income • {profile.name || 'Sample User'} ({profile.occupation})
          </span>
        </div>

        <div className="text-xs text-slate-600 font-medium space-x-2 pt-0.5">
          <span>{householdItems.join(' · ') || 'Single'}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-700">{benefitItems.join(' · ') || 'Standard Profile'}</span>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-xs px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5"
      >
        <Edit3 className="w-3.5 h-3.5" />
        Edit profile
      </button>
    </div>
  );
};
