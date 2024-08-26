import { Optional } from 'sequelize';

export interface VariationTypeValueTypes {
  variationTypeValue: string;
  variationType: string;
}

export interface VariationTypeValueInput extends Required<VariationTypeValueTypes> {}

export interface VariationTypeValueOutput extends Required<VariationTypeValueTypes> {}
