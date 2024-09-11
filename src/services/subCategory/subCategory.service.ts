import { SubCategory } from '../../models/subCategory.model';
import { SubCategoryInput, SubCategoryOutput } from '../../types';

export class SubCategoryServices {
  public static async deleteSubCategory(subCategory: string): Promise<number> {
    const result: number = await SubCategory.destroy({
      where: {
        subCategory: subCategory,
      },
    });
    return result;
  }

  public static async addSubCategory(payload: SubCategoryInput): Promise<void> {
    await SubCategory.create(payload);
    return;
  }
}
