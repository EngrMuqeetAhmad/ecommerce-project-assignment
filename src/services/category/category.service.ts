import { Category } from '../../models/category.model';
import {
  AssociatedSubCategory,
  CategoryInput,
  CategoryOutput,
} from '../../types';
import { Op } from 'sequelize';
import { SubCategory } from '../../models/subCategory.model';

export class CategoryServices {
  public static async getAssociatedSubCategories(
    category: string,
  ): Promise<AssociatedSubCategory> {
    const result: AssociatedSubCategory = await Category.findOne({
      where: {
        category: {
          [Op.eq]: category,
        },
      },
      include: [
        {
          model: SubCategory,
        },
      ],
    });

    return result;
  }

  public static async getAllCategories(): Promise<Array<AssociatedSubCategory>> {
    const result: Array<AssociatedSubCategory> = await Category.findAll({
      include: {
        model: SubCategory,
      },
    });
    console.log(result);
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
