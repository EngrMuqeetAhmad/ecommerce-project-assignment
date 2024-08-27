import { ReviewMapper } from '../../mappers/review.mapper';
import { Reviews } from '../../models/review.model';
import {
  VariationReviewInput,
  VariationReviewOutput,
  VariationReviewTypes,
} from '../../types';

export class ProductReviewServices {
  //for admin
  public async approveReview(req: any, res: any, next: any): Promise<void> {
    try {
      const { ID } = req.body;

      const result: any = await Reviews.update(
        {
          approved: true,
        },
        {
          where: {
            ID: ID,
          },
        },
      );

      res.status(200).json({ message: 'Review Approved' });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaiton' });
      return;
    }
  }

  public async getAllReviews(req: any, res: any, next: any): Promise<void> {
    try {
      const { variationID } = req.body;
      let data: Array<VariationReviewOutput>;
      const result: any = await Reviews.findAll({
        where: {
          variationID: variationID,
        },
      });
      data = result.map((item: VariationReviewOutput) =>
        ReviewMapper.toDTOOutput(item),
      );
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaitons reviews' });
      return;
    }
  }

  public async deleteReview(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await Reviews.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting p variation review' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting p variatoin review' });
    }
  }

  public async addReview(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: VariationReviewInput = ReviewMapper.toDTOInput(params);

    try {
      await Reviews.create(payload);
      res.status(200).json({ message: 'created product variation review' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product variation review' });
      return;
    }
  }
}
