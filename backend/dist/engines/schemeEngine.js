"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateSchemes = evaluateSchemes;
const configLoader_1 = require("../utils/configLoader");
function evaluateSchemes(profile) {
    const schemeRules = (0, configLoader_1.loadSchemeRules)();
    const results = [];
    for (const scheme of schemeRules) {
        const passedConditions = [];
        const failedConditions = [];
        for (const cond of scheme.conditions) {
            let isPassed = false;
            const val = profile[cond.field];
            if (cond.operator === '==') {
                isPassed = val === cond.value;
            }
            else if (cond.operator === '>=') {
                isPassed = typeof val === 'number' && val >= cond.value;
            }
            else if (cond.operator === '<=') {
                isPassed = typeof val === 'number' && val !== null && val <= cond.value;
            }
            else if (cond.operator === '>') {
                isPassed = typeof val === 'number' && val > cond.value;
            }
            else if (cond.operator === '<') {
                isPassed = typeof val === 'number' && val < cond.value;
            }
            if (isPassed) {
                passedConditions.push(`${cond.description} (Value: ${val})`);
            }
            else {
                failedConditions.push(`${cond.description} (Expected ${cond.operator} ${cond.value}, got: ${val ?? 'N/A'})`);
            }
        }
        const eligible = failedConditions.length === 0;
        let confidence = 'Ineligible';
        if (eligible) {
            confidence = 'High';
        }
        else if (passedConditions.length > 0 && failedConditions.length === 1) {
            confidence = 'Medium';
        }
        let reason = '';
        if (eligible) {
            reason = `You meet all eligibility criteria (${passedConditions.length} condition${passedConditions.length > 1 ? 's' : ''} verified).`;
        }
        else {
            reason = `Ineligible: ${failedConditions.join('; ')}`;
        }
        results.push({
            schemeId: scheme.schemeId,
            schemeName: scheme.schemeName,
            category: scheme.category,
            eligible,
            confidence,
            shortDescription: scheme.shortDescription,
            longDescription: scheme.longDescription,
            passedConditions,
            failedConditions,
            reason,
            benefit: scheme.benefit,
            source: scheme.officialSource,
            effectiveYear: scheme.effectiveYear
        });
    }
    return results;
}
