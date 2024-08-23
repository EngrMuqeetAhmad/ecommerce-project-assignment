import express from 'express';

import { addWishProduct } from './addUserWish.controller';
import { deleteWishProduct } from './deleteUserWish.controller';
import { getAllWishProducts } from './getAllWishProducts.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';
///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

export const userWishRouter = express.Router();

///
userWishRouter.post(
  '/protected/deleteWish/:productID',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await deleteWishProduct(req, res);
  },
);

userWishRouter.get(
  '/protected/getAllWishProducts',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getAllWishProducts(req, res);
  },
);

userWishRouter.put(
  '/protected/addWish/:productID',
  validateToken,
  async (req: any, res: any) => {
    await addWishProduct(req, res);
  },
);
