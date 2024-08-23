import { SubCategoryMapper } from '../../mappers/subCategory.mapper';
import { UserWishMapper } from '../../mappers/userWish.mapper';
import { SubCategory } from '../../models/subCategory.model';
import { UserWish } from '../../models/userWish.model';
import { SubCategoryInput, SubCategoryOutput } from '../../types';

export class SubCategoryServices {
  public async getAllSubCategories(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.user;
    try {
      let data: Array<SubCategoryOutput>;
      const result: Array<any> = await SubCategory.findAll();
      data = result.map((data: any) =>
        SubCategoryMapper.toSubCategoryDTOOutput(data),
      );
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting categories' });
      return;
    }
  }

  public async deleteSubCategory(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await SubCategory.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting subCategory' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting subCategory' });
    }
  }

  public async addSubCategory(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: SubCategoryInput =
      SubCategoryMapper.toSubCategoryDTOInput(params);

    try {
      await SubCategory.create(payload);
      res.status(200).json({ message: 'subCategory added' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding subCategory' });
      return;
    }
  }
}
