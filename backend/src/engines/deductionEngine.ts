import { UserProfile, DeductionResult } from '../types';
import { loadDeductionRules } from '../utils/configLoader';

export function evaluateDeductions(profile: UserProfile): { deductions: DeductionResult[]; totalDeductionAmount: number } {
  const rules = loadDeductionRules();
  const deductions: DeductionResult[] = [];
  let totalDeductionAmount = 0;

  for (const rule of rules) {
    let inputValue = 0;
    let potentialDeduction = 0;
    const passedConditions: string[] = [];
    const failedConditions: string[] = [];

    if (rule.ruleId === '80C') {
      const ppf = profile.ppf || 0;
      const lifeInsurance = profile.lifeInsurance || 0;
      const elss = profile.elss || 0;
      const epf = profile.epf || 0;
      const tuitionFees = profile.tuitionFees || 0;
      const homeLoanPrincipal = profile.homeLoanPrincipal || 0;

      inputValue = ppf + lifeInsurance + elss + epf + tuitionFees + homeLoanPrincipal;

      if (inputValue > 0) {
        passedConditions.push(`Reported total eligible Section 80C investments of ₹${inputValue.toLocaleString('en-IN')}`);
      } else {
        failedConditions.push('No eligible Section 80C investments or expenses reported');
      }

      potentialDeduction = Math.min(inputValue, rule.maximumAllowed);

    } else if (rule.ruleId === '80D') {
      const selfPrem = profile.healthInsuranceSelf || 0;
      const parentPrem = profile.healthInsuranceParents || 0;
      const prevCheckup = Math.min(profile.preventiveHealthCheckup || 0, 5000);
      const selfSenior = profile.age >= 60;
      const parentSenior = profile.parentsAge ? profile.parentsAge >= 60 : false;

      const selfCap = selfSenior ? (rule.subLimits?.selfFamilySenior || 50000) : (rule.subLimits?.selfFamilyNonSenior || 25000);
      const parentCap = parentSenior ? (rule.subLimits?.parentsSenior || 50000) : (rule.subLimits?.parentsNonSenior || 25000);

      const allowedSelf = Math.min(selfPrem + prevCheckup, selfCap);
      const allowedParent = Math.min(parentPrem, parentCap);

      inputValue = selfPrem + parentPrem + (profile.preventiveHealthCheckup || 0);
      potentialDeduction = allowedSelf + allowedParent;

      if (selfPrem > 0) {
        passedConditions.push(`Self/Family health insurance: ₹${selfPrem.toLocaleString('en-IN')} (Cap: ₹${selfCap.toLocaleString('en-IN')})`);
      }
      if (prevCheckup > 0) {
        passedConditions.push(`Preventive health checkup: ₹${prevCheckup.toLocaleString('en-IN')} (Cap: ₹5,000 within 80D)`);
      }
      if (parentPrem > 0) {
        passedConditions.push(`Parents health insurance: ₹${parentPrem.toLocaleString('en-IN')} (Cap: ₹${parentCap.toLocaleString('en-IN')}${parentSenior ? ' - Senior Citizen rate' : ''})`);
      }
      if (inputValue === 0) {
        failedConditions.push('No medical insurance premium or preventive checkup expenses reported');
      }

    } else if (rule.ruleId === '80CCD_1B') {
      inputValue = profile.nps || 0;
      potentialDeduction = Math.min(inputValue, rule.maximumAllowed);

      if (inputValue > 0) {
        passedConditions.push(`Contributed ₹${inputValue.toLocaleString('en-IN')} to National Pension System (NPS Tier-I)`);
      } else {
        failedConditions.push('No voluntary NPS contribution reported');
      }

    } else if (rule.ruleId === 'SECTION_24B') {
      inputValue = profile.homeLoanInterest || 0;
      potentialDeduction = Math.min(inputValue, rule.maximumAllowed);

      if (inputValue > 0) {
        passedConditions.push(`Paid ₹${inputValue.toLocaleString('en-IN')} interest on home loan for self-occupied property`);
      } else {
        failedConditions.push('No home loan interest payments reported');
      }

    } else if (rule.ruleId === '80E') {
      inputValue = profile.educationLoanInterest || 0;
      potentialDeduction = inputValue; // 100% deductible without upper ceiling

      if (inputValue > 0) {
        passedConditions.push(`Paid ₹${inputValue.toLocaleString('en-IN')} interest on higher education loan under Section 80E (100% deductible)`);
      } else {
        failedConditions.push('No higher education loan interest reported');
      }

    } else if (rule.ruleId === '80EEB') {
      inputValue = profile.evLoanInterest || 0;
      potentialDeduction = Math.min(inputValue, rule.maximumAllowed);

      if (inputValue > 0) {
        passedConditions.push(`Paid ₹${inputValue.toLocaleString('en-IN')} interest on Electric Vehicle (EV) loan under Section 80EEB`);
      } else {
        failedConditions.push('No electric vehicle (EV) loan interest reported');
      }

    } else if (rule.ruleId === 'VEHICLE_BIZ') {
      inputValue = profile.vehicleExpenses || 0;
      const isBusiness = profile.occupation === 'self-employed' || profile.occupation === 'freelancer';

      if (isBusiness && inputValue > 0) {
        passedConditions.push(`Occupation is ${profile.occupation} — vehicle running costs & depreciation eligible under Sec 32/37`);
        potentialDeduction = Math.min(inputValue, rule.maximumAllowed);
      } else {
        if (!isBusiness) {
          failedConditions.push(`Salaried employees receive standard conveyance allowance; direct vehicle depreciation applies to business/freelance income.`);
        }
        if (inputValue === 0) {
          failedConditions.push('No business vehicle expenses or depreciation reported');
        }
        potentialDeduction = 0;
      }

    } else if (rule.ruleId === '80GG') {
      const rent = profile.rent || 0;
      const hra = profile.hraReceived || 0;
      const income = profile.annualIncome || 0;

      inputValue = rent;

      if (rent > 0 && hra === 0) {
        passedConditions.push(`Pays rent (₹${rent.toLocaleString('en-IN')}/yr) and receives ₹0 HRA from employer`);
        const option1 = Math.max(0, rent - 0.10 * income);
        const option2 = 60000;
        const option3 = 0.25 * income;
        potentialDeduction = Math.min(option1, option2, option3);
        passedConditions.push(`Calculated Section 80GG claim limit: ₹${Math.round(potentialDeduction).toLocaleString('en-IN')}`);
      } else {
        if (hra > 0) {
          failedConditions.push(`Ineligible because user receives HRA (₹${hra.toLocaleString('en-IN')}) from employer`);
        }
        if (rent === 0) {
          failedConditions.push('No rent expense reported');
        }
        potentialDeduction = 0;
      }

    } else if (rule.ruleId === '80TTA') {
      inputValue = profile.savingsInterest || 0;
      const isSenior = profile.age >= 60;

      if (!isSenior && inputValue > 0) {
        passedConditions.push(`Earned ₹${inputValue.toLocaleString('en-IN')} interest on savings bank accounts`);
        passedConditions.push(`User age (${profile.age}) is under 60 years`);
        potentialDeduction = Math.min(inputValue, rule.maximumAllowed);
      } else {
        if (isSenior) {
          failedConditions.push(`Ineligible for 80TTA because user is a senior citizen (Age ${profile.age}) — Section 80TTB applies instead`);
        }
        if (inputValue === 0) {
          failedConditions.push('No savings bank interest reported');
        }
        potentialDeduction = 0;
      }
    }

    const eligible = potentialDeduction > 0;
    if (eligible) {
      totalDeductionAmount += potentialDeduction;
    }

    let reason = '';
    if (eligible) {
      if (inputValue > potentialDeduction && rule.maximumAllowed > 0 && rule.ruleId !== '80E') {
        reason = `Your total reported expense of ₹${inputValue.toLocaleString('en-IN')} exceeds the Section ${rule.ruleId} statutory ceiling of ₹${rule.maximumAllowed.toLocaleString('en-IN')}. Allowed deduction capped at ₹${potentialDeduction.toLocaleString('en-IN')}.`;
      } else {
        reason = `Full claimed amount of ₹${inputValue.toLocaleString('en-IN')} is eligible for deduction under Section ${rule.ruleId}.`;
      }
    } else {
      reason = failedConditions.length > 0 ? failedConditions.join('. ') : 'Eligibility requirements not satisfied.';
    }

    const explanation = rule.explanationTemplate
      .replace('{inputValue}', inputValue.toLocaleString('en-IN'))
      .replace('{maximumAllowed}', rule.maximumAllowed.toLocaleString('en-IN'))
      .replace('{potentialDeduction}', potentialDeduction.toLocaleString('en-IN'));

    deductions.push({
      ruleId: rule.ruleId,
      name: rule.name,
      category: rule.category,
      applicableRegime: rule.applicableRegime,
      eligible,
      inputValue,
      maximumAllowed: rule.maximumAllowed,
      potentialDeduction: Math.round(potentialDeduction),
      passedConditions,
      failedConditions,
      reason,
      explanation,
      source: rule.source,
      effectiveYear: rule.effectiveYear
    });
  }

  return { deductions, totalDeductionAmount };
}
