import express from 'express';
import { CategoryControllers } from './category.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';

export const CategoryRouter = express.Router();

CategoryRouter.get(
  '/all',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  CategoryControllers.getAllCategories,
);

CategoryRouter.delete(
  '/:category',
  validateToken,
  authorizeRole([Role.ADMIN]),
  CategoryControllers.deleteCategory,
);

CategoryRouter.put(
  '/',
  validateToken,
  authorizeRole([Role.ADMIN]),
  CategoryControllers.addCategory,
);
