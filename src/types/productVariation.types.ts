import { Optional } from 'sequelize';

export interface ProductVariationTypes {
  id: number;
  productId: number;
  stockQuantity: number;
  additionPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductVariationInput
  extends Omit<ProductVariationTypes, 'id'> {}
export interface ProductVariationOutput
  extends Optional<ProductVariationTypes, 'deletedAt'> {}
