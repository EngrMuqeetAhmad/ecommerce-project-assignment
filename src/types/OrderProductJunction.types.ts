import { Optional } from 'sequelize';

export interface OrderProductTypes {
  id: number;
  productid: number;
  orderId: number;
  userId: number;
  quantity: number;
}

export interface OrderProductInput extends Omit<OrderProductTypes, 'id'> {}
export interface OrderProductOuput extends Required<OrderProductTypes> {}
