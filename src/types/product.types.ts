import { Optional } from 'sequelize';

export type VARIATION = {
  name: string;
  value: string;
};

export type DETAILS = {
  variations: Array<VARIATION>;
};

export interface ProductTypes {
  id: number;
  baseProductId: number; //to get title, description, base price etc..
  variationId: number; //  to get additional price, stockQuantity etc...
  details: string; // it will be selected by user and added here when user perform some saving action
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductInput extends Omit<ProductTypes, 'id'> {}
export interface ProductOuput extends Optional<ProductTypes, 'deletedAt'> {}
