import express from 'express';
import { UserCartControllers } from './userCart.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';

export const userCartRouter = express.Router();
const userCartContrllers = new UserCartControllers();

userCartRouter.delete(
  '/protected/cart/deleteItem',
  validateToken,
  authorizeRole([Role.USER]),
  userCartContrllers.deleteFromCart,
);
userCartRouter.post(
  '/protected/cart/updateItem',
  validateToken,
  authorizeRole([Role.USER]),
  userCartContrllers.updateItem,
);

userCartRouter.get(
  '/protected/cart/getAllItems',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userCartContrllers.getWholeCart,
);

userCartRouter.put(
  '/protected/cart/addItem',
  validateToken,
  authorizeRole([Role.USER]),
  userCartContrllers.addToCart,
);
