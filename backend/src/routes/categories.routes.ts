import { Router } from 'express';
import { getCategories, postCategory, deleteCategory  } from '../controllers/categories.controller';

const router = Router();
router.get('/', getCategories);
router.post('/', postCategory);
router.delete('/:id', deleteCategory);

export default router;
