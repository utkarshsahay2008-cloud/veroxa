import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const dataPath = path.resolve(__dirname, '../../../data/personas.json');
    const fallbackPath = path.resolve(process.cwd(), 'data/personas.json');
    const targetPath = fs.existsSync(dataPath) ? dataPath : fallbackPath;

    const rawData = fs.readFileSync(targetPath, 'utf-8');
    const personas = JSON.parse(rawData);
    res.json(personas);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to load synthetic personas', details: error.message });
  }
});

export default router;
