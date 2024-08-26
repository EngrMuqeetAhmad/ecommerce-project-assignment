import { BaseProductInput, BaseProductOuput } from '../types';

export class BaseProductMapper {
  public static toBaseProductDTOInput(model: any): BaseProductInput {
    return {
      title: model.title,
      description: model.description,
      basePrice: model.basePrice,
      subCategory: model.subCategory,
      brand: model.brand,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toBaseProductDTOOutput(model: any): BaseProductOuput {
    return {
      ID: model.ID,
      title: model.title,
      description: model.description,
      basePrice: model.basePrice,
      subCategory: model.subCategory,
      brand: model.brand,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: undefined,
    };
  }
}
