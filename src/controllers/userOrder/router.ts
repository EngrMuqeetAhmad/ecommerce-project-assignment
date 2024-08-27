import express from 'express';
import { UserOrderControllers } from './userOrder.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';

export const userOrderRouter = express.Router();
const userOrderControllers = new UserOrderControllers();

///

userOrderRouter.put(
  '/protected/createOrder',
  validateToken,
  authorizeRole([Role.USER]),
  userOrderControllers.createOrder,
);

userOrderRouter.post(
  '/protected/deleteOrder',
  validateToken,
  authorizeRole([Role.USER]),
  userOrderControllers.deleteOrder,
);

userOrderRouter.get(
  '/protected/getOrder',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userOrderControllers.getOrder,
);
userOrderRouter.get(
  '/protected/getAllOrders',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userOrderControllers.getAllOrders,
);
