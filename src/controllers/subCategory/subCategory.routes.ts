import express from 'express';
import { SubCategoryControllers } from './subCategory.controller';
import { checkBlacklist } from '../../middlewares/checkBlackListed.middleware';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';

export const SubCategoryRouter = express.Router();

SubCategoryRouter.delete(
  '/:subCategory',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  SubCategoryControllers.deleteSubCategory,
);

SubCategoryRouter.put(
  '/',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  SubCategoryControllers.addSubCategory,
);
