import express from 'express';
import { BaseProductControllers } from './baseProduct.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';

export const BaseProductRouter = express.Router();

const baseProductControllers = new BaseProductControllers();

BaseProductRouter.delete(
  '/protected/deleteBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN]),
  baseProductControllers.deleteBaseProduct,
);
BaseProductRouter.put(
  '/protected/createBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN]),
  baseProductControllers.addBaseProduct,
);
BaseProductRouter.get(
  '/protected/getBaseProduct',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  baseProductControllers.getBaseProduct,
);
