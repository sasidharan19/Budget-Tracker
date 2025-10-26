import { prisma } from '../utils/prisma.client';
import { Prisma } from '@prisma/client';

export type TxFilter = {
  page?: number;
  limit?: number;
  categoryId?: number;
  from?: string; // yyyy-mm-dd
  to?: string;   // yyyy-mm-dd
  minAmount?: number;
  maxAmount?: number;
};

export async function createTransaction(userId: number, payload: {
  categoryId: number;
  amount: number;
  date: string;
  description?: string;
  type: 'income' | 'expense';
}) {
  return prisma.transaction.create({
    data: {
      userId,
      categoryId: payload.categoryId,
      amount: payload.amount,
      date: new Date(payload.date),
      description: payload.description,
      type: payload.type,
    },
  });
}

export async function getTransaction(id: number, userId: number) {
  return prisma.transaction.findFirst({ where: { id, userId } });
}

export async function updateTransaction(id: number, userId: number, data: Partial<Prisma.TransactionUpdateInput>) {
  return prisma.transaction.updateMany({
    where: { id, userId },
    data,
  });
}

export async function deleteTransaction(id: number, userId: number) {
  return prisma.transaction.deleteMany({ where: { id, userId } });
}

export async function listTransactions(userId: number, filter: TxFilter) {
  const page = filter.page && filter.page > 0 ? filter.page : 1;
  const limit = filter.limit && filter.limit > 0 ? filter.limit : 10;
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (filter.categoryId) where.categoryId = Number(filter.categoryId);
  if (filter.from || filter.to) {
    where.date = {};
    if (filter.from) where.date.gte = new Date(filter.from);
    if (filter.to) where.date.lte = new Date(filter.to);
  }
  if (filter.minAmount || filter.maxAmount) {
    where.amount = {};
    if (filter.minAmount) where.amount.gte = Number(filter.minAmount);
    if (filter.maxAmount) where.amount.lte = Number(filter.maxAmount);
  }

  const [data, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
      skip,
      take: limit,
      include: { category: true },
    }),
    prisma.transaction.count({ where }),
  ]);

  return {
    data,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  };
}
