import { Optional } from 'sequelize';

export interface ProductVariationTypes {
  ID: number;
  productID: number;
  stockQuantity: number;
  additionPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductVariationInput
  extends Optional<ProductVariationTypes, 'ID'> {}
export interface ProductVariationOutput
  extends Optional<ProductVariationTypes, 'deletedAt'> {}
