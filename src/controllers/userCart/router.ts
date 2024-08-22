import express from 'express';

import { addUserCartProduct } from './addUserCartProduct.controller';
import { deleteCartProduct } from './deleteUserCartProduct.controller';
import { getAllCartProducts } from './getAllCartProducts.controller';
import { udpateCartProduct } from './updateUserCartProduct.controller';
import { Role } from '../../types/userTypes';
import { authorizeRole, validateToken } from '../../utils/validateToken';
///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

export const userCartRouter = express.Router();

///
userCartRouter.post(
  '/protected/deleteCartProduct/:productID',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await deleteCartProduct(req, res);
  },
);

userCartRouter.get(
  '/protected/getAllCartProducts',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getAllCartProducts(req, res);
  },
);

userCartRouter.put(
  '/protected/addCartProduct/:productID',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await addUserCartProduct(req, res);
  },
);

userCartRouter.put(
  '/protected/updateCartProduct/:productID',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await udpateCartProduct(req, res);
  },
);
