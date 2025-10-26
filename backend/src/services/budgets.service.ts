import { prisma } from '../utils/prisma.client';

export async function setBudget(userId: number, month: string, amount: number) {
  // upsert by month + user
  return prisma.budget.upsert({
    where: { userId_month: { userId, month } },
    update: { amount },
    create: { userId, month, amount },
  });
}

export async function getBudgetForMonth(userId: number, month: string) {
  return prisma.budget.findFirst({ where: { userId, month } });
}
