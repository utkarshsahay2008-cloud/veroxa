"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const analyze_1 = __importDefault(require("./routes/analyze"));
const chat_1 = __importDefault(require("./routes/chat"));
const config_1 = __importDefault(require("./routes/config"));
const personas_1 = __importDefault(require("./routes/personas"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
// Routes
app.use('/api', analyze_1.default);
app.use('/api/chat', chat_1.default);
app.use('/api/config', config_1.default);
app.use('/api/personas', personas_1.default);
// Health Check
app.get('/api/health', (req, res) => {
    const hasKey = Boolean(process.env.ASI_ONE_API_KEY || process.env.OPENAI_API_KEY || process.env.LLM_API_KEY);
    res.json({
        status: 'ok',
        service: 'Veroxa Rule Engine Backend',
        version: '1.0.0',
        llmConfigured: hasKey,
        timestamp: new Date().toISOString()
    });
});
app.listen(PORT, () => {
    console.log(`Veroxa Rule Engine Backend running on http://localhost:${PORT}`);
});
