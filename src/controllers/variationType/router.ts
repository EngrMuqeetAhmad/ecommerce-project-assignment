import express from 'express';
import { VariationTypeControllers } from './variationType.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';

export const VarationTypeRouter = express.Router();
const variationTypeController = new VariationTypeControllers();

VarationTypeRouter.get(
  '/protected/variationType/getAll',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  variationTypeController.getAllVariationTypes,
);

VarationTypeRouter.delete(
  '/protected/variationType/delete',
  validateToken,
  authorizeRole([Role.ADMIN]),
  variationTypeController.deleteVariationType,
);

VarationTypeRouter.put(
  '/protected/variationType/add',
  validateToken,
  authorizeRole([Role.ADMIN]),
  variationTypeController.addVariationType,
);
