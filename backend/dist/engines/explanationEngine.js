"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFullTaxAnalysis = runFullTaxAnalysis;
const taxEngine_1 = require("./taxEngine");
const deductionEngine_1 = require("./deductionEngine");
const schemeEngine_1 = require("./schemeEngine");
function runFullTaxAnalysis(profile) {
    // Step 1: Evaluate Deductions
    const { deductions, totalDeductionAmount } = (0, deductionEngine_1.evaluateDeductions)(profile);
    // Step 2: Run Tax Engine using Chapter VI-A total deductions
    const taxAnalysis = (0, taxEngine_1.computeTaxAnalysis)(profile, totalDeductionAmount);
    // Step 3: Evaluate Schemes
    const schemes = (0, schemeEngine_1.evaluateSchemes)(profile);
    // Step 4: Calculate Unclaimed Tax-Saving Opportunities & Headroom
    const marginalRate = getMarginalTaxRate(taxAnalysis.oldRegime.taxableIncome);
    const unclaimedOpportunities = [];
    for (const deduction of deductions) {
        if (deduction.ruleId === '80C') {
            const unused = Math.max(0, deduction.maximumAllowed - deduction.inputValue);
            if (unused > 0) {
                const estSaving = Math.round(unused * marginalRate);
                unclaimedOpportunities.push({
                    ruleId: '80C',
                    name: 'Top Up Section 80C Investments',
                    category: 'Investments',
                    currentInput: deduction.inputValue,
                    maximumAllowed: deduction.maximumAllowed,
                    unusedHeadroom: unused,
                    estimatedTaxSaving: estSaving,
                    actionRecommendation: `Deposit ₹${unused.toLocaleString('en-IN')} more into PPF, ELSS mutual funds, or EPF to save an additional ₹${estSaving.toLocaleString('en-IN')} in tax.`
                });
            }
        }
        else if (deduction.ruleId === '80CCD_1B') {
            const unused = Math.max(0, deduction.maximumAllowed - deduction.inputValue);
            if (unused > 0) {
                const estSaving = Math.round(unused * marginalRate);
                unclaimedOpportunities.push({
                    ruleId: '80CCD(1B)',
                    name: 'Contribute to NPS Tier-I',
                    category: 'Retirement',
                    currentInput: deduction.inputValue,
                    maximumAllowed: deduction.maximumAllowed,
                    unusedHeadroom: unused,
                    estimatedTaxSaving: estSaving,
                    actionRecommendation: `Contribute ₹${unused.toLocaleString('en-IN')} to National Pension System (NPS Tier-I) to save an additional ₹${estSaving.toLocaleString('en-IN')} under exclusive 80CCD(1B) benefit.`
                });
            }
        }
        else if (deduction.ruleId === '80D') {
            const selfSenior = profile.age >= 60;
            const selfCap = selfSenior ? 50000 : 25000;
            const unusedSelf = Math.max(0, selfCap - (profile.healthInsuranceSelf || 0));
            if (unusedSelf > 0) {
                const estSaving = Math.round(unusedSelf * marginalRate);
                unclaimedOpportunities.push({
                    ruleId: '80D',
                    name: 'Medical Insurance Premium (Self & Family)',
                    category: 'Health',
                    currentInput: profile.healthInsuranceSelf || 0,
                    maximumAllowed: selfCap,
                    unusedHeadroom: unusedSelf,
                    estimatedTaxSaving: estSaving,
                    actionRecommendation: `Increase health insurance coverage for self/family by up to ₹${unusedSelf.toLocaleString('en-IN')} to save ₹${estSaving.toLocaleString('en-IN')} more in tax.`
                });
            }
            if (!profile.healthInsuranceParents) {
                const parentCap = (profile.parentsAge && profile.parentsAge >= 60) ? 50000 : 25000;
                const estSaving = Math.round(parentCap * marginalRate);
                unclaimedOpportunities.push({
                    ruleId: '80D_PARENTS',
                    name: 'Parents Medical Insurance Premium',
                    category: 'Health',
                    currentInput: 0,
                    maximumAllowed: parentCap,
                    unusedHeadroom: parentCap,
                    estimatedTaxSaving: estSaving,
                    actionRecommendation: `Pay health insurance premiums for parents (up to ₹${parentCap.toLocaleString('en-IN')}) to unlock ₹${estSaving.toLocaleString('en-IN')} in tax savings.`
                });
            }
        }
    }
    // Step 5: Summary Statements
    const summaryStatements = [];
    summaryStatements.push(`Gross Annual Income: ₹${profile.annualIncome.toLocaleString('en-IN')}. Taxable income calculated at ₹${taxAnalysis.oldRegime.taxableIncome.toLocaleString('en-IN')} under Old Regime vs ₹${taxAnalysis.newRegime.taxableIncome.toLocaleString('en-IN')} under New Regime.`);
    summaryStatements.push(`Regime Recommendation: ${taxAnalysis.recommendedRegime}. ${taxAnalysis.recommendationReason}`);
    const eligibleDeductionsCount = deductions.filter(d => d.eligible).length;
    summaryStatements.push(`Found ${eligibleDeductionsCount} applicable tax deduction opportunities totaling ₹${totalDeductionAmount.toLocaleString('en-IN')} in potential tax savings under Old Regime.`);
    const totalPotentialExtraSaving = unclaimedOpportunities.reduce((sum, o) => sum + o.estimatedTaxSaving, 0);
    if (totalPotentialExtraSaving > 0) {
        summaryStatements.push(`Actionable Tax Saving Opportunity: You have ${unclaimedOpportunities.length} unclaimed tax headroom opportunities that could save you up to an additional ₹${totalPotentialExtraSaving.toLocaleString('en-IN')} in tax.`);
    }
    const eligibleSchemes = schemes.filter(s => s.eligible);
    summaryStatements.push(`Verified eligibility for ${eligibleSchemes.length} government tax-saving and pension schemes (${eligibleSchemes.map(s => s.schemeId).join(', ')}).`);
    return {
        profile,
        taxAnalysis,
        deductions,
        unclaimedOpportunities,
        schemes,
        summaryStatements,
        isSyntheticDemoData: true,
        disclaimer: 'Veroxa provides educational guidance based on configured deterministic rules and synthetic demo data. It is NOT a certified tax authority or professional tax advisor.'
    };
}
function getMarginalTaxRate(taxableIncome) {
    if (taxableIncome > 1000000)
        return 0.312; // 30% + 4% cess
    if (taxableIncome > 500000)
        return 0.208; // 20% + 4% cess
    if (taxableIncome > 250000)
        return 0.052; // 5% + 4% cess
    return 0;
}
