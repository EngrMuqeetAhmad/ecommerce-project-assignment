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
  approved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface VariationReviewInput
  extends Optional<VariationReviewTypes, 'ID' | 'approved'> {}
export interface VariationReviewOutput
  extends Omit<VariationReviewTypes, 'deletedAt' | 'updatedAt' | 'approved'> {}

export interface VariationReviewAdminOutput
  extends Optional<VariationReviewTypes, 'deletedAt' | 'updatedAt'> {}
