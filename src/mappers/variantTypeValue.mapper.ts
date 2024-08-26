import {
  VariationTypeValueInput,
  VariationTypeValueOutput,
} from '../types/variantTypeValue.types';

export class VariantTypeValueMapper {
  public static toVariantTypeValueDTOInput(
    model: any,
  ): VariationTypeValueInput {
    return {
      variationTypeValue: model.variationTypeValue,
      variationType: model.variantType,
    };
  }

  public static toSubCategoryDTOOutput(model: any): VariationTypeValueOutput {
    return {
      variationTypeValue: model.variantTypeValue,
      variationType: model.variationType,
    };
  }
}
