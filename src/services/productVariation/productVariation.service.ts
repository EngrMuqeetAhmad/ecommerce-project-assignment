import { ProductVariation } from '../../models/productVariation.model';
import { ProductVariationInput, ProductVariationOutput } from '../../types';

export class ProductVariationServices {
  public static async getProduct(
    id: number,
  ): Promise<ProductVariationOutput | null> {
    const result: ProductVariationOutput | null =
      await ProductVariation.findOne({
        where: {
          id: id,
        },
        raw: true,
      });

    return result;
  }
  public static async getProductVariations(
    baseProductId: number,
  ): Promise<Array<ProductVariationOutput>> {
    const result: Array<ProductVariationOutput> =
      await ProductVariation.findAll({
        where: {
          productId: baseProductId,
        },
        raw: true,
      });

    return result;
  }

  public static async deleteProductVariation(id: number): Promise<number> {
    const result: number = await ProductVariation.destroy({
      where: {
        id: id,
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
