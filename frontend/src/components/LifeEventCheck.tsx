import React, { useState } from 'react';
import { CompleteAnalysisResponse } from '../types';
import { Home, Heart, Baby, Users, Shield, TrendingUp, Briefcase } from 'lucide-react';

interface LifeEventCheckProps {
  analysis: CompleteAnalysisResponse;
  onExploreRule: (ruleId: string) => void;
}

interface LifeEventOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  ruleIdMatch: string;
  responseGenerator: (analysis: CompleteAnalysisResponse) => {
    status: 'qualified' | 'needs_info' | 'not_applicable';
    message: string;
    ruleId?: string;
  };
}

export const LifeEventCheck: React.FC<LifeEventCheckProps> = ({ analysis, onExploreRule }) => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const lifeEvents: LifeEventOption[] = [
    {
      id: 'home_loan',
      label: 'Started paying a home loan',
      icon: <Home className="w-3.5 h-3.5" />,
      ruleIdMatch: 'SECTION_24B',
      responseGenerator: (ans) => {
        const sec24b = ans.deductions.find(d => d.ruleId === 'SECTION_24B');
        if (sec24b && sec24b.eligible) {
          return {
            status: 'qualified',
            message: `Your reported home loan interest payment of ₹${sec24b.inputValue.toLocaleString('en-IN')} qualifies for up to ₹${sec24b.potentialDeduction.toLocaleString('en-IN')} deduction under Section 24(b).`,
            ruleId: 'SECTION_24B'
          };
        }
        return {
          status: 'needs_info',
          message: `If you started paying a home loan, you may be eligible for up to ₹2,00,000 deduction under Section 24(b).`
        };
      }
    },
    {
      id: 'supporting_parents',
      label: 'Started supporting parents',
      icon: <Users className="w-3.5 h-3.5" />,
      ruleIdMatch: '80D',
      responseGenerator: (ans) => {
        if (ans.profile.healthInsuranceParents > 0) {
          return {
            status: 'qualified',
            message: `Your parents' health insurance premium of ₹${ans.profile.healthInsuranceParents.toLocaleString('en-IN')} qualifies for Section 80D deduction (up to ₹50,000 for senior parents).`,
            ruleId: '80D'
          };
        }
        return {
          status: 'needs_info',
          message: `Paying health insurance for parents unlocks an additional deduction under Section 80D (up to ₹50,000 for senior parents).`
        };
      }
    },
    {
      id: 'paying_rent',
      label: 'Started paying rent',
      icon: <Home className="w-3.5 h-3.5" />,
      ruleIdMatch: '80GG',
      responseGenerator: (ans) => {
        const sec80gg = ans.deductions.find(d => d.ruleId === '80GG');
        if (ans.profile.rent > 0 && ans.profile.hraReceived === 0) {
          return {
            status: 'qualified',
            message: `Since you pay rent (₹${ans.profile.rent.toLocaleString('en-IN')}/yr) and receive ₹0 HRA, you qualify for Section 80GG deduction up to ₹60,000.`,
            ruleId: '80GG'
          };
        }
        return {
          status: 'needs_info',
          message: `If you pay rent and do not receive HRA from your employer, Section 80GG allows a deduction up to ₹60,000 per year.`
        };
      }
    },
    {
      id: 'retirement_nps',
      label: 'Started investing for retirement',
      icon: <TrendingUp className="w-3.5 h-3.5" />,
      ruleIdMatch: '80CCD_1B',
      responseGenerator: (ans) => {
        const nps = ans.deductions.find(d => d.ruleId === '80CCD_1B');
        if (nps && nps.eligible) {
          return {
            status: 'qualified',
            message: `Your NPS contribution of ₹${nps.inputValue.toLocaleString('en-IN')} is eligible for Section 80CCD(1B) deduction up to ₹50,000.`,
            ruleId: '80CCD_1B'
          };
        }
        return {
          status: 'needs_info',
          message: `Contributions to NPS Tier-I qualify for an exclusive tax deduction up to ₹50,000 under Section 80CCD(1B), over and above Section 80C.`
        };
      }
    },
    {
      id: 'got_married',
      label: 'Got married',
      icon: <Heart className="w-3.5 h-3.5" />,
      ruleIdMatch: '80D',
      responseGenerator: () => ({
        status: 'needs_info',
        message: `Marriage allows combining family health insurance policies under Section 80D with a combined limit of ₹25,000.`
      })
    },
    {
      id: 'had_child',
      label: 'Had a child',
      icon: <Baby className="w-3.5 h-3.5" />,
      ruleIdMatch: '80C',
      responseGenerator: (ans) => {
        if (ans.profile.hasGirlChild && ans.profile.girlChildAge && ans.profile.girlChildAge <= 10) {
          return {
            status: 'qualified',
            message: `Having a girl child under age 10 qualifies you for Sukanya Samriddhi Yojana (SSY) with tax-free returns and Section 80C benefits.`,
            ruleId: '80C'
          };
        }
        return {
          status: 'needs_info',
          message: `Children school tuition fees qualify for tax deduction under Section 80C up to two children.`
        };
      }
    }
  ];

  const toggleEvent = (id: string) => {
    setSelectedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
          LIFE EVENT CHECK
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">What changed this year?</h2>
        <p className="text-xs text-slate-600">
          Life changes can affect which tax rules are relevant to your household profile.
        </p>
      </div>

      {/* Line Icon Selection Chips (NO EMOJIS) */}
      <div className="flex flex-wrap gap-2.5">
        {lifeEvents.map((ev) => {
          const isSelected = selectedEvents.includes(ev.id);
          return (
            <button
              key={ev.id}
              onClick={() => toggleEvent(ev.id)}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-slate-500'}>{ev.icon}</span>
              <span>{ev.label}</span>
            </button>
          );
        })}
      </div>

      {/* Evaluated Life Event Results */}
      {selectedEvents.length > 0 && (
        <div className="space-y-3 pt-2">
          {selectedEvents.map((eventId) => {
            const ev = lifeEvents.find(e => e.id === eventId);
            if (!ev) return null;

            const res = ev.responseGenerator(analysis);
            return (
              <div key={eventId} className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    {ev.label}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    res.status === 'qualified' 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {res.status === 'qualified' ? 'Rule Qualified' : 'Information Review'}
                  </span>
                </div>

                <p className="text-slate-600 leading-relaxed">{res.message}</p>

                {res.ruleId && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => onExploreRule(res.ruleId!)}
                      className="text-[11px] font-semibold text-slate-900 hover:underline bg-white border border-slate-200 px-3 py-1 rounded transition-colors"
                    >
                      Review →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
