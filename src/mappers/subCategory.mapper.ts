import { SubCategoryInput, SubCategoryOutput } from '../types';

export class SubCategoryMapper {
  public static toSubCategoryDTOInput(model: any): SubCategoryInput {
    return {
      subCategory: model.subCategory,
      category: model.category,
    };
  }

  public static toSubCategoryDTOOutput(model: any): SubCategoryOutput {
    return {
      subCategory: model.subCategory,
      category: model.category,
    };
  }
}
