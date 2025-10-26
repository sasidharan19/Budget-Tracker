import { Router } from 'express';
import { setBudget, getBudget, summary } from '../controllers/budgets.controller';

const router = Router();
router.post('/', setBudget);
router.get('/', getBudget);
router.get('/summary', summary);

export default router;
