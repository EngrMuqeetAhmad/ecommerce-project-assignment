import express from 'express';
import { VariationTypeValueControllers } from './variationTypeValue.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';

export const VarationTypeValueRouter = express.Router();
const variationTypeValueController = new VariationTypeValueControllers();

VarationTypeValueRouter.get(
  '/protected/variationTypeValue/getAll',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  variationTypeValueController.getAllVariationTypeValues,
);

VarationTypeValueRouter.delete(
  '/protected/variationTypeValue/delete',
  validateToken,
  authorizeRole([Role.ADMIN]),
  variationTypeValueController.deleteVariationTypeValue,
);

VarationTypeValueRouter.put(
  '/protected/variationTypeValue/add',
  validateToken,
  authorizeRole([Role.ADMIN]),
  variationTypeValueController.addVariationTypeValue,
);
