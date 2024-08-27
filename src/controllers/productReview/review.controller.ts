import { ProductReviewServices } from '../../services/productReview/review.services';

export class ReviewControllers {
  private productReviewServices: ProductReviewServices;

  constructor() {
    this.productReviewServices = new ProductReviewServices();
  }

  public approveReview = async (req: any, res: any, next: any) => {
    await this.productReviewServices.approveReview(req, res, next);
  };

  public getAllProductReview = async (req: any, res: any, next: any) => {
    await this.productReviewServices.getAllReviews(req, res, next);
  };

  public deleteReview = async (req: any, res: any, next: any) => {
    await this.productReviewServices.deleteReview(req, res, next);
  };
  public addReview = async (req: any, res: any, next: any) => {
    await this.productReviewServices.addReview(req, res, next);
  };
}
