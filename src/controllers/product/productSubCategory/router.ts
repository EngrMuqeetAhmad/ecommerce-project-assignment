import express from 'express';
import { addSubCategory } from './addSubCategory.controller';
import { deleteSubCategory } from './deleteSubCategory.controller';
import { getAllSubCategory } from './getAllSubCategory.controller';
import { getSubCategory } from './getSubCategory.controller';
import { updateSubCategory } from './updateSubCategory.controller';
import {
  authorizeRole,
  validateToken,
} from '../../../middlewares/validateToken.middleware';
import { Role } from '../../../types/userTypes';

export const subCategoryRouter = express.Router();

subCategoryRouter.put(
  '/addSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addSubCategory(req, res);
  },
);

subCategoryRouter.get(
  '/getSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getSubCategory(req, res);
  },
);

subCategoryRouter.get(
  '/getAllSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllSubCategory(req, res);
  },
);

subCategoryRouter.post(
  '/updateSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateSubCategory(req, res);
  },
);

subCategoryRouter.post(
  '/deleteSubCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteSubCategory(req, res);
  },
);
