import { Optional } from 'sequelize';

export interface UserWishTypes {
  id: number;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserWishInput extends Omit<UserWishTypes, 'id'> {}

export interface UserWishOutput extends Optional<UserWishTypes, 'deletedAt'> {}
