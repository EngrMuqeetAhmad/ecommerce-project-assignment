import {
  VariationTypeInput,
  VariationTypeOutput,
} from '../types/variantTypes.types';

export class VariationTypeMapper {
  public static toDTOInput(model: any): VariationTypeInput {
    return {
      variationType: model.variationType,
    };
  }

  public static toDTOOutput(model: any): VariationTypeOutput {
    return {
      variationType: model.variationType,
    };
  }
}
