import {
  VariationTypeInput,
  VariationTypeOutput,
} from '../types/variantTypes.types';

export class VariantTypeMapper {
  public static toVariationTypeDTOInput(model: any): VariationTypeInput {
    return {
      variationType: model.variationType,
    };
  }

  public static toVariationTypeDTOOutput(model: any): VariationTypeOutput {
    return {
      variationType: model.variationType,
    };
  }
}
