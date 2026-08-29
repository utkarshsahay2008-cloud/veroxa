import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

export const UnderstandYourTax: React.FC = () => {
  const [openTopic, setOpenTopic] = useState<number | null>(0);

  const topics = [
    {
      title: 'Why was this tax regime recommended for me?',
      summary: 'Veroxa compares your total tax payable under both Old and New Tax Regimes using your reported household deductions.',
      content: `The recommendation is calculated by comparing your final tax payable under both regimes. Under the New Tax Regime, you receive a flat ₹75,000 standard deduction but cannot claim Chapter VI-A deductions (like 80C, 80D, or home loan interest). Under the Old Tax Regime, if your total claimed deductions exceed the tax slab differences, the Old Regime results in a lower tax bill.`
    },
    {
      title: 'How was my tax calculated step-by-step?',
      summary: 'Your gross annual income is reduced by standard deduction and eligible Chapter VI-A deductions to arrive at net taxable income.',
      content: `First, your gross income is calculated from your reported annual earnings. Next, standard deduction and verified deductions (such as PPF, life insurance, health insurance, and home loan interest) are subtracted. Finally, official income tax slab rates (5%, 20%, 30%) and 4% Health & Education Cess are applied to determine your final tax payable.`
    },
    {
      title: 'What is the main difference between Old and New Tax Regimes?',
      summary: 'The New Regime features lower tax rates with fewer deductions, while the Old Regime allows extensive deductions with higher slab rates.',
      content: `The New Tax Regime was introduced with simplified lower slab rates, making it attractive for individuals with minimal investments or rent expenses. The Old Tax Regime allows extensive deductions under Section 80C (up to ₹1.5L), Section 80D (health insurance up to ₹75k), Section 24(b) (home loan interest up to ₹2L), and HRA exemption, which often benefits middle-class households with ongoing investments or loans.`
    },
    {
      title: 'What happens if some of my household information is missing?',
      summary: 'Unreported expenses or investments simply result in ₹0 deduction, which may overestimate your tax payable under the Old Regime.',
      content: `If you omit health insurance premiums, home loan interest, or retirement contributions from your profile, Veroxa treats those inputs as ₹0. This ensures calculations remain strictly grounded in verified facts. You can click "Edit profile" anytime to add missing details and see updated tax checkup results.`
    },
    {
      title: 'How does Section 80D health insurance deduction work?',
      summary: 'Allows up to ₹25,000 for self/family (₹50,000 if senior citizen) plus up to ₹25,000/₹50,000 for parents.',
      content: `Section 80D permits tax deductions for medical insurance premiums paid for yourself, your spouse, and dependent children up to ₹25,000 (or ₹50,000 if age 60+). An additional separate deduction up to ₹25,000 (or ₹50,000 if senior citizen) is available for health insurance premiums paid for your parents. Preventive health checkups up to ₹5,000 are also covered within these limits.`
    }
  ];

  const toggleTopic = (idx: number) => {
    setOpenTopic(openTopic === idx ? null : idx);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
      <div className="space-y-1 border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
          TAX EDUCATION
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-700" />
          Understand your tax
        </h2>
        <p className="text-xs text-slate-600">
          Simple, plain-language explanations of how tax rules apply to your household.
        </p>
      </div>

      <div className="space-y-3">
        {topics.map((topic, idx) => {
          const isOpen = openTopic === idx;
          return (
            <div
              key={idx}
              className={`rounded-lg border transition-all ${
                isOpen ? 'bg-slate-50 border-slate-300' : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => toggleTopic(idx)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900"
              >
                <span>{topic.title}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-2 text-xs text-slate-600 border-t border-slate-200/60 pt-3">
                  <p className="font-medium text-slate-800 bg-white p-3 rounded border border-slate-200/80">
                    {topic.summary}
                  </p>
                  <p className="leading-relaxed pt-1">
                    {topic.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
