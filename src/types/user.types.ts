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
}

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface UserInput extends Optional<UserTypes, 'ID'> {}

export interface UserOutput
  extends Optional<UserTypes, 'password' | 'deletedAt'> {}
