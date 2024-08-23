import { SubCategoryInput, SubCategoryOutput } from '../types';

export class SubCategoryMapper {
  public static toSubCategoryDTOInput(model: any): SubCategoryInput {
    return {
      subCategory: model.category,
    };
  }

  public static toSubCategoryDTOOutput(model: any): SubCategoryOutput {
    return {
      ID: model.ID,
      subCategory: model.category,
    };
  }
}
