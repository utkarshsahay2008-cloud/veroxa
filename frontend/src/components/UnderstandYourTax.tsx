import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface UnderstandYourTaxProps {
  onAskVeroxa?: () => void;
}

export const UnderstandYourTax: React.FC<UnderstandYourTaxProps> = ({ onAskVeroxa }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Why was the Old Tax Regime recommended for my household?',
      answer: 'Veroxa compares your total tax payable under both Old and New Tax Regimes using your reported household deductions. Under the Old Regime, deductions like Section 80C (₹1.5L), Section 80D (health insurance), and Section 24(b) (home loan interest) reduce your taxable income significantly compared to the New Regime standard deduction of ₹75,000.'
    },
    {
      question: 'How was my tax calculation performed?',
      answer: 'Your gross annual income is reduced by eligible Chapter VI-A deductions and standard deductions to arrive at your net taxable income. Standard slab rates (5%, 20%, 30%) and 4% Health & Education Cess are then applied deterministically based on official Income Tax Act rules.'
    },
    {
      question: 'What is the main difference between Old and New Tax Regimes?',
      answer: 'The New Tax Regime features lower slab rates but permits no Chapter VI-A deductions (except ₹75,000 standard deduction). The Old Tax Regime has slightly higher slab rates but allows extensive deductions for home loans, medical insurance, PPF, NPS, and school tuition fees.'
    },
    {
      question: 'What happens if some of my financial information is missing?',
      answer: 'Unreported expenses or investments simply result in ₹0 deduction for those specific rules. This ensures calculations remain strictly grounded in verified facts. You can click "Edit profile" anytime to update missing details and see updated tax checkup results.'
    },
    {
      question: 'How does Section 80D medical insurance deduction work?',
      answer: 'Section 80D allows up to ₹25,000 deduction for medical insurance paid for self/family (₹50,000 if senior citizen) plus an additional ₹25,000/₹50,000 for parents. Preventive health checkups up to ₹5,000 are also covered within these statutory limits.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="space-y-8 text-center max-w-3xl mx-auto py-6">
      {/* Title & Subtitle per Image 1 */}
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 tracking-tight">
          Clear answers.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          Simple, plain-language explanations of how your taxes work under configured rules.
        </p>
      </div>

      {/* Accordion Container per Image 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm text-left divide-y divide-slate-100 overflow-hidden">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-slate-900 hover:text-slate-700 transition-colors text-left"
              >
                <span className="font-serif sm:font-sans">{faq.question}</span>
                <span className="shrink-0 p-1 text-slate-500">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs text-slate-600 leading-relaxed space-y-2 border-t border-slate-50/80 pt-3">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer link per Image 1 */}
      <div className="pt-2 text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <span>Can't find what you're looking for?</span>
        <button
          onClick={onAskVeroxa}
          className="font-semibold text-slate-900 hover:underline flex items-center gap-1"
        >
          Ask Veroxa <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
