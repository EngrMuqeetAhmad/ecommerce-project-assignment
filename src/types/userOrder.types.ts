import { Optional } from 'sequelize';
import { OrderProductTypes } from './OrderProductJunction.types';
import { ProductOuput } from './product.types';
import { STATUS } from '../utils/enum.util';

export interface UserOrderTypes {
  ID: number;
  userID: number;
  status: string;
  shippingAddressID: number;
  paymentID: string;
  totalAmount: number; // total price after tax/discount/additional/ calculations
  // couponID: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  ///
}

export interface UserOrderInput
  extends Optional<UserOrderTypes, 'ID' | 'deletedAt'> {}

export interface UserOrderOutput
  extends Omit<UserOrderTypes, 'deletedAt' | 'paymentID'> {}

export interface UserOrderAndProductOutput extends UserOrderOutput {
  products: Array<{
    price: number;
    detials: string;
    baseProductID: number;
    info: {
      quantity: number;
    };
  }>;
}
