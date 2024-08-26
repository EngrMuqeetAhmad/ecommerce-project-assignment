import {
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
      updatedAt: new Date(`${model.updatedAt}`),
      deletedAt: undefined,
    };
  }
}
