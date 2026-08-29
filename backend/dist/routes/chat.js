"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const llmClient_1 = require("../utils/llmClient");
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const { message, analysisContext } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message string is required' });
        }
        if (!analysisContext || typeof analysisContext !== 'object') {
            return res.status(400).json({ error: 'Verified analysisContext object is required' });
        }
        const reply = await (0, llmClient_1.generateLLMResponse)(message, analysisContext);
        res.json({
            reply,
            isGrounded: true,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'Failed to process AI assistant query', details: error.message });
    }
});
exports.default = router;
