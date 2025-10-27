import { Request, Response } from 'express';
import * as BudgetService from '../services/budgets.service';
import { prisma } from '../utils/prisma.client';

export async function setBudget(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const { month, amount } = req.body;
  if (!month || typeof amount !== 'number') return res.status(400).json({ message: 'month and amount required' });
  const b = await BudgetService.setBudget(userId, month, amount);
  res.status(200).json(b);
}

export async function getBudget(req: Request, res: Response) {
  const userId = Number(req.user?.id);
  const month = req.query.month as string;
  const b = await BudgetService.getBudgetForMonth(userId, month || currentMonth());
  res.json(b);
}

export async function summary(req: Request, res: Response) {
  try {
    const userId = Number(req.user?.id) || 1; // fallback for testing
    const month = req.query.month as string;

    const from = month
      ? new Date(`${month}-01`)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const to = new Date(from.getFullYear(), from.getMonth() + 1, 0, 23, 59, 59);

    // ✅ 1. Totals for the month
    const totals = await prisma.transaction.groupBy({
      by: ['type'],
      where: { userId, date: { gte: from, lte: to } },
      _sum: { amount: true },
    });

    const income = totals.find((t) => t.type === 'income')?._sum?.amount ?? 0;
    const expense = totals.find((t) => t.type === 'expense')?._sum?.amount ?? 0;

    // ✅ 2. Fetch budget (if set)
    const budget = await BudgetService.getBudgetForMonth(
      userId,
      `${from.getFullYear()}-${String(from.getMonth() + 1).padStart(2, '0')}`
    );

    // ✅ 3. Group expenses by category for chart
    const expensesByCategory = await prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        type: 'expense',
        date: { gte: from, lte: to },
      },
      _sum: { amount: true },
    });

    // ✅ 4. Get category names
    const categoryIds = expensesByCategory.map((e) => e.categoryId);
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
    });

    const byCategory = expensesByCategory.map((e) => ({
      categoryId: e.categoryId,
      categoryName:
        categories.find((c) => c.id === e.categoryId)?.name || 'Uncategorized',
      amount: e._sum.amount ?? 0,
    }));

    // ✅ 5. Final response
    res.json({
      income,
      expense,
      balance: income - expense,
      budget: budget?.amount ?? null,
      byCategory, // 👈 this is for D3 pie chart
    });
  } catch (error) {
    console.error('Error in summary:', error);
    res.status(500).json({ message: 'Error fetching summary' });
  }
}

function currentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}
