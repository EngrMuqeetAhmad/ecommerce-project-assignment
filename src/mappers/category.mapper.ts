import { CategoryInput, CategoryOutput } from '../types';

export class CategoryMapper {
  public static toCategoryDTOInput(model: any): CategoryInput {
    return {
      category: model.category,
    };
  }

  public static toCategoryDTOOutput(model: any): CategoryOutput {
    return {
      category: model.category,
    };
  }
}
