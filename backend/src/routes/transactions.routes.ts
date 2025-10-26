import { Router } from 'express';
import {
  listTx,
  createTx,
  getTx,
  updateTx,
  deleteTx,
} from '../controllers/transactions.controller';

const router = Router();

router.get('/', listTx);
router.post('/', createTx);
router.get('/:id', getTx);
router.put('/:id', updateTx);
router.delete('/:id', deleteTx);

export default router;
