import express from 'express';

import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';
import { ProductImageControllers } from './productImages.controller';

export const ImagesRouter = express.Router();
const imageController = new ProductImageControllers();

ImagesRouter.get(
  '/protected/productImage/getAll',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  imageController.getAllVariationImages,
);

ImagesRouter.delete(
  '/protected/productImage/delete',
  validateToken,
  authorizeRole([Role.ADMIN]),
  imageController.deleteImage,
);

ImagesRouter.put(
  '/protected/productImage/add',
  validateToken,
  authorizeRole([Role.ADMIN]),
  imageController.addImage,
);
