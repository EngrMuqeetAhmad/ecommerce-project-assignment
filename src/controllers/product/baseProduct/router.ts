import express from 'express';
import { addBaseProduct } from './addBaseProduct.controller';
import { deleteBaseProduct } from './deleteBaseProduct.controller';
import { getAllBaseProducts } from './getAllBaseProduct.controller';
import { getBaseProduct } from './getBaseProduct.controller';
import { updateBaseProduct } from './updateBaseProduct.controller';
import {
  authorizeRole,
  validateToken,
} from '../../../middlewares/validateToken.middleware';
import { Role } from '../../../types/userTypes';

export const baseProductRouter = express.Router();

baseProductRouter.put(
  '/addBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addBaseProduct(req, res);
  },
);

baseProductRouter.get(
  '/getBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getBaseProduct(req, res);
  },
);
baseProductRouter.get(
  '/getAllBaseProducts',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllBaseProducts(req, res);
  },
);

baseProductRouter.post(
  '/updateBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateBaseProduct(req, res);
  },
);

baseProductRouter.post(
  '/deleteBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteBaseProduct(req, res);
  },
);
