"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTaxRules = loadTaxRules;
exports.loadDeductionRules = loadDeductionRules;
exports.loadSchemeRules = loadSchemeRules;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function resolveConfigPath(filename) {
    const rootPath = path_1.default.resolve(__dirname, '../../../config', filename);
    if (fs_1.default.existsSync(rootPath))
        return rootPath;
    const relativePath = path_1.default.resolve(__dirname, '../../config', filename);
    if (fs_1.default.existsSync(relativePath))
        return relativePath;
    return path_1.default.resolve(process.cwd(), 'config', filename);
}
function loadTaxRules() {
    const filePath = resolveConfigPath('tax_rules.json');
    const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}
function loadDeductionRules() {
    const filePath = resolveConfigPath('deduction_rules.json');
    const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}
function loadSchemeRules() {
    const filePath = resolveConfigPath('scheme_rules.json');
    const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
}
