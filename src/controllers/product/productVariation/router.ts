import express from 'express';
import { addProductVariation } from './addProductVariation.controller';
import { deleteProductVariation } from './deleteProductVariation.controller';
import { getAllProductVariations } from './getAllProductVariations.controller';
import { getProductVariation } from './getProductVariation.controller';
import { updateProductVariation } from './updateProductVariation.controller';
import { Role } from '../../../types/userTypes';
import { authorizeRole, validateToken } from '../../../utils/validateToken';
import { addBaseProduct } from '../baseProduct/addBaseProduct.controller';

export const productVariationRouter = express.Router();

productVariationRouter.put(
  '/addProductVariation',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariation(req, res);
  },
);

productVariationRouter.get(
  '/getProductVariation',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariation(req, res);
  },
);

productVariationRouter.get(
  '/getAllProductVariations',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariations(req, res);
  },
);

productVariationRouter.post(
  '/updateProductVariation',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariation(req, res);
  },
);

productVariationRouter.post(
  '/deleteProductVariation',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariation(req, res);
  },
);
