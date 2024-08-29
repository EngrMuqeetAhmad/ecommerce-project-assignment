import express from 'express';
import { SubCategoryControllers } from './subCategory.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';

export const SubCategoryRouter = express.Router();

SubCategoryRouter.get(
  '/:category/all',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  SubCategoryControllers.getAllSubCategories,
);

SubCategoryRouter.delete(
  '/:subCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  SubCategoryControllers.deleteSubCategory,
);

SubCategoryRouter.put(
  '/',
  validateToken,
  authorizeRole([Role.ADMIN]),
  SubCategoryControllers.addSubCategory,
);
