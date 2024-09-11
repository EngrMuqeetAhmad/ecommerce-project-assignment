import { Optional } from 'sequelize';
import { AssociatedSubCategory, CategoryTypes } from './category.types';

export interface BaseProductTypes {
  id: number;
  title: string;
  description: string;
  basePrice: number;
  subCategoryId: number;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | undefined | null;
}

export interface BaseProductInput extends Omit<BaseProductTypes, 'id'> {}
export interface BaseProductOuput
  extends Optional<BaseProductTypes, 'deletedAt'> {}

export interface SubCategoryAssociatedProducts extends AssociatedSubCategory {
  BaseProducts: Array<BaseProductOuput>;
}
