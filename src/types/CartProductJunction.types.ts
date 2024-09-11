import { Optional } from 'sequelize';

export interface CartProduct {
  id: number;
  productId: number;
  cartId: number;
  userId: number;
  quantity: number;
}

export interface CartProductInput extends Omit<CartProduct, 'id'> {}
export interface CartProductOuput extends Required<CartProduct> {}
