import express from 'express';
import { CategoryControllers } from './category.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';

export const CategoryRouter = express.Router();
const categoryControllers = new CategoryControllers();
CategoryRouter.get(
  '/protected/getAllCategories',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  categoryControllers.getAllCategories,
);

CategoryRouter.delete(
  '/protected/deleteCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  categoryControllers.deleteCategory,
);

CategoryRouter.put(
  '/protected/createCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  categoryControllers.addCategory,
);
