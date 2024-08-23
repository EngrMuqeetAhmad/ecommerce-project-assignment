import { Optional } from 'sequelize';

export interface UserOrderTypes {
  ID: number;
  userID: number;
  status: string;
  shippingAddressID: number;
  paymentID: string;
  // couponID: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum STATUS {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIEVERED = 'delievered',
}

export interface UserOrderInput
  extends Optional<UserOrderTypes, 'ID' | 'deletedAt'> {}

export interface UserOrderOutput
  extends Omit<UserOrderTypes, 'deletedAt' | 'paymentID'> {}
