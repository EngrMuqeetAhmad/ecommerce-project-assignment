import { CategoryMapper } from '../../mappers/category.mapper';
import { Category } from '../../models/category.model';
import { CategoryInput, CategoryOutput } from '../../types';

export class CategoryServices {
  public async getAllCategories(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    try {
      let data: Array<CategoryOutput>;
      const result: Array<any> = await Category.findAll();
      data = result.map((data: any) => CategoryMapper.toCategoryDTOInput(data));
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting categories' });
      return;
    }
  }

  public async deleteCategory(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await Category.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting category' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting category' });
    }
  }

  public async addCategory(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: CategoryInput = CategoryMapper.toCategoryDTOInput(params);

    try {
      await Category.create(payload);
      res.status(200).json({ message: 'category added' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding category' });
      return;
    }
  }
}
