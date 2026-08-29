import React, { useState, useRef } from 'react';
import { ArrowRight, ArrowDown, Check, ShieldCheck, HelpCircle, FileText, User, Cpu, ChevronDown, ChevronUp, Layers, Compass } from 'lucide-react';

interface LandingPageProps {
  onTryDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onTryDemo }) => {
  const [demoWhyOpen, setDemoWhyOpen] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 py-10 sm:py-16">
      {/* 1. HERO SECTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="inline-block text-[11px] font-bold uppercase tracking-widest bg-slate-100 text-slate-700 border border-slate-200 px-3.5 py-1 rounded-full">
          VEROXA — TAX GUIDANCE FOR MIDDLE-INCOME HOUSEHOLDS
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Taxes shouldn't require <br className="hidden sm:inline" />
            a tax degree.
          </h1>

          <p className="text-lg sm:text-xl font-medium text-slate-700 max-w-2xl mx-auto">
            Understand what you can claim. <br className="hidden sm:inline" />
            See what you might be missing.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-1">
            Veroxa turns complicated tax rules into clear, personalized guidance for middle-income households and explains why each recommendation applies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Try the demo
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-sm px-6 py-3.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            See how it works
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Simplified Product Preview Card per Master Prompt Section 4 */}
        <div className="pt-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-xl mx-auto text-left shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                YOUR TAX CHECKUP
              </span>
              <span className="bg-emerald-50 text-emerald-800 font-semibold text-xs px-2.5 py-0.5 rounded">
                Old Regime appears better
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 text-xs block">Estimated Tax Payable</span>
                <span className="text-2xl font-bold text-slate-900">₹1,29,480</span>
              </div>

              <div>
                <span className="text-slate-400 text-xs block">Potential Difference</span>
                <span className="text-xl font-bold text-emerald-700">₹18,200 lower tax</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
              <span>Section 80C & Health Insurance: <strong>2 items worth checking</strong></span>
              <button onClick={onTryDemo} className="text-slate-900 font-semibold hover:underline flex items-center gap-1">
                Explore checkup <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION — THE PROBLEM */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            TAX ISN'T JUST ABOUT NUMBERS.
          </h2>
          <p className="text-sm text-slate-600">
            The difficult part is knowing what the rules mean for your household.
          </p>
        </div>

        {/* 3 Everyday Situations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SITUATION 01</span>
            <h3 className="font-bold text-slate-900 text-base">"I earn a salary."</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standard deduction applies automatically, but House Rent Allowance (HRA) and Provident Fund deductions depend on your choices.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SITUATION 02</span>
            <h3 className="font-bold text-slate-900 text-base">"I pay rent and insurance."</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Paying for your family or senior parents' health insurance opens deductions under Section 80D, but capping limits vary.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SITUATION 03</span>
            <h3 className="font-bold text-slate-900 text-base">"I invest, but I'm unsure."</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              NPS contributions offer an exclusive ₹50,000 deduction under Section 80CCD(1B), over and above Section 80C limits.
            </p>
          </div>
        </div>

        {/* Visual Transition */}
        <div className="bg-slate-900 text-white rounded-xl p-6 text-center space-y-2 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span>COMPLICATED TAX CODE</span>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="text-emerald-400 font-bold">EVERYDAY FINANCIAL DECISIONS</span>
          </div>
          <p className="text-xs text-slate-300">
            Veroxa bridges the gap between official tax law and the choices a middle-income household makes every year.
          </p>
        </div>
      </section>

      {/* 3. SECTION — WHY FINANCIAL KNOWLEDGE MATTERS */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Your money decisions don't stop at your salary.
          </h2>
          <p className="text-xs text-slate-500">
            Everyday life choices directly connect to your final tax position under configured rules.
          </p>
        </div>

        {/* Horizontal Visual Journey per Master Prompt Section 6 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">STEP 1</span>
              <span className="text-xs font-bold text-slate-900 block">SALARY</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">STEP 2</span>
              <span className="text-xs font-bold text-slate-900 block">RENT</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">STEP 3</span>
              <span className="text-xs font-bold text-slate-900 block">INSURANCE</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">STEP 4</span>
              <span className="text-xs font-bold text-slate-900 block">INVESTMENTS</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">STEP 5</span>
              <span className="text-xs font-bold text-slate-900 block">HOME LOAN</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">STEP 6</span>
              <span className="text-xs font-bold text-slate-900 block">FAMILY</span>
            </div>

            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">OUTCOME</span>
              <span className="text-xs font-bold text-emerald-900 block">TAX SAVINGS</span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 pt-6">
            Understanding these connections helps you make better financial decisions throughout the year.
          </p>
        </div>
      </section>

      {/* 4. SECTION — INTRODUCE VEROXA */}
      <section ref={howItWorksRef} className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900">Meet Veroxa.</h2>
          <p className="text-sm text-slate-600">Your tax rules, translated into plain language.</p>
        </div>

        {/* Process Visualization Composition */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 space-y-8 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">01 — UNDERSTAND</span>
              <h3 className="font-bold text-white text-base">Structured Financial Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Turns reported income, rent, insurance, and investments into a clean, normalized household profile.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">02 — CHECK</span>
              <h3 className="font-bold text-white text-base">Deterministic Rule Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verifies profile data against configured Old vs New Tax Regime slabs and statutory limits.
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">03 — EXPLAIN</span>
              <h3 className="font-bold text-white text-base">Transparent Reasoning</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explains in plain language why each recommendation appeared, backed by exact statutory evidence.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span className="font-mono">YOUR INFORMATION → CONFIGURED RULES → VEROXA → CLEAR EXPLANATION</span>
            <button onClick={onTryDemo} className="text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              Test in demo →
            </button>
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE FEATURE — DON'T LEAVE MONEY ON THE TABLE */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
            SIGNATURE FEATURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Don't leave money on the table.</h2>
          <p className="text-xs text-slate-600">Veroxa looks for opportunities you may have overlooked.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-200 px-2 py-0.5 rounded">SECTION 80D</span>
              <h3 className="font-bold text-slate-900 text-sm">Health Insurance</h3>
              <span className="text-xs text-slate-500 block">Potential Deduction</span>
              <span className="text-lg font-bold text-slate-900">₹25,000</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-200 px-2 py-0.5 rounded">SECTION 80CCD(1B)</span>
              <h3 className="font-bold text-slate-900 text-sm">NPS Contribution</h3>
              <span className="text-xs text-slate-500 block">Potential Deduction</span>
              <span className="text-lg font-bold text-slate-900">₹50,000</span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-200 px-2 py-0.5 rounded">SECTION 24(B)</span>
              <h3 className="font-bold text-slate-900 text-sm">Home Loan Interest</h3>
              <span className="text-xs text-slate-500 block">Status</span>
              <span className="text-sm font-bold text-amber-800">Worth checking</span>
            </div>
          </div>

          {/* Demonstration of [Why am I seeing this?] */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Interactive Explanation Demonstration
              </span>
              <button
                onClick={() => setDemoWhyOpen(!demoWhyOpen)}
                className="text-xs font-semibold text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1"
              >
                Why am I seeing this?
                {demoWhyOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {demoWhyOpen && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">You reported</span>
                  <span className="font-bold text-slate-900">₹25,000 family health insurance</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Configured rule</span>
                  <span className="font-bold text-slate-900">Section 80D</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-slate-800">Potentially applicable</span>
                  <span className="text-emerald-800">₹25,000</span>
                </div>
                <p className="text-slate-600 pt-2 border-t border-slate-200/60">
                  <strong>In Simple Terms:</strong> This payment may qualify for a deduction under the configured rule.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. SECTION — WE DON'T JUST GIVE YOU AN ANSWER (EXPLAINABILITY) */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Not just WHAT. <br className="hidden sm:inline" /> WHY.
          </h2>
          <p className="text-xs text-slate-500">
            Veroxa never outputs unverified black-box numbers. Every result shows its math and logic.
          </p>
        </div>

        {/* Visual Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-100 rounded-xl p-6 border border-slate-200 space-y-3 opacity-75">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">BLACK BOX ASSISTANT</span>
            <div className="text-xl font-bold text-slate-700">"Claim ₹25,000 deduction."</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Gives a single number without explaining which rule was applied, how capping was enforced, or what conditions passed.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-900 space-y-3 ring-1 ring-slate-900/10 shadow-sm">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">VEROXA EXPLAINABLE ENGINE</span>
            <div className="text-xl font-bold text-slate-900">"₹25,000 may apply because..."</div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Here's the information you provided: ₹25,000 health insurance</li>
              <li>Here's the rule we checked: Section 80D</li>
              <li>Here's the statutory threshold: ₹25,000 cap</li>
              <li>Here's why it applies: Verified self/family insurance policy</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. SECTION — MAKE TAX LESS INTIMIDATING (EDUCATION) */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tax rules are complicated. Understanding them doesn't have to be.
          </h2>
          <p className="text-xs text-slate-500">How Veroxa translates official jargon into clear human language</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">SECTION 80D</span>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Technical Code:</span>
              <p className="text-xs font-mono bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                "Deduction in respect of medical insurance premia paid for self/family."
              </p>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-emerald-800 block uppercase">Veroxa Translation:</span>
              <p className="text-xs font-medium text-slate-800 bg-emerald-50/60 p-2.5 rounded border border-emerald-200">
                "Money you spend on eligible health insurance may reduce the income considered for tax under the Old Regime."
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">TAX REGIME SELECTION</span>
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block uppercase">Technical Code:</span>
              <p className="text-xs font-mono bg-slate-50 p-2.5 rounded border border-slate-200 text-slate-700">
                "Option under sub-section (5) of section 115BAC of Income Tax Act 1961."
              </p>
            </div>

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-emerald-800 block uppercase">Veroxa Translation:</span>
              <p className="text-xs font-medium text-slate-800 bg-emerald-50/60 p-2.5 rounded border border-emerald-200">
                "Which option makes more sense for your situation based on your reported household deductions?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MIDDLE-CLASS FOCUS POSITIONING BANNER */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">PRODUCT POSITIONING</span>
          <h2 className="text-xl sm:text-3xl font-extrabold max-w-3xl mx-auto leading-tight">
            Built for people whose finances are too complicated for a simple calculator, but who don't want to become tax experts just to file correctly.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Your salary, rent, insurance, investments, and family decisions all tell part of your tax story.
          </p>
        </div>
      </section>

      {/* 9. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How Veroxa Works</h2>
          <p className="text-xs text-slate-500">Three simple steps to evaluate your household's tax position</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">STEP 1</span>
            <h3 className="font-bold text-slate-900 text-sm">Tell Veroxa about your household</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your income, rent, insurance, and investment details using simple questions.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">STEP 2</span>
            <h3 className="font-bold text-slate-900 text-sm">Veroxa checks configured rules</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your profile is evaluated deterministically against Old vs New Regime slabs and Chapter VI-A limits.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">STEP 3</span>
            <h3 className="font-bold text-slate-900 text-sm">You see what matters — and why</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Review your recommended tax regime and explore transparent, expandable explanations.
            </p>
          </div>
        </div>
      </section>

      {/* 10. PRIVACY & SAFETY SECTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center space-y-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-slate-900">
            <span>Synthetic Demo Data Only</span>
            <span>No Real Financial Data Stored</span>
            <span>Configured Tax Rules</span>
            <span>Educational Guidance</span>
          </div>

          <p className="max-w-2xl mx-auto leading-relaxed text-slate-500">
            Veroxa provides educational guidance using configured tax rules and synthetic data. It is not a certified tax authority or professional tax advisor. No real financial data is collected or stored.
          </p>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6 pt-4">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Understand your taxes before they become a problem.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            See what Veroxa finds in a sample household profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-8 py-3.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
          >
            Try the demo
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-sm px-6 py-3.5 rounded-lg transition-colors"
          >
            Explore how it works
          </button>
        </div>
      </section>
    </div>
  );
};
