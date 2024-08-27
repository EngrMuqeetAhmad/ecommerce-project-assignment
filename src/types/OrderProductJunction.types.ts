import { Optional } from 'sequelize';

export interface OrderProductTypes {
  ID: number;
  productID: number;
  orderID: number;
  userID: number;
  quantity: number;
}

export interface OrderProductInput extends Optional<OrderProductTypes, 'ID'> {}
export interface OrderProductOuput extends Required<OrderProductTypes> {}
