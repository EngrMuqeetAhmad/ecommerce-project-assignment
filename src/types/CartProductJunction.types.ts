import { Optional } from 'sequelize';

export interface CartProduct {
  ID: number;
  productID: number;
  cartID: number;
  userID: number;
  quantity: number;
}

export interface CartProductInput extends Optional<CartProduct, 'ID'> {}
export interface CartProductOuput extends Required<CartProduct> {}
