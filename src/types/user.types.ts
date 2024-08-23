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
  cart?: {
    ID: number;
    userID: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
  };
}

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserInput extends Optional<UserTypes, 'ID' | 'cart'> {}

export interface UserOutput
  extends Optional<UserTypes, 'password' | 'deletedAt' | 'cart'> {}

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
    | 'cart'
  > {}
