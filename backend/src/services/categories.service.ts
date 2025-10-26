import { prisma } from '../utils/prisma.client';
import type { CategoryType } from '@prisma/client';

export async function listCategories(userId: number) {
  return prisma.category.findMany();
}

export async function createCategory(data: { name: string; type: CategoryType }) {
  return prisma.category.create({ data });
}
