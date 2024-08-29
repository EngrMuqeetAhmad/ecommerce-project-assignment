import { Request, Response } from 'express';
import { ProductReviewServices } from '../../services/productReview/review.service';
import { VariationReviewInput, VariationReviewOutput } from '../../types';
export class ReviewControllers {
  public static async approveReview(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      await ProductReviewServices.approveReview(ID);
      res.status(200).json({ message: 'Review Approved' });
      return;
    } catch (error) {
      res.json({ error: 'Error approving review' });
      return;
    }
  }

  public static async getAllProductReview(req: Request, res: Response) {
    const { variationID } = req.params;
    let ID;
    try {
      ID = Number(variationID);
    } catch (error) {
      res.json({ error: 'Error - variationID is not a number' });
      return;
    }
    try {
      const data: Array<VariationReviewOutput> =
        await ProductReviewServices.getAllReviews(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaitons reviews' });
      return;
    }
  }

  public static async deleteReview(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const result: number = await ProductReviewServices.deleteReview(ID);
      if (result > 0) {
        res
          .status(200)
          .json({ message: 'Success deleting p variation review' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting p variatoin review' });
    }
  }
  public static async addReview(req: Request, res: Response) {
    const { message, rating, variationID } = req.body;
    const { ID } = req.body.user;
    const payload: VariationReviewInput = {
      message,
      rating,
      variationID,
      userID: ID,
      approved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };

    try {
      await ProductReviewServices.addReview(payload);
      res.status(200).json({ message: 'created product variation review' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product variation review' });
      return;
    }
  }
}
