"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const explanationEngine_1 = require("../engines/explanationEngine");
const docParser_1 = require("../utils/docParser");
const router = (0, express_1.Router)();
router.post('/analyze', (req, res) => {
    try {
        const rawProfile = req.body;
        if (!rawProfile || typeof rawProfile !== 'object') {
            return res.status(400).json({ error: 'Invalid profile data provided' });
        }
        const normalized = (0, docParser_1.normalizeProfile)(rawProfile);
        const analysis = (0, explanationEngine_1.runFullTaxAnalysis)(normalized);
        res.json(analysis);
    }
    catch (error) {
        console.error('Error in /api/analyze:', error);
        res.status(500).json({ error: 'Failed to process tax analysis', details: error.message });
    }
});
router.post('/parse-doc', (req, res) => {
    try {
        const { documentContent, mimeType } = req.body;
        if (!documentContent || typeof documentContent !== 'string') {
            return res.status(400).json({ error: 'documentContent must be a non-empty string' });
        }
        const profile = (0, docParser_1.parseStructuredInput)(documentContent, mimeType);
        const analysis = (0, explanationEngine_1.runFullTaxAnalysis)(profile);
        res.json({
            parsedProfile: profile,
            analysis
        });
    }
    catch (error) {
        console.error('Error in /api/parse-doc:', error);
        res.status(500).json({ error: 'Failed to parse sample document', details: error.message });
    }
});
exports.default = router;
