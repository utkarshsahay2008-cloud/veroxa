export interface UserProfile {
  name?: string;
  age: number;
  gender?: 'Male' | 'Female' | 'Other';
  residency?: string;
  occupation: string; // 'salaried' | 'self-employed' | 'retired' | 'freelancer'
  annualIncome: number;
  maritalStatus?: 'Single' | 'Married';
  numberOfChildren?: number;
  supportingParents?: boolean;
  hasHomeLoan?: boolean;
  lifeEvents?: string[];
  rent: number;
  hraReceived: number;
  lifeInsurance: number;
  ppf: number;
  elss: number;
  epf: number;
  tuitionFees: number;
  homeLoanPrincipal: number;
  healthInsuranceSelf: number;
  healthInsuranceParents: number;
  parentsAge: number | null;
  preventiveHealthCheckup?: number;
  nps: number;
  homeLoanInterest: number;
  evLoanInterest?: number;
  educationLoanInterest?: number;
  vehicleExpenses?: number;
  propertyType?: string;
  savingsInterest: number;
  fdInterest?: number;
  hasGirlChild: boolean;
  girlChildAge: number | null;
  isTaxPayer?: boolean;
}

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
  description: string;
}

export interface SlabBreakdown {
  slab: string;
  rate: number;
  taxableInSlab: number;
  taxAmount: number;
}

export interface RegimeResult {
  regimeName: string;
  grossIncome: number;
  standardDeduction: number;
  totalDeductions: number;
  taxableIncome: number;
  slabBreakdown: SlabBreakdown[];
  baseTax: number;
  rebate87A: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  effectiveTaxRate: number;
}

export interface TaxAnalysis {
  grossIncome: number;
  oldRegime: RegimeResult;
  newRegime: RegimeResult;
  recommendedRegime: 'Old Tax Regime' | 'New Tax Regime (Default)';
  estimatedSavings: number;
  recommendationReason: string;
}

export interface DeductionResult {
  ruleId: string;
  name: string;
  category: string;
  applicableRegime: string;
  eligible: boolean;
  inputValue: number;
  maximumAllowed: number;
  potentialDeduction: number;
  passedConditions: string[];
  failedConditions: string[];
  reason: string;
  explanation: string;
  source: string;
  effectiveYear: string;
}

export interface SchemeResult {
  schemeId: string;
  schemeName: string;
  category: string;
  eligible: boolean;
  confidence: 'High' | 'Medium' | 'Low' | 'Ineligible';
  shortDescription: string;
  longDescription: string;
  passedConditions: string[];
  failedConditions: string[];
  reason: string;
  benefit: string;
  source: string;
  effectiveYear: string;
}

export interface UnclaimedOpportunity {
  ruleId: string;
  name: string;
  category: string;
  currentInput: number;
  maximumAllowed: number;
  unusedHeadroom: number;
  estimatedTaxSaving: number;
  actionRecommendation: string;
}

export interface CompleteAnalysisResponse {
  profile: UserProfile;
  taxAnalysis: TaxAnalysis;
  deductions: DeductionResult[];
  unclaimedOpportunities: UnclaimedOpportunity[];
  schemes: SchemeResult[];
  summaryStatements: string[];
  isSyntheticDemoData: boolean;
  disclaimer: string;
}
