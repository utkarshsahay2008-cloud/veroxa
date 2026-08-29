import React from 'react';
import { UserProfile } from '../types';
import { Edit3, Users, Home, Shield, Building, HeartHandshake } from 'lucide-react';

interface HouseholdSnapshotProps {
  profile: UserProfile;
  onEdit: () => void;
}

export const HouseholdSnapshot: React.FC<HouseholdSnapshotProps> = ({ profile, onEdit }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 h-full flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Household Snapshot</h3>
          <button
            onClick={onEdit}
            className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹{profile.annualIncome.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-500 font-medium">Annual income</span>
        </div>

        {/* Icon Chips Grid per Images 2 & 3 */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center gap-2 text-slate-700 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{profile.maritalStatus || 'Married'} {profile.numberOfChildren ? `· ${profile.numberOfChildren} child` : ''}</span>
          </div>

          {profile.supportingParents && (
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center gap-2 text-slate-700 font-medium">
              <HeartHandshake className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Supporting parents</span>
            </div>
          )}

          {profile.rent > 0 && (
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center gap-2 text-slate-700 font-medium">
              <Home className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Renting</span>
            </div>
          )}

          {(profile.healthInsuranceSelf > 0 || profile.healthInsuranceParents > 0) && (
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center gap-2 text-slate-700 font-medium">
              <Shield className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Health insurance</span>
            </div>
          )}

          {(profile.hasHomeLoan || profile.homeLoanInterest > 0) && (
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center gap-2 text-slate-700 font-medium">
              <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">Home loan</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
        Profile evaluated using synthetic demo context
      </div>
    </div>
  );
};
