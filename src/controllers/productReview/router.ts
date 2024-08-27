import express from 'express';

import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';
import { ReviewControllers } from './review.controller';

export const ReviewRouter = express.Router();
const reviewController = new ReviewControllers();

ReviewRouter.get(
  '/protected/review/approve',
  validateToken,
  authorizeRole([Role.ADMIN]),
  reviewController.approveReview,
);

ReviewRouter.get(
  '/protected/review/getAll',
  validateToken,
  authorizeRole([Role.ADMIN]),
  reviewController.getAllProductReview,
);

ReviewRouter.delete(
  '/protected/review/delete',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  reviewController.deleteReview,
);

ReviewRouter.put(
  '/protected/review/add',
  validateToken,
  authorizeRole([Role.USER]),
  reviewController.addReview,
);
