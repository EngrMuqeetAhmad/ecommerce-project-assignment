import { Optional } from 'sequelize';

export type VARIATION = {
  name: string;
  value: string;
};

export type DETAILS = {
  variations: Array<VARIATION>;
};

export interface ProductTypes {
  ID: number;
  baseProductID: number; //to get title, description, base price etc..
  variationID: number; //  to get additional price, stockQuantity etc...
  details: string; // it will be selected by user and added here when user perform some saving action
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ProductInput extends Optional<ProductTypes, 'ID'> {}
export interface ProductOuput extends Optional<ProductTypes, 'deletedAt'> {}
