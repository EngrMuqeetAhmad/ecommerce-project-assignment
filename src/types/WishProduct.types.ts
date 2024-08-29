import { Optional } from 'sequelize';

export interface WishProduct {
  ID: number;
  productID: number;
  wishTableID: number;
  userID: number;
}

export interface WishProductInput extends Optional<WishProduct, 'ID'> {}
export interface WishProductOuput extends Required<WishProduct> {}
