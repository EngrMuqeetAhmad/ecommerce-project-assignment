import { Optional } from 'sequelize';

export interface UserWishTypes {
  ID: number;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserWishInput
  extends Optional<UserWishTypes, 'ID' | 'deletedAt'> {}

export interface UserWishOutput extends Optional<UserWishTypes, 'deletedAt'> {}
