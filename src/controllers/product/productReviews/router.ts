import express from 'express';
import { addProductReviewRating } from './addProductReviewRating.controller';
import { deleteProductReviewRating } from './deleteProductReviewRating.controller';
import { getAllProductReviewRating } from './getAllProductReviewRating.controller';
import { getProductReviewRating } from './getProductReviewRating.controller';
import { updateProductReviewRating } from './updateProductReviewRating.controller';
import {
  authorizeRole,
  validateToken,
} from '../../../middlewares/validateToken.middleware';
import { Role } from '../../../types/userTypes';

export const variationReviewRouter = express.Router();

variationReviewRouter.put(
  '/addProductReviewRating',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductReviewRating(req, res);
  },
);

variationReviewRouter.get(
  '/getProductReviewRating',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductReviewRating(req, res);
  },
);
variationReviewRouter.get(
  '/getAllProductReviewRatings',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductReviewRating(req, res);
  },
);

variationReviewRouter.post(
  '/updateProductReviewRating',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductReviewRating(req, res);
  },
);

variationReviewRouter.post(
  '/deleteProductReviewRating',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductReviewRating(req, res);
  },
);
