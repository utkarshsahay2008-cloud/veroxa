import { CompleteAnalysisResponse, UserProfile } from '../types';
import { computeTaxAnalysis } from './taxEngine';
import { evaluateDeductions } from './deductionEngine';
import { evaluateSchemes } from './schemeEngine';

export function runFullTaxAnalysis(profile: UserProfile): CompleteAnalysisResponse {
  // Step 1: Evaluate Deductions
  const { deductions, totalDeductionAmount } = evaluateDeductions(profile);

  // Step 2: Run Tax Engine using Chapter VI-A total deductions
  const taxAnalysis = computeTaxAnalysis(profile, totalDeductionAmount);

  // Step 3: Evaluate Schemes
  const schemes = evaluateSchemes(profile);

  // Step 4: Generate Summary Bullet Points
  const summaryStatements: string[] = [];

  summaryStatements.push(
    `Gross Annual Income: ₹${profile.annualIncome.toLocaleString('en-IN')}. Taxable income calculated at ₹${taxAnalysis.oldRegime.taxableIncome.toLocaleString('en-IN')} under Old Regime vs ₹${taxAnalysis.newRegime.taxableIncome.toLocaleString('en-IN')} under New Regime.`
  );

  summaryStatements.push(
    `Regime Recommendation: ${taxAnalysis.recommendedRegime}. ${taxAnalysis.recommendationReason}`
  );

  const eligibleDeductionsCount = deductions.filter(d => d.eligible).length;
  summaryStatements.push(
    `Found ${eligibleDeductionsCount} applicable tax deduction opportunities totaling ₹${totalDeductionAmount.toLocaleString('en-IN')} in potential tax savings under Old Regime.`
  );

  const eligibleSchemes = schemes.filter(s => s.eligible);
  summaryStatements.push(
    `Verified eligibility for ${eligibleSchemes.length} government tax-saving and pension schemes (${eligibleSchemes.map(s => s.schemeId).join(', ')}).`
  );

  return {
    profile,
    taxAnalysis,
    deductions,
    schemes,
    summaryStatements,
    isSyntheticDemoData: true,
    disclaimer: 'Veroxa provides educational guidance based on configured deterministic rules and synthetic demo data. It is NOT a certified tax authority or professional tax advisor.'
  };
}
