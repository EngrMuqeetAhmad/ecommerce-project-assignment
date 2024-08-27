import express from 'express';
import PhoneInfoController from './phoneInfo.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';

export const phoneInfoRouter = express.Router();
const phoneInfoControllers = new PhoneInfoController();

phoneInfoRouter.get(
  '/getAllPhoneInfos',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  phoneInfoControllers.getAllPhoneNumber,
);

phoneInfoRouter.get(
  '/getPhoneInfo',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  phoneInfoControllers.getPhoneNumber,
);

phoneInfoRouter.post(
  '/updatePhoneInfo',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  phoneInfoControllers.updatePhoneNumber,
);

phoneInfoRouter.delete(
  '/deletePhoneInfo',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  phoneInfoControllers.deletePhoneNumber,
);

phoneInfoRouter.put(
  '/addPhoneInfo',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  phoneInfoControllers.addPhoneNumber,
);
