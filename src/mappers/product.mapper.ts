import { ProductInput, ProductOuput } from '../types';

export class ProductMapper {
  public static toDTOInput(model: any): ProductInput {
    return {
      baseProductID: model.baseProductID,
      variationID: model.variationID,
      details: model.details.variations.map(
        (d: { name: string; value: string }) => ({
          name: d.name,
          value: d.value,
        }),
      ),
      price: model.price,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toDTOOutput(model: any): ProductOuput {
    return {
      ID: model.ID,
      baseProductID: model.baseProductID,
      variationID: model.variationID,
      details: model.details.variations.map(
        (d: { name: string; value: string }) => ({
          name: d.name,
          value: d.value,
        }),
      ),
      price: model.price,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: undefined,
    };
  }
}
