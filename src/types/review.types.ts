import { Optional } from 'sequelize';
// import { RATING } from '../utils/enum.util';

export interface VariationReviewTypes {
  id: number;
  message: string;
  rating: number;
  variationId: number;
  userId: number;
  approved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface VariationReviewInput
  extends Omit<VariationReviewTypes, 'id'> {}
export interface VariationReviewOutput
  extends Omit<VariationReviewTypes, 'deletedAt' | 'updatedAt' | 'approved'> {}

export interface VariationReviewAdminOutput
  extends Optional<VariationReviewTypes, 'deletedAt' | 'updatedAt'> {}
