import { VariationTypeValueOutput } from './variantTypeValue.types';

export interface VariationTypeTypes {
  id: number;
  variationType: string;
}

export interface VariationTypeInput extends Omit<VariationTypeTypes, 'id'> {}

export interface VariationTypeOutput extends Required<VariationTypeTypes> {}

export interface TypesAndAssociatedValues extends VariationTypeTypes {
  VariationTypeValues: Array<VariationTypeValueOutput>;
}
