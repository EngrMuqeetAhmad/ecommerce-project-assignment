import {
  ProductVariationImgInput,
  ProductVariationImgOutput,
} from '../types/productImages.types';

export class VariationImagesMapper {
  public static toDTOInput(model: any): ProductVariationImgInput {
    return {
      path: model.path,
      variationID: model.variationID,
    };
  }

  public static toDTOOutput(model: any): ProductVariationImgOutput {
    return {
      ID: model.ID,
      path: model.path,
      variationID: model.variationID,
    };
  }
}
