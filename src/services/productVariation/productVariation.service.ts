import { sequelize } from '../../config/dbConnection';
import { ProductVariationDetails } from '../../models/junctionModels/ProductVariationDetails.model';
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
    baseProductId: any,
  ): Promise<Array<ProductVariationOutput>> {
    const result: Array<ProductVariationOutput> =
      await ProductVariation.findAll(
      //   {
      //   where: {
      //     productId: baseProductId,
      //   },
      //   // raw: true,
      // }
    );
    console.log(result);
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
    const transaction = await sequelize.transaction();

    try {
      const productVariation = await ProductVariation.create(
        {
          productId: payload.productId,
          stockQuantity: payload.stockQuantity,
          additionPrice: payload.additionPrice,
          createdAt: payload.createdAt,
          updatedAt: payload.updatedAt,
          deletedAt: payload.deletedAt,
        },
        { transaction },
      );
      payload.variationTypeValueIds.forEach(async (id: number) => {
        await ProductVariationDetails.create(
          {
            typeValueId: id,
            variationId: productVariation.id,
          },
          // { transaction },
        );
      });

      await transaction.commit();

      console.log(
        'Product Variation associated with existing VariationTypeValues successfully',
      );
      return;
    } catch (error) {
      await transaction.rollback();
      console.error(
        'Error associating Product Variation with VariationTypeValues:',
        error,
      );
      return;
    }
  }
}
