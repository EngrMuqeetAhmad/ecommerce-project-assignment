import { Optional } from 'sequelize';

export interface BaseProductTypes {
  ID: number;
  title: string;
  description: string;
  basePrice: number;
  subCategory: string;
  brand: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | undefined | null;
}

export interface BaseProductInput extends Optional<BaseProductTypes, 'ID'> {}
export interface BaseProductOuput
  extends Optional<BaseProductTypes, 'deletedAt'> {}
