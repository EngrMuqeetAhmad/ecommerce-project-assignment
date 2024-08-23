import { Optional } from 'sequelize';

export interface UserCartTypes {
  ID: number;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserCartInput
  extends Optional<UserCartTypes, 'ID' | 'deletedAt' | 'userID'> {}

export interface UserCartOutput extends Optional<UserCartTypes, 'deletedAt'> {}
