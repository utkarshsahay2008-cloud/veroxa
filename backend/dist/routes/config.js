"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configLoader_1 = require("../utils/configLoader");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    try {
        const taxRules = (0, configLoader_1.loadTaxRules)();
        const deductionRules = (0, configLoader_1.loadDeductionRules)();
        const schemeRules = (0, configLoader_1.loadSchemeRules)();
        res.json({
            taxRules,
            deductionRules,
            schemeRules
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load configuration files', details: error.message });
    }
});
exports.default = router;
