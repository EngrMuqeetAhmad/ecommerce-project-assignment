import express from 'express';
import { UserCartControllers } from './userCart.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';

export const userCartRouter = express.Router();
const userCartContrllers = new UserCartControllers();

userCartRouter.delete(
  '/protected/deleteCartProduct',
  validateToken,
  authorizeRole([Role.USER]),
  userCartContrllers.deleteFromCart,
);

userCartRouter.get(
  '/protected/getAllCartProducts',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userCartContrllers.getWholeCart,
);

userCartRouter.put(
  '/protected/addCartProduct',
  validateToken,
  authorizeRole([Role.USER]),
  userCartContrllers.addToCart,
);
