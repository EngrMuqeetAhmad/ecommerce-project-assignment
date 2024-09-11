import { Op, where } from 'sequelize';
import { BaseProduct } from '../../models/baseProduct.model';
import {
  BaseProductInput,
  BaseProductOuput,
  SubCategoryAssociatedProducts,
} from '../../types';
import { Category } from '../../models/category.model';
import { SubCategory } from '../../models/subCategory.model';

export class BaseProductServices {
  public static async getBaseProductsBySubCategory(
    category: string,
    subCategory: string,
  ): Promise<SubCategoryAssociatedProducts | null> {
    const result: SubCategoryAssociatedProducts | null = await Category.findOne(
      {
        where: {
          category: {
            [Op.eq]: category,
          },
        },
        include: {
          model: SubCategory,
          attributes: ['subCategory'],
          where: {
            subCategory: {
              [Op.eq]: subCategory,
            },
          },
          include: {
            model: BaseProduct,
            attributes: {
              exclude: ['deletedAt'],
            },
          },
        },
      },
    );

    return result;
  }

  public static async getBaseProduct(
    id: number,
  ): Promise<BaseProductOuput | null> {
    const result: BaseProductOuput | null = await BaseProduct.findByPk(id, {
      raw: true,
    });

    return result;
  }

  public static async deleteBaseProduct(id: number): Promise<number> {
    const result: number = await BaseProduct.destroy({
      where: {
        ID: id,
      },
    });

    return result;
  }

  public static async addBaseProduct(payload: BaseProductInput): Promise<void> {
    await BaseProduct.create(payload);

    return;
  }
}
