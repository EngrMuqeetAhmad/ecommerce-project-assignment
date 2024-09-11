import { VariationTypeOutput, VariationTypeTypes } from './variantTypes.types';

export interface VariationTypeValueTypes {
  id: number;
  variationTypeValue: string;
  typeId: number;
}

export interface VariationTypeValueInput
  extends Omit<VariationTypeValueTypes, 'id'> {}

export interface VariationTypeValueOutput
  extends Required<VariationTypeValueTypes> {}

export interface AssociatedVariationValues extends VariationTypeOutput {
  VariationTypeValues: Array<VariationTypeValueOutput>;
}
