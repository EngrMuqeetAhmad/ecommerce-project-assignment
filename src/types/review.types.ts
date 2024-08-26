import { Optional } from 'sequelize';

export enum RATING {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export interface VariationReviewTypes {
  ID: number;
  message: string;
  rating: RATING;
  variationID: number;
  userID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface VariationReviewInput
  extends Optional<VariationReviewTypes, 'ID'> {}
export interface VariationReviewOutput
  extends Optional<VariationReviewTypes, 'deletedAt' | 'updatedAt'> {}
