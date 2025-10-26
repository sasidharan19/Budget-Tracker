import { Router } from 'express';
import { getCategories, postCategory } from '../controllers/categories.controller';

const router = Router();
router.get('/', getCategories);
router.post('/', postCategory);

export default router;
