import {
  VariationReviewAdminOutput,
  VariationReviewInput,
  VariationReviewOutput,
} from '../types/review.types';

export class ReviewMapper {
  public static toDTOInput(model: any): VariationReviewInput {
    return {
      message: model.message,
      rating: model.rating,
      variationID: model.variationID,
      userID: model.userID,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toDTOOutput(model: any): VariationReviewOutput {
    return {
      ID: model.ID,
      message: model.message,
      rating: model.rating,
      variationID: model.variationID,
      userID: model.userID,
      createdAt: new Date(`${model.createdAt}`),
    };
  }
  public static toAdminDTOOutput(model: any): VariationReviewAdminOutput {
    return {
      ID: model.ID,
      message: model.message,
      rating: model.rating,
      variationID: model.variationID,
      userID: model.userID,
      approved: model.approved,
      createdAt: new Date(`${model.createdAt}`),
    };
  }
}
