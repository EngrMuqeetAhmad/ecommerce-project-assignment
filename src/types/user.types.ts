import { Optional } from 'sequelize';

export interface UserTypes {
  ID: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
  stripeID: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  cartID?: number;
  wishTableID?: number;
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SERVER = 'server',
}

export interface UserInput
  extends Optional<UserTypes, 'ID' | 'cartID' | 'wishTableID'> {}

export interface UserOutput
  extends Optional<UserTypes, 'password' | 'deletedAt' | 'cartID'> {}

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
