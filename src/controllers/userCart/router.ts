import express from 'express';

import { addUserCartProduct } from './addUserCartProduct.controller';
import { deleteCartProduct } from './deleteUserCartProduct.controller';
import { getAllCartProducts } from './getAllCartProducts.controller';
import { udpateCartProduct } from './updateUserCartProduct.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';
import { UserCartControllers } from './userCart.controller';

export const userCartRouter = express.Router();
const userCartContrllers = new UserCartControllers();

///
userCartRouter.delete(
  '/protected/deleteCartProduct',
  validateToken,
  authorizeRole([Role.USER]),
  userCartContrllers.delete,
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

  userCartContrllers.add,
);
