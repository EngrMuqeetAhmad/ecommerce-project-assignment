import {
  VariationTypeValueInput,
  VariationTypeValueOutput,
} from '../types/variantTypeValue.types';

export class VariationTypeValueMapper {
  public static toDTOInput(model: any): VariationTypeValueInput {
    return {
      variationTypeValue: model.variationTypeValue,
      variationType: model.variantType,
    };
  }

  public static toDTOOutput(model: any): VariationTypeValueOutput {
    return {
      variationTypeValue: model.variantTypeValue,
      variationType: model.variationType,
    };
  }
}
