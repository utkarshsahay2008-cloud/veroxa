import fs from 'fs';
import path from 'path';

export interface TaxRulesConfig {
  version: string;
  effectiveYear: string;
  disclaimer: string;
  regimes: {
    oldRegime: {
      name: string;
      description: string;
      standardDeduction: number;
      rebate87A: { maxTaxableIncome: number; maxRebate: number };
      slabs: Array<{ min: number; max: number | null; rate: number; description: string }>;
    };
    newRegime: {
      name: string;
      description: string;
      standardDeduction: number;
      rebate87A: { maxTaxableIncome: number; maxRebate: number };
      slabs: Array<{ min: number; max: number | null; rate: number; description: string }>;
    };
  };
  healthAndEducationCess: number;
}

export interface DeductionRuleConfig {
  ruleId: string;
  name: string;
  version: string;
  applicableRegime: string;
  category: string;
  maximumAllowed: number;
  subLimits?: Record<string, number>;
  requiredInputFields: string[];
  description: string;
  source: string;
  effectiveYear: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: any;
    description: string;
  }>;
  explanationTemplate: string;
}

export interface SchemeRuleConfig {
  schemeId: string;
  schemeName: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  effectiveYear: string;
  officialSource: string;
  benefit: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: any;
    description: string;
  }>;
}

function resolveConfigPath(filename: string): string {
  const rootPath = path.resolve(__dirname, '../../../config', filename);
  if (fs.existsSync(rootPath)) return rootPath;
  const relativePath = path.resolve(__dirname, '../../config', filename);
  if (fs.existsSync(relativePath)) return relativePath;
  return path.resolve(process.cwd(), 'config', filename);
}

export function loadTaxRules(): TaxRulesConfig {
  const filePath = resolveConfigPath('tax_rules.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

export function loadDeductionRules(): DeductionRuleConfig[] {
  const filePath = resolveConfigPath('deduction_rules.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

export function loadSchemeRules(): SchemeRuleConfig[] {
  const filePath = resolveConfigPath('scheme_rules.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}
