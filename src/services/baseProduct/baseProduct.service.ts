import { Op } from 'sequelize';
import { BaseProduct } from '../../models/baseProduct.model';
import { BaseProductInput, BaseProductOuput } from '../../types';
import { Category } from '../../models/category.model';
import { SubCategory } from '../../models/subCategory.model';

export class BaseProductServices {
  public static async getBaseProductsByCategory(
    category: string,
    subCategory: string,
  ): Promise<any> {
    const result: any = await Category.findAll({
      attributes: ['category'],
      
      include: [
        {
          model: SubCategory,
          attributes: ['subCategory'],
          // where: {
          //   category: {
          //     [Op.eq]: category,
          //   },
          // },
        },
        // {
        //   model: BaseProduct,
        //   attributes: [
        //     'ID',
        //     'title',
        //     'description',
        //     'basePrice',
        //     'subCategory',
        //     'brand',
        //     'createdAt',
        //     'updatedAt',
        //   ],
        //   where: {
        //     subCategory: {
        //       [Op.eq]: subCategory,
        //     },
        //   },
        // },
      ],

      raw: true,
    });

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
