import { Reviews } from '../../models/review.model';
import { VariationReviewInput, VariationReviewOutput } from '../../types';

export class ProductReviewServices {
  //for admin
  public static async approveReview(id: number): Promise<void> {
    await Reviews.update(
      {
        approved: true,
      },
      {
        where: {
          ID: id,
        },
      },
    );

    return;
  }

  public static async getAllReviews(
    variationID: number,
  ): Promise<Array<VariationReviewOutput>> {
    const result: Array<VariationReviewOutput> = await Reviews.findAll({
      where: {
        variationID: variationID,
      },
      raw: true,
    });

    return result;
  }

  public static async deleteReview(id: number): Promise<number> {
    const result: number = await Reviews.destroy({
      where: {
        ID: id,
      },
    });

    return result;
  }

  public static async addReview(payload: VariationReviewInput): Promise<void> {
    await Reviews.create(payload);

    return;
  }
}
