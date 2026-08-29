import { Router, Request, Response } from 'express';
import { runFullTaxAnalysis } from '../engines/explanationEngine';
import { normalizeProfile, parseStructuredInput } from '../utils/docParser';
import { UserProfile } from '../types';

const router = Router();

router.post('/analyze', (req: Request, res: Response) => {
  try {
    const rawProfile: Partial<UserProfile> = req.body;
    if (!rawProfile || typeof rawProfile !== 'object') {
      return res.status(400).json({ error: 'Invalid profile data provided' });
    }

    const normalized = normalizeProfile(rawProfile);
    const analysis = runFullTaxAnalysis(normalized);
    res.json(analysis);
  } catch (error: any) {
    console.error('Error in /api/analyze:', error);
    res.status(500).json({ error: 'Failed to process tax analysis', details: error.message });
  }
});

router.post('/parse-doc', (req: Request, res: Response) => {
  try {
    const { documentContent, mimeType } = req.body;
    if (!documentContent || typeof documentContent !== 'string') {
      return res.status(400).json({ error: 'documentContent must be a non-empty string' });
    }

    const profile = parseStructuredInput(documentContent, mimeType);
    const analysis = runFullTaxAnalysis(profile);

    res.json({
      parsedProfile: profile,
      analysis
    });
  } catch (error: any) {
    console.error('Error in /api/parse-doc:', error);
    res.status(500).json({ error: 'Failed to parse sample document', details: error.message });
  }
});

export default router;
