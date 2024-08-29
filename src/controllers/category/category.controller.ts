import { Request, Response } from 'express';
import { CategoryServices } from '../../services/category/category.service';
import { CategoryInput, CategoryOutput } from '../../types';

export class CategoryControllers {
  public static async getAllCategories(req: Request, res: Response) {
    try {
      const data: Array<CategoryOutput> =
        await CategoryServices.getAllCategories();
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting categories' });
      return;
    }
  }

  public static async deleteCategory(req: Request, res: Response) {
    const { category } = req.params;

    try {
      await CategoryServices.deleteCategory(category);
      res.status(200).json({ message: 'Success deleting category' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting category' });
    }
  }
  public static async addCategory(req: Request, res: Response) {
    const body = req.body;

    const payload: CategoryInput = {
      category: body.category,
    };

    try {
      await CategoryServices.addCategory(payload);
      res.status(200).json({ message: 'category added' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding category' });
      return;
    }
  }
}
