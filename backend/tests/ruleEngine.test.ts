import { computeTaxAnalysis } from '../src/engines/taxEngine';
import { evaluateDeductions } from '../src/engines/deductionEngine';
import { evaluateSchemes } from '../src/engines/schemeEngine';
import { UserProfile } from '../src/types';

const baseProfile: UserProfile = {
  name: 'Test User',
  age: 35,
  gender: 'Male',
  residency: 'Indian Resident',
  occupation: 'salaried',
  annualIncome: 1500000,
  rent: 240000,
  hraReceived: 180000,
  lifeInsurance: 50000,
  ppf: 70000,
  elss: 30000,
  epf: 60000,
  tuitionFees: 0,
  homeLoanPrincipal: 0,
  healthInsuranceSelf: 25000,
  healthInsuranceParents: 25000,
  parentsAge: 62,
  nps: 50000,
  homeLoanInterest: 150000,
  propertyType: 'Self-occupied',
  savingsInterest: 12000,
  hasGirlChild: false,
  girlChildAge: null,
  isTaxPayer: true
};

describe('Veroxa Deterministic Rule Engine', () => {
  describe('Tax Engine Slabs & Regime Calculations', () => {
    test('Calculates correct tax for ₹15,00,000 under Old vs New Regime', () => {
      const { deductions, totalDeductionAmount } = evaluateDeductions(baseProfile);
      const analysis = computeTaxAnalysis(baseProfile, totalDeductionAmount);

      expect(analysis.grossIncome).toBe(1500000);
      expect(analysis.oldRegime.standardDeduction).toBe(50000);
      expect(analysis.newRegime.standardDeduction).toBe(75000);
      expect(analysis.oldRegime.totalTax).toBeGreaterThan(0);
      expect(analysis.newRegime.totalTax).toBeGreaterThan(0);
    });

    test('Section 87A rebate applies for taxable income <= 5L under Old Regime', () => {
      const lowIncomeProfile: UserProfile = {
        ...baseProfile,
        annualIncome: 500000,
        occupation: 'salaried'
      };
      const analysis = computeTaxAnalysis(lowIncomeProfile, 0);
      expect(analysis.oldRegime.rebate87A).toBeGreaterThan(0);
      expect(analysis.oldRegime.totalTax).toBe(0);
    });
  });

  describe('Deduction Engine Boundaries & Capping', () => {
    test('Section 80C caps deduction at ₹1,50,000 when investments exceed limit', () => {
      const highInvestProfile: UserProfile = {
        ...baseProfile,
        ppf: 100000,
        lifeInsurance: 100000,
        elss: 0,
        epf: 0
      };
      const { deductions } = evaluateDeductions(highInvestProfile);
      const sec80C = deductions.find(d => d.ruleId === '80C');

      expect(sec80C).toBeDefined();
      expect(sec80C?.inputValue).toBe(200000);
      expect(sec80C?.potentialDeduction).toBe(150000);
      expect(sec80C?.eligible).toBe(true);
    });

    test('Section 80D allows higher limit for Senior Citizen parents (₹50,000 cap)', () => {
      const seniorParentProfile: UserProfile = {
        ...baseProfile,
        healthInsuranceSelf: 25000,
        healthInsuranceParents: 50000,
        parentsAge: 65
      };
      const { deductions } = evaluateDeductions(seniorParentProfile);
      const sec80D = deductions.find(d => d.ruleId === '80D');

      expect(sec80D?.potentialDeduction).toBe(75000);
      expect(sec80D?.passedConditions.some(c => c.includes('Senior Citizen'))).toBe(true);
    });

    test('Section 80CCD(1B) grants up to ₹50,000 for NPS', () => {
      const { deductions } = evaluateDeductions(baseProfile);
      const npsDeduction = deductions.find(d => d.ruleId === '80CCD_1B');

      expect(npsDeduction?.potentialDeduction).toBe(50000);
      expect(npsDeduction?.eligible).toBe(true);
    });
  });

  describe('Scheme Engine Eligibility', () => {
    test('Sukanya Samriddhi Yojana (SSY) eligible only when user has girl child <= 10', () => {
      const ineligibleProfile = { ...baseProfile, hasGirlChild: false };
      const eligibleProfile = { ...baseProfile, hasGirlChild: true, girlChildAge: 5 };

      const ineligRes = evaluateSchemes(ineligibleProfile);
      const eligRes = evaluateSchemes(eligibleProfile);

      expect(ineligRes.find(s => s.schemeId === 'SSY')?.eligible).toBe(false);
      expect(eligRes.find(s => s.schemeId === 'SSY')?.eligible).toBe(true);
    });

    test('Senior Citizens Savings Scheme (SCSS) requires age >= 60', () => {
      const youngRes = evaluateSchemes({ ...baseProfile, age: 35 });
      const seniorRes = evaluateSchemes({ ...baseProfile, age: 62 });

      expect(youngRes.find(s => s.schemeId === 'SCSS')?.eligible).toBe(false);
      expect(seniorRes.find(s => s.schemeId === 'SCSS')?.eligible).toBe(true);
    });
  });
});
