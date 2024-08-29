import { Optional } from 'sequelize';
// import { RATING } from '../utils/enum.util';

export interface VariationReviewTypes {
  ID: number;
  message: string;
  rating: number;
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
