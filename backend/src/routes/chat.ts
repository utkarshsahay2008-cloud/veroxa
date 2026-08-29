import { Router, Request, Response } from 'express';
import { generateLLMResponse } from '../utils/llmClient';
import { CompleteAnalysisResponse } from '../types';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { message, analysisContext } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message string is required' });
    }

    if (!analysisContext || typeof analysisContext !== 'object') {
      return res.status(400).json({ error: 'Verified analysisContext object is required' });
    }

    const reply = await generateLLMResponse(message, analysisContext as CompleteAnalysisResponse);

    res.json({
      reply,
      isGrounded: true,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to process AI assistant query', details: error.message });
  }
});

export default router;
