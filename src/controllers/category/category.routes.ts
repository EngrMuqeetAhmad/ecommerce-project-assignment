import express from 'express';
import { CategoryControllers } from './category.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';
import { checkBlacklist } from '../../middlewares/checkBlackListed.middleware';

export const CategoryRouter = express.Router();


CategoryRouter.get(
  '/all',

  CategoryControllers.getAllCategories,
);

CategoryRouter.get(
  '/:category',

  CategoryControllers.getAssociatedSubCategories,
);



CategoryRouter.delete(
  '/:category',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  CategoryControllers.deleteCategory,
);

CategoryRouter.put(
  '/',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  CategoryControllers.addCategory,
);
