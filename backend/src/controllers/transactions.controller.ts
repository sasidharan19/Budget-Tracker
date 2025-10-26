import { Request, Response } from 'express';
import * as TransactionService from '../services/transactions.service';

export async function listTx(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const filter = {
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
    from: req.query.from as string,
    to: req.query.to as string,
    minAmount: req.query.minAmount ? Number(req.query.minAmount) : undefined,
    maxAmount: req.query.maxAmount ? Number(req.query.maxAmount) : undefined,
  };
  const result = await TransactionService.listTransactions(userId, filter);
  res.json(result);
}

export async function createTx(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  console.log("userId:", userId);
  console.log("req.body:", req.body);
  console.log("req.user:", req.user);
  const { categoryId, amount, date, description, type } = req.body;
  if (!categoryId || !amount || !date || !type) return res.status(400).json({ message: 'missing fields' });
  const tx = await TransactionService.createTransaction(userId, { categoryId, amount, date, description, type });
  res.status(201).json(tx);
}

export async function getTx(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const id = Number(req.params.id);
  const tx = await TransactionService.getTransaction(id, userId);
  if (!tx) return res.status(404).json({ message: 'Not found' });
  res.json(tx);
}

export async function updateTx(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const id = Number(req.params.id);
  const data = req.body;
  const result = await TransactionService.updateTransaction(id, userId, data);
  if (result.count === 0) return res.status(404).json({ message: 'Not found or no permission' });
  res.json({ updated: result.count });
}

export async function deleteTx(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const id = Number(req.params.id);
  await TransactionService.deleteTransaction(id, userId);
  res.status(204).send();
}
