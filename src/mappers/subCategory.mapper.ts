import { SubCategoryInput, SubCategoryOutput } from '../types';

export class SubCategoryMapper {
  public static toSubCategoryDTOInput(model: any): SubCategoryInput {
    return {
      subCategoryName: model.category,
      category: model.subCategory,
    };
  }

  public static toSubCategoryDTOOutput(model: any): SubCategoryOutput {
    return {
      ID: model.ID,
      subCategoryName: model.category,
      category: model.subCategory,
    };
  }
}
