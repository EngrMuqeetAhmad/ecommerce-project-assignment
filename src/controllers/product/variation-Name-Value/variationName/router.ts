import express from 'express';
import { addProductVariationName } from './addVariationName.controller';
import { deleteVariationType } from './deleteVariationName.controller';
import { getAllVariationName } from './getAllVariationName.controller';
import { getVariationName } from './getVariationName.controller';
import { updateVairationName } from './updateVariationName.controller';
import { Role } from '../../../../types/userTypes';
import { authorizeRole, validateToken } from '../../../../utils/validateToken';

export const variationNameRouter = express.Router();

variationNameRouter.put(
  '/product/variation/addName',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationName(req, res);
  },
);
variationNameRouter.post(
  '/product/variation/updateName',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateVairationName(req, res);
  },
);

variationNameRouter.post(
  '/product/variation/deleteName',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteVariationType(req, res);
  },
);

variationNameRouter.get(
  '/product/variation/getName',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getVariationName(req, res);
  },
);
variationNameRouter.get(
  '/product/variation/getAllName',
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllVariationName(req, res);
  },
);

module.exports = variationNameRouter;
