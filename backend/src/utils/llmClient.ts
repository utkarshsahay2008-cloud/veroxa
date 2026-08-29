import OpenAI from 'openai';
import { CompleteAnalysisResponse } from '../types';

const SYSTEM_PROMPT = `You are the explanation layer of an AI tax guidance and savings education application called Veroxa.

You are NOT a certified tax authority, tax professional, or financial advisor.

Use ONLY verified tax analysis, configured rules, and tax code principles provided to you in the context.

KNOWLEDGE GROUNDING & TAX RULES REFERENCE:
1. VEHICLE TAX RULES (Section 80EEB & Business Depreciation):
   - Electric Vehicles (EV Loan Interest under Section 80EEB): Deduction up to ₹1,50,000 on interest paid for a loan taken to purchase an Electric Vehicle (EV) sanctioned between April 1, 2019 and March 31, 2023, under the Old Tax Regime.
   - Business / Freelance Vehicle Depreciation (Section 32 & 37): For self-employed individuals and freelancers, 15% annual depreciation on the vehicle's written-down value (WDV) plus running costs (fuel, insurance, driver salary, repairs) are deductible against business income.
   - Salaried Motor Car Allowance & Rule 3 Perquisite: For salaried employees, employer-reimbursed fuel/driver costs for official duties are tax-free against receipts; employer-provided cars used for mixed personal/official purposes are valued as a perquisite (₹1,800/month for engines <= 1.6L or ₹2,400/month for > 1.6L, plus ₹900/month for driver).

2. CHAPTER VI-A & HOUSING DEDUCTIONS:
   - Section 80C: Up to ₹1,50,000 for PPF, ELSS, EPF, Life Insurance, Tuition fees, Home Loan Principal.
   - Section 80D: Medical insurance premium up to ₹25,000 (Self/Family under 60) or ₹50,000 (Senior Citizen) PLUS up to ₹25,000/₹50,000 for Parents.
   - Section 80CCD(1B): Additional exclusive deduction up to ₹50,000 for voluntary NPS Tier-I.
   - Section 24(b): Home loan interest deduction up to ₹2,00,000 for self-occupied house.
   - Section 80GG: Rent paid (no HRA) deduction up to ₹60,000/year.

3. TAX REGIME COMPARISON & REBATE (FY 2024-25):
   - Old Regime: Slabs 0-2.5L (0%), 2.5L-5L (5%), 5L-10L (20%), >10L (30%). Rebate 87A up to ₹12,500 if taxable income <= ₹5,00,000.
   - New Regime (Default): Slabs 0-3L (0%), 3L-7L (5%), 7L-10L (10%), 10L-12L (15%), 12L-15L (20%), >15L (30%). Rebate 87A up to ₹25,000 if taxable income <= ₹7,00,000. Standard deduction ₹75,000.

Guidelines:
- Explain complex tax questions comprehensively and clearly.
- Include exact numbers, limits, sections, and step-by-step math from the verified analysis context.
- Distinguish between salaried vs business/freelancer treatment where applicable.
- Maintain educational guidance and disclaimers. Never request real financial data.`;

export async function generateLLMResponse(userMessage: string, context: CompleteAnalysisResponse): Promise<string> {
  const apiKey = process.env.ASI_ONE_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY;
  const baseURL = process.env.ASI_ONE_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.asi1.ai/v1';
  const model = process.env.LLM_MODEL || 'asi1-mini';

  if (!apiKey || apiKey === 'your_api_key_here' || apiKey === 'your_asi_one_api_key_here') {
    return generateDeterministicFallback(userMessage, context);
  }

  try {
    const openai = new OpenAI({ apiKey, baseURL });

    const contextSummary = JSON.stringify({
      userProfile: context.profile,
      taxAnalysis: context.taxAnalysis,
      deductions: context.deductions.map(d => ({
        ruleId: d.ruleId,
        name: d.name,
        eligible: d.eligible,
        inputValue: d.inputValue,
        maximumAllowed: d.maximumAllowed,
        potentialDeduction: d.potentialDeduction,
        reason: d.reason,
        source: d.source
      })),
      unclaimedOpportunities: context.unclaimedOpportunities,
      schemes: context.schemes.map(s => ({
        schemeId: s.schemeId,
        schemeName: s.schemeName,
        eligible: s.eligible,
        reason: s.reason,
        benefit: s.benefit
      }))
    }, null, 2);

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `VERIFIED RULE-ENGINE ANALYSIS CONTEXT:\n${contextSummary}\n\nUSER QUESTION:\n${userMessage}`
        }
      ],
      temperature: 0.2
    });

    return completion.choices[0]?.message?.content || generateDeterministicFallback(userMessage, context);
  } catch (error) {
    console.error('LLM API Call Error:', error);
    return generateDeterministicFallback(userMessage, context);
  }
}

function generateDeterministicFallback(userMessage: string, context: CompleteAnalysisResponse): string {
  const query = userMessage.toLowerCase();

  // 1. Vehicle / Car / EV / Depreciation Query
  if (query.includes('vehicle') || query.includes('car') || query.includes('ev') || query.includes('electric') || query.includes('80eeb') || query.includes('depreciation') || query.includes('transport')) {
    const evDeduction = context.deductions.find(d => d.ruleId === '80EEB');
    const bizVehicleDeduction = context.deductions.find(d => d.ruleId === 'VEHICLE_BIZ');

    let response = `### Comprehensive Vehicle & Transport Tax Breakdown:\n\n`;

    response += `**1. Electric Vehicle (EV) Loan Interest — Section 80EEB:**\n`;
    response += `• **Eligibility**: Deduct up to ₹1,50,000 on interest paid for an EV loan under the Old Tax Regime.\n`;
    if (evDeduction && evDeduction.eligible) {
      response += `• **Your Verification**: You reported ₹${evDeduction.inputValue.toLocaleString('en-IN')} EV loan interest, granting an allowed deduction of **₹${evDeduction.potentialDeduction.toLocaleString('en-IN')}**.\n\n`;
    } else {
      response += `• **Your Profile Status**: No EV loan interest reported in current profile. (If you take a loan for an Electric Vehicle, you can claim up to ₹1.5L interest deduction under Section 80EEB).\n\n`;
    }

    response += `**2. Business Vehicle Depreciation & Expenses (Section 32 & 37):**\n`;
    response += `• **Applicability**: For Self-Employed individuals and Freelancers (${context.profile.occupation.toUpperCase()}).\n`;
    response += `• **Tax Treatment**: You can claim 15% annual depreciation on the vehicle's purchase cost plus 100% of running costs (fuel, insurance, maintenance, driver salary) used for business purposes.\n`;
    if (bizVehicleDeduction && bizVehicleDeduction.eligible) {
      response += `• **Your Verification**: Allowed business vehicle deduction of **₹${bizVehicleDeduction.potentialDeduction.toLocaleString('en-IN')}**.\n\n`;
    } else if (context.profile.occupation === 'salaried') {
      response += `• **Salaried Employees Note**: Direct vehicle depreciation is not allowed for salaried staff. However, employer fuel reimbursements for official duties are tax-free against receipts, or evaluated as perquisites under Rule 3.\n\n`;
    } else {
      response += `• **Status**: No business vehicle running costs reported.\n\n`;
    }

    response += `**3. Summary Recommendation:**\n`;
    response += `Vehicle loan interest under Section 80EEB reduces taxable income directly under the Old Tax Regime. Business vehicle expenses reduce gross business profits before slab calculations.`;

    return response;
  }

  // 2. Regime Comparison Query
  if (query.includes('regime') || query.includes('old') || query.includes('new') || query.includes('better')) {
    return `### Tax Regime Comparison Breakdown:\n\n` +
      `• **Old Tax Regime Tax Payable**: ₹${context.taxAnalysis.oldRegime.totalTax.toLocaleString('en-IN')} (Net Taxable: ₹${context.taxAnalysis.oldRegime.taxableIncome.toLocaleString('en-IN')})\n` +
      `• **New Tax Regime Tax Payable**: ₹${context.taxAnalysis.newRegime.totalTax.toLocaleString('en-IN')} (Net Taxable: ₹${context.taxAnalysis.newRegime.taxableIncome.toLocaleString('en-IN')})\n\n` +
      `**Verdict**: ${context.taxAnalysis.recommendedRegime}\n` +
      `${context.taxAnalysis.recommendationReason}\n\n` +
      `*Total Chapter VI-A Deductions evaluated: ₹${context.taxAnalysis.oldRegime.totalDeductions.toLocaleString('en-IN')}.*`;
  }

  // 3. Deductions & Expenses Query
  if (query.includes('deduction') || query.includes('80c') || query.includes('80d') || query.includes('save') || query.includes('expenses')) {
    const eligibleDeductions = context.deductions.filter(d => d.eligible);
    const list = eligibleDeductions
      .map(d => `• **${d.name}**: Claimed ₹${d.inputValue.toLocaleString('en-IN')} → Allowed **₹${d.potentialDeduction.toLocaleString('en-IN')}** (${d.reason})`)
      .join('\n');

    return `### Verified Tax Deductions (Old Tax Regime):\n\n` +
      (list || 'No deductions claimed yet.') +
      `\n\nTotal Chapter VI-A Deductions: ₹${context.taxAnalysis.oldRegime.totalDeductions.toLocaleString('en-IN')}.`;
  }

  // 4. General Response
  return `### Veroxa Analysis Summary:\n\n` +
    `• **Gross Income**: ₹${context.profile.annualIncome.toLocaleString('en-IN')}\n` +
    `• **Recommended Regime**: ${context.taxAnalysis.recommendedRegime}\n` +
    `• **Estimated Tax Savings**: ₹${context.taxAnalysis.estimatedSavings.toLocaleString('en-IN')}\n` +
    `• **Eligible Deductions**: ${context.deductions.filter(d => d.eligible).length} verified\n` +
    `• **Eligible Schemes**: ${context.schemes.filter(s => s.eligible).length} verified\n\n` +
    `Ask me specific questions about Section 80EEB EV loans, vehicle depreciation, Section 80C/80D limits, or regime comparisons!`;
}
