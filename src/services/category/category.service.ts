import { Category } from '../../models/category.model';
import { CategoryInput, CategoryOutput } from '../../types';

export class CategoryServices {
  public static async getAllCategories(): Promise<Array<CategoryOutput>> {
    const result: Array<CategoryOutput> = await Category.findAll();

    return result;
  }

  public static async deleteCategory(category: string): Promise<void> {
    await Category.destroy({
      where: {
        category: category,
      },
    });

    return;
  }

  public static async addCategory(payload: CategoryInput): Promise<void> {
    await Category.create(payload);

    return;
  }
}
