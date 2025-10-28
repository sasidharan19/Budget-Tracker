import { Request, Response } from 'express';
import * as CategoryService from '../services/categories.service';

export async function getCategories(req: Request, res: Response) {
  const categories = await CategoryService.listCategories(Number(req.user?.id));
  res.json(categories);
}

export async function postCategory(req: Request, res: Response) {
  const { name, type } = req.body;
  if (!name || !type) return res.status(400).json({ message: 'name and type required' });
  const cat = await CategoryService.createCategory({ name, type });
  res.status(201).json(cat);
}

export async function deleteCategory(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ message: 'Invalid ID' });

  const deleted = await CategoryService.deleteCategory(id);
  if (!deleted) return res.status(404).json({ message: 'Category not found' });

  res.json({ message: 'Category deleted successfully' });
}