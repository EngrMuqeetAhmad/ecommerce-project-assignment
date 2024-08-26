import { Optional } from 'sequelize';

export interface ProductVariationImgTypes {
  ID: number;
  path: string;
  variationID: number;
}

export interface ProductVariationImgInput
  extends Optional<ProductVariationImgTypes, 'ID'> {}
export interface ProductVariationImgOutput
  extends Required<ProductVariationImgTypes> {}
