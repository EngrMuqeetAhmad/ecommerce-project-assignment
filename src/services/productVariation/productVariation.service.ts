import { ProductVariation } from '../../models/productVariation.model';
import { ProductVariationInput, ProductVariationOutput } from '../../types';

export class ProductVariationServices {
  public static async getProductVariations(
    baseProductID: number,
  ): Promise<Array<ProductVariationOutput>> {
    const result: Array<ProductVariationOutput> =
      await ProductVariation.findAll({
        where: {
          productID: baseProductID,
        },
        raw: true,
      });

    return result;
  }

  public static async deleteProductVariation(id: number): Promise<number> {
    const result: number = await ProductVariation.destroy({
      where: {
        ID: id,
      },
    });

    return result;
  }

  public static async addProductVariation(
    payload: ProductVariationInput,
  ): Promise<void> {
    await ProductVariation.create(payload);

    return;
  }
}
