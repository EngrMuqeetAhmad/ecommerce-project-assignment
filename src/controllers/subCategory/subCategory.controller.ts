import { Request, Response } from 'express';
import { SubCategoryServices } from '../../services/subCategory/subCategory.service';
import { SubCategoryInput, SubCategoryOutput } from '../../types';

export class SubCategoryControllers {
  public static async getAllSubCategories(req: Request, res: Response) {
    const { category } = req.params;
    try {
      const data: Array<SubCategoryOutput> =
        await SubCategoryServices.getAllSubCategories(category);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting categories' });
      return;
    }
  }

  public static async deleteSubCategory(req: Request, res: Response) {
    const { subCategory } = req.params;

    try {
      const result: number =
        await SubCategoryServices.deleteSubCategory(subCategory);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting subCategory' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting subCategory' });
    }
  }
  public static async addSubCategory(req: Request, res: Response) {
    const { subCategory, category } = req.body;

    const payload: SubCategoryInput = {
      subCategory,
      category,
    };

    try {
      await SubCategoryServices.addSubCategory(payload);
      res.status(200).json({ message: 'subCategory added' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding subCategory' });
      return;
    }
  }
}
