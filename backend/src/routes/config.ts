import { Router, Request, Response } from 'express';
import { loadTaxRules, loadDeductionRules, loadSchemeRules } from '../utils/configLoader';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const taxRules = loadTaxRules();
    const deductionRules = loadDeductionRules();
    const schemeRules = loadSchemeRules();

    res.json({
      taxRules,
      deductionRules,
      schemeRules
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to load configuration files', details: error.message });
  }
});

export default router;
