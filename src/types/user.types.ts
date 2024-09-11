import { Optional } from 'sequelize';

export interface UserTypes {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  stripeID: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  cartId?: number;
  wishTableId?: number;
}

export interface UserInput
  extends Omit<Optional<UserTypes, 'cartId' | 'wishTableId'>, 'id'> {}

export interface UserOutput extends Omit<UserTypes, 'password' | 'deletedAt'> {}

export interface UserUpdate
  extends Omit<
    UserTypes,
    | 'ID'
    | 'password'
    | 'isVerified'
    | 'stripeID'
    | 'createdAt'
    | 'updatedAt'
    | 'deletedAt'
    | 'cartID'
    | 'wishTableID'
  > {}

export interface RequestUser {
  ID: number;
  email: string;
  role: string;
  stripeID: string;
  cartID: number;
  wishTableID: number;
}
