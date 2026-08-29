import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Code, ShieldCheck, Scale, FileText } from 'lucide-react';

export const InteractiveProcessExplorer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const steps = [
    {
      id: '01',
      title: 'Structured Profile Extraction',
      subtitle: 'Understand',
      description: 'Your salary, rent, insurance, and investment details are normalized into a clean, structured financial profile.',
      previewTitle: 'Normalized User Profile Object',
      previewContent: {
        annualIncome: 1500000,
        rent: 240000,
        section80C: 170000,
        healthInsurance: 25000,
        nps: 50000,
        homeLoanInterest: 150000
      }
    },
    {
      id: '02',
      title: 'Deterministic Rule Engine',
      subtitle: 'Check',
      description: 'Configured tax rules calculate exact Old vs New Regime taxes, capping Section 80C at ₹1.5L and checking eligibility.',
      previewTitle: 'Rule Engine Execution & Capping',
      previewContent: {
        regimeComparison: 'Old Tax Regime Saves ₹18,200',
        section80CClaim: '₹1,70,000 Reported -> ₹1,50,000 Statutory Cap',
        section80DClaim: '₹25,000 Health Insurance Verified',
        taxableIncomeOld: '₹10,25,000',
        taxableIncomeNew: '₹14,25,000'
      }
    },
    {
      id: '03',
      title: 'Transparent Reasoning & Explanation',
      subtitle: 'Explain',
      description: 'Translates verified mathematical results into clear language with expandable "Why am I seeing this?" breakdowns.',
      previewTitle: 'Generated "Why?" Explanation',
      previewContent: {
        question: 'Why section 80C recommendation?',
        inputValue: '₹1,70,000 reported',
        allowedDeduction: '₹1,50,000 max limit',
        passedCondition: '✓ Eligible investments (PPF, ELSS, EPF) detected',
        legalReference: 'Income Tax Act 1961 - Section 80C'
      }
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay, steps.length]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
            INTERACTIVE PROCESS EXPLORER
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">How Veroxa Evaluates Your Taxes</h3>
          <p className="text-xs text-slate-500">Click a step below to interactively explore the process</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1 rounded-md transition-colors"
          >
            {autoPlay ? 'Pause Auto-Play' : 'Resume Auto-Play'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Step Selector */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setAutoPlay(false);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                    STEP {step.id}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                    isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.subtitle}
                  </span>
                </div>

                <h4 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </h4>

                <p className={`text-xs leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Interactive Live Screen Simulation */}
        <div className="lg:col-span-7 bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-200">{steps[activeStep].previewTitle}</span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">Step {steps[activeStep].id} / 03</span>
          </div>

          {/* Interactive Screen Content */}
          <div className="space-y-3 font-mono text-xs py-2">
            {activeStep === 0 && (
              <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-300">
                <div className="text-slate-400 text-[11px] font-sans">// Step 1: Input Normalized into Profile</div>
                <div className="text-emerald-400">const userProfile = &#123;</div>
                <div className="pl-4">grossIncome: <span className="text-amber-300">1500000</span>,</div>
                <div className="pl-4">annualRent: <span className="text-amber-300">240000</span>,</div>
                <div className="pl-4">reported80C: <span className="text-amber-300">170000</span>,</div>
                <div className="pl-4">healthInsurance: <span className="text-amber-300">25000</span>,</div>
                <div className="pl-4">npsContribution: <span className="text-amber-300">50000</span></div>
                <div className="text-emerald-400">&#125;;</div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-2.5 bg-slate-950 p-4 rounded-lg border border-slate-800 text-slate-300 font-sans">
                <div className="text-xs font-bold text-white flex justify-between border-b border-slate-800 pb-2">
                  <span>Rule Evaluation Status</span>
                  <span className="text-emerald-400 font-mono">100% Deterministic</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Old Regime Tax</span>
                    <span className="font-mono text-emerald-400">₹1,22,200</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">New Regime Tax</span>
                    <span className="font-mono text-slate-300">₹1,40,400</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Section 80C Limit</span>
                    <span className="font-mono text-amber-300">₹1,70,000 -&gt; ₹1,50,000 Cap</span>
                  </div>
                  <div className="pt-1 text-emerald-400 font-semibold text-xs">
                    ✓ Recommendation: Old Tax Regime (Saves ₹18,200)
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800 font-sans text-slate-300">
                <div className="text-xs font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>"Why am I seeing this?" Breakdown</span>
                  <span className="text-slate-400 text-[11px]">Section 80C</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 block">Calculation Math:</span>
                    <p className="text-slate-200">PPF (₹70k) + Life Insurance (₹50k) + ELSS (₹50k) = ₹1,70,000</p>
                    <p className="text-emerald-400 font-medium pt-0.5">Deduction allowed: Capped at maximum statutory limit of ₹1,50,000.</p>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Verified against Income Tax Act 1961 - Section 80C
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400 font-sans">
            <span>Click any step on the left to inspect mechanics</span>
            <button
              onClick={() => setActiveStep((activeStep + 1) % steps.length)}
              className="text-white hover:underline flex items-center gap-1 font-medium"
            >
              Next Step <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
