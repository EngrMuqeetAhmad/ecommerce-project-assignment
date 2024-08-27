import { ProductVariationInput, ProductVariationOutput } from '../types';

export class ProductVariationMapper {
  public static toDTOInput(model: any): ProductVariationInput {
    return {
      productID: model.productID,
      additionPrice: model.additionPrice,
      stockQuantity: model.stockQuantity,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toDTOOutput(
    model: any,
  ): ProductVariationOutput {
    return {
      ID: model.ID,
      productID: model.productID,
      additionPrice: model.additionPrice,
      stockQuantity: model.stockQuantity,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: undefined,
    };
  }
}
