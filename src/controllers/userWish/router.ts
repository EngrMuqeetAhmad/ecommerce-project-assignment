import express from 'express';

import { UserWishControllers } from './userWish.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';
///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

export const userWishRouter = express.Router();
const userWishControllers = new UserWishControllers();
///
userWishRouter.post(
  '/protected/deleteWish',
  validateToken,
  authorizeRole([Role.USER]),
  userWishControllers.deleteFromWish,
);

userWishRouter.get(
  '/protected/getAllWishProducts',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userWishControllers.getWholeWish,
);

userWishRouter.put(
  '/protected/addWish',
  validateToken,
  userWishControllers.addToWish,
);
