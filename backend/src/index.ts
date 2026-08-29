import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import analyzeRouter from './routes/analyze';
import chatRouter from './routes/chat';
import configRouter from './routes/config';
import personasRouter from './routes/personas';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', analyzeRouter);
app.use('/api/chat', chatRouter);
app.use('/api/config', configRouter);
app.use('/api/personas', personasRouter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
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
