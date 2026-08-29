"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTaxSlabs = calculateTaxSlabs;
exports.computeTaxAnalysis = computeTaxAnalysis;
const configLoader_1 = require("../utils/configLoader");
function calculateTaxSlabs(taxableIncome, slabs) {
    let remainingIncome = taxableIncome;
    let baseTax = 0;
    const breakdown = [];
    for (const slab of slabs) {
        if (taxableIncome <= slab.min) {
            breakdown.push({
                slab: slab.description,
                rate: slab.rate * 100,
                taxableInSlab: 0,
                taxAmount: 0
            });
            continue;
        }
        const slabUpper = slab.max !== null ? slab.max : taxableIncome;
        const taxableInSlab = Math.min(taxableIncome, slabUpper) - slab.min;
        if (taxableInSlab > 0) {
            const taxAmount = taxableInSlab * slab.rate;
            baseTax += taxAmount;
            breakdown.push({
                slab: slab.description,
                rate: slab.rate * 100,
                taxableInSlab: Math.round(taxableInSlab),
                taxAmount: Math.round(taxAmount)
            });
        }
        else {
            breakdown.push({
                slab: slab.description,
                rate: slab.rate * 100,
                taxableInSlab: 0,
                taxAmount: 0
            });
        }
    }
    return { baseTax: Math.round(baseTax), breakdown };
}
function computeTaxAnalysis(profile, totalChapter6ADeductions = 0) {
    const config = (0, configLoader_1.loadTaxRules)();
    const grossIncome = profile.annualIncome;
    // --- OLD TAX REGIME ---
    const oldConfig = config.regimes.oldRegime;
    const oldStandardDeduction = profile.occupation === 'salaried' ? oldConfig.standardDeduction : 0;
    const oldTotalDeductions = oldStandardDeduction + totalChapter6ADeductions;
    const oldTaxableIncome = Math.max(0, grossIncome - oldTotalDeductions);
    const { baseTax: oldBaseTax, breakdown: oldSlabBreakdown } = calculateTaxSlabs(oldTaxableIncome, oldConfig.slabs);
    let oldRebate = 0;
    if (oldTaxableIncome <= oldConfig.rebate87A.maxTaxableIncome) {
        oldRebate = Math.min(oldBaseTax, oldConfig.rebate87A.maxRebate);
    }
    const oldTaxAfterRebate = Math.max(0, oldBaseTax - oldRebate);
    const oldCess = Math.round(oldTaxAfterRebate * config.healthAndEducationCess);
    const oldTotalTax = oldTaxAfterRebate + oldCess;
    const oldResult = {
        regimeName: oldConfig.name,
        grossIncome,
        standardDeduction: oldStandardDeduction,
        totalDeductions: oldTotalDeductions,
        taxableIncome: oldTaxableIncome,
        slabBreakdown: oldSlabBreakdown,
        baseTax: oldBaseTax,
        rebate87A: oldRebate,
        taxAfterRebate: oldTaxAfterRebate,
        cess: oldCess,
        totalTax: oldTotalTax,
        effectiveTaxRate: grossIncome > 0 ? Number(((oldTotalTax / grossIncome) * 100).toFixed(2)) : 0
    };
    // --- NEW TAX REGIME ---
    const newConfig = config.regimes.newRegime;
    const newStandardDeduction = profile.occupation === 'salaried' ? newConfig.standardDeduction : 0;
    const newTotalDeductions = newStandardDeduction; // Minimal deductions in New Regime
    const newTaxableIncome = Math.max(0, grossIncome - newTotalDeductions);
    const { baseTax: newBaseTax, breakdown: newSlabBreakdown } = calculateTaxSlabs(newTaxableIncome, newConfig.slabs);
    let newRebate = 0;
    if (newTaxableIncome <= newConfig.rebate87A.maxTaxableIncome) {
        newRebate = Math.min(newBaseTax, newConfig.rebate87A.maxRebate);
    }
    const newTaxAfterRebate = Math.max(0, newBaseTax - newRebate);
    const newCess = Math.round(newTaxAfterRebate * config.healthAndEducationCess);
    const newTotalTax = newTaxAfterRebate + newCess;
    const newResult = {
        regimeName: newConfig.name,
        grossIncome,
        standardDeduction: newStandardDeduction,
        totalDeductions: newTotalDeductions,
        taxableIncome: newTaxableIncome,
        slabBreakdown: newSlabBreakdown,
        baseTax: newBaseTax,
        rebate87A: newRebate,
        taxAfterRebate: newTaxAfterRebate,
        cess: newCess,
        totalTax: newTotalTax,
        effectiveTaxRate: grossIncome > 0 ? Number(((newTotalTax / grossIncome) * 100).toFixed(2)) : 0
    };
    // --- REGIME COMPARISON ---
    let recommendedRegime;
    let estimatedSavings = Math.abs(oldTotalTax - newTotalTax);
    let recommendationReason = '';
    if (oldTotalTax < newTotalTax) {
        recommendedRegime = 'Old Tax Regime';
        recommendationReason = `The Old Tax Regime saves you ₹${estimatedSavings.toLocaleString('en-IN')} because your total deductions (₹${oldTotalDeductions.toLocaleString('en-IN')}) reduce your taxable income significantly compared to the New Regime's standard deduction (₹${newStandardDeduction.toLocaleString('en-IN')}).`;
    }
    else if (newTotalTax < oldTotalTax) {
        recommendedRegime = 'New Tax Regime (Default)';
        recommendationReason = `The New Tax Regime saves you ₹${estimatedSavings.toLocaleString('en-IN')} due to lower tax slab rates, despite claiming ₹${oldTotalDeductions.toLocaleString('en-IN')} of deductions in the Old Regime.`;
    }
    else {
        recommendedRegime = 'New Tax Regime (Default)';
        recommendationReason = `Both tax regimes result in identical tax liability of ₹${newTotalTax.toLocaleString('en-IN')}. The New Tax Regime is recommended as default due to simplified compliance.`;
    }
    return {
        grossIncome,
        oldRegime: oldResult,
        newRegime: newResult,
        recommendedRegime,
        estimatedSavings,
        recommendationReason
    };
}
