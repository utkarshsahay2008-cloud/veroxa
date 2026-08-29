"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStructuredInput = parseStructuredInput;
exports.normalizeProfile = normalizeProfile;
function parseStructuredInput(rawContent, mimeType) {
    const defaultProfile = {
        name: 'Sample User',
        age: 30,
        gender: 'Male',
        residency: 'Indian Resident',
        occupation: 'salaried',
        annualIncome: 1000000,
        rent: 0,
        hraReceived: 0,
        lifeInsurance: 0,
        ppf: 0,
        elss: 0,
        epf: 0,
        tuitionFees: 0,
        homeLoanPrincipal: 0,
        healthInsuranceSelf: 0,
        healthInsuranceParents: 0,
        parentsAge: null,
        nps: 0,
        homeLoanInterest: 0,
        propertyType: 'None',
        savingsInterest: 0,
        hasGirlChild: false,
        girlChildAge: null,
        isTaxPayer: true
    };
    const trimmed = rawContent.trim();
    // 1. Try parsing JSON
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        try {
            const parsed = JSON.parse(trimmed);
            return normalizeProfile({ ...defaultProfile, ...parsed });
        }
        catch (e) {
            // Fall through to key-value or CSV parsing
        }
    }
    // 2. Key-value or text parsing (e.g. "Annual Income: 1500000\nAge: 35...")
    const lines = trimmed.split('\n');
    const extracted = {};
    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        const equalsIndex = line.indexOf('=');
        const separatorIndex = colonIndex !== -1 ? colonIndex : equalsIndex;
        if (separatorIndex !== -1) {
            const key = line.substring(0, separatorIndex).trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            const valStr = line.substring(separatorIndex + 1).trim().replace(/,/g, '').replace(/₹/g, '');
            const valNum = parseFloat(valStr);
            if (key.includes('income') || key.includes('salary') || key.includes('annualincome')) {
                extracted.annualIncome = isNaN(valNum) ? defaultProfile.annualIncome : valNum;
            }
            else if (key.includes('age')) {
                extracted.age = isNaN(valNum) ? defaultProfile.age : valNum;
            }
            else if (key.includes('rent')) {
                extracted.rent = isNaN(valNum) ? 0 : valNum;
            }
            else if (key.includes('ppf')) {
                extracted.ppf = isNaN(valNum) ? 0 : valNum;
            }
            else if (key.includes('lifeinsurance') || key.includes('insurance')) {
                extracted.lifeInsurance = isNaN(valNum) ? 0 : valNum;
            }
            else if (key.includes('health') || key.includes('medical')) {
                extracted.healthInsuranceSelf = isNaN(valNum) ? 0 : valNum;
            }
            else if (key.includes('nps')) {
                extracted.nps = isNaN(valNum) ? 0 : valNum;
            }
            else if (key.includes('homeloan') || key.includes('interest')) {
                extracted.homeLoanInterest = isNaN(valNum) ? 0 : valNum;
            }
            else if (key.includes('name')) {
                extracted.name = valStr;
            }
        }
    }
    return normalizeProfile({ ...defaultProfile, ...extracted });
}
function normalizeProfile(raw) {
    return {
        name: raw.name || 'Sample User',
        age: Number(raw.age) || 30,
        gender: raw.gender || 'Male',
        residency: raw.residency || 'Indian Resident',
        occupation: raw.occupation || 'salaried',
        annualIncome: Number(raw.annualIncome) || 0,
        rent: Number(raw.rent) || 0,
        hraReceived: Number(raw.hraReceived) || 0,
        lifeInsurance: Number(raw.lifeInsurance) || 0,
        ppf: Number(raw.ppf) || 0,
        elss: Number(raw.elss) || 0,
        epf: Number(raw.epf) || 0,
        tuitionFees: Number(raw.tuitionFees) || 0,
        homeLoanPrincipal: Number(raw.homeLoanPrincipal) || 0,
        healthInsuranceSelf: Number(raw.healthInsuranceSelf) || 0,
        healthInsuranceParents: Number(raw.healthInsuranceParents) || 0,
        parentsAge: raw.parentsAge ? Number(raw.parentsAge) : null,
        nps: Number(raw.nps) || 0,
        homeLoanInterest: Number(raw.homeLoanInterest) || 0,
        propertyType: raw.propertyType || 'None',
        savingsInterest: Number(raw.savingsInterest) || 0,
        hasGirlChild: Boolean(raw.hasGirlChild),
        girlChildAge: raw.girlChildAge ? Number(raw.girlChildAge) : null,
        isTaxPayer: raw.isTaxPayer !== undefined ? Boolean(raw.isTaxPayer) : true
    };
}
