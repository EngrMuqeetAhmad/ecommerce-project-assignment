import express from 'express';
import { SubCategoryControllers } from './subCategory.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';

export const SubCategoryRouter = express.Router();
const subCategoryControllers = new SubCategoryControllers();
SubCategoryRouter.get(
  '/protected/getAllSubCategories',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  subCategoryControllers.getAllSubCategories,
);

SubCategoryRouter.delete(
  '/protected/deleteSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  subCategoryControllers.deleteSubCategory,
);

SubCategoryRouter.put(
  '/protected/createSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  subCategoryControllers.addSubCategory,
);
