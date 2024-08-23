import express from 'express';
import { addCategory } from './addCategory.controller';
import { deleteCategory } from './deleteCategory.controller';
import { getAllCategories } from './getAllCategory.controller';
import { getCategory } from './getCategory.controller';
import { updateCategory } from './updateCategory.controller';
import {
  authorizeRole,
  validateToken,
} from '../../../middlewares/validateToken.middleware';
import { Role } from '../../../types/userTypes';

export const categoryRouter = express.Router();

categoryRouter.put(
  '/addCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addCategory(req, res);
  },
);

categoryRouter.get(
  '/getCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getCategory(req, res);
  },
);

categoryRouter.get(
  '/getAllCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllCategories(req, res);
  },
);

categoryRouter.post(
  '/updateCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateCategory(req, res);
  },
);

categoryRouter.post(
  '/deleteCategory',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteCategory(req, res);
  },
);
