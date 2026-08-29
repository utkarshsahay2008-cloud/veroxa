"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    try {
        const dataPath = path_1.default.resolve(__dirname, '../../../data/personas.json');
        const fallbackPath = path_1.default.resolve(process.cwd(), 'data/personas.json');
        const targetPath = fs_1.default.existsSync(dataPath) ? dataPath : fallbackPath;
        const rawData = fs_1.default.readFileSync(targetPath, 'utf-8');
        const personas = JSON.parse(rawData);
        res.json(personas);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to load synthetic personas', details: error.message });
    }
});
exports.default = router;
