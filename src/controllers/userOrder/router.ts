import express from 'express';
import { addOrder } from './addOrder.controller';
import { deleteOrder } from './deleteOrder.controller';
import { getAllOrders } from './getAllOrders.controller';
import { getOrder } from './getOrder.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';

export const userOrderRouter = express.Router();

///

userOrderRouter.put(
  '/protected/addOrder',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await addOrder(req, res);
  },
);

userOrderRouter.post(
  '/protected/deleteOrder',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await deleteOrder(req, res);
  },
);

userOrderRouter.get(
  '/protected/getOrder',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getOrder(req, res);
  },
);
userOrderRouter.get(
  '/protected/getAllOrders',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getAllOrders(req, res);
  },
);
