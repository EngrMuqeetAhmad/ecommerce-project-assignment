import { Optional } from 'sequelize';

export interface UserCartTypes {
  id: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserCartInput extends Omit<UserCartTypes, 'ID'> {}

export interface UserCartOutput extends Optional<UserCartTypes, 'deletedAt'> {}
