import { UserProfile, SchemeResult } from '../types';
import { loadSchemeRules } from '../utils/configLoader';

export function evaluateSchemes(profile: UserProfile): SchemeResult[] {
  const schemeRules = loadSchemeRules();
  const results: SchemeResult[] = [];

  for (const scheme of schemeRules) {
    const passedConditions: string[] = [];
    const failedConditions: string[] = [];

    for (const cond of scheme.conditions) {
      let isPassed = false;
      const val = (profile as any)[cond.field];

      if (cond.operator === '==') {
        isPassed = val === cond.value;
      } else if (cond.operator === '>=') {
        isPassed = typeof val === 'number' && val >= cond.value;
      } else if (cond.operator === '<=') {
        isPassed = typeof val === 'number' && val !== null && val <= cond.value;
      } else if (cond.operator === '>') {
        isPassed = typeof val === 'number' && val > cond.value;
      } else if (cond.operator === '<') {
        isPassed = typeof val === 'number' && val < cond.value;
      }

      if (isPassed) {
        passedConditions.push(`${cond.description} (Value: ${val})`);
      } else {
        failedConditions.push(`${cond.description} (Expected ${cond.operator} ${cond.value}, got: ${val ?? 'N/A'})`);
      }
    }

    const eligible = failedConditions.length === 0;
    let confidence: 'High' | 'Medium' | 'Low' | 'Ineligible' = 'Ineligible';

    if (eligible) {
      confidence = 'High';
    } else if (passedConditions.length > 0 && failedConditions.length === 1) {
      confidence = 'Medium';
    }

    let reason = '';
    if (eligible) {
      reason = `You meet all eligibility criteria (${passedConditions.length} condition${passedConditions.length > 1 ? 's' : ''} verified).`;
    } else {
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
