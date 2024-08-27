import express from 'express';

import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';
import { ProductVariationControllers } from './productVariation.controller';

export const ProductVariationRoutere = express.Router();
const productVariationController = new ProductVariationControllers();

ProductVariationRoutere.get(
  '/protected/productVariation/get',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  productVariationController.getProductVariation,
);

ProductVariationRoutere.get(
  '/protected/productVariation/getAll',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  productVariationController.getAllProductVariations,
);

ProductVariationRoutere.delete(
  '/protected/productVariation/delete',
  validateToken,
  authorizeRole([Role.ADMIN]),
  productVariationController.deleteProductVariation,
);

ProductVariationRoutere.put(
  '/protected/productVariation/add',
  validateToken,
  authorizeRole([Role.ADMIN]),
  productVariationController.addProductVariation,
);
