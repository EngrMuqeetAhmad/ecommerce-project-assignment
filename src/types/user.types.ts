import { Optional } from 'sequelize';
import { Role } from '../utils/enum.util';

export interface UserTypes {
  ID: number;
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
  cartID?: number;
  wishTableID?: number;
}

export interface UserInput
  extends Optional<UserTypes, 'ID' | 'cartID' | 'wishTableID'> {}

export interface UserOutput extends Omit<UserTypes, 'password' | 'deletedAt'> {}

export interface UserUpdate
  extends Omit<
    UserTypes,
    | 'ID'
    | 'password'
    | 'role'
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
  