import express from 'express';

import PhoneInfoController from './phoneInfo.controller';
import { ShippingAddressControllers } from './shippingAddress.contoller';
import UserControllers from './user.controller';
import { UserCartControllers } from './userCart.controller';
import { UserOrderControllers } from './userOrder.controller';
import { UserWishControllers } from './userWish.controller';
import { createStripe } from '../../middlewares/createStripe.middleware';
import { emailForVerification } from '../../middlewares/sendVerificationEmail.middleware';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { validateEmail } from '../../middlewares/verifyEmail.middleware';
import { Role } from '../../utils/enum.util';

///////

//add functionality to verfiy email for reset-password
export const UserRouter = express.Router();
///

UserRouter.get(
  '/:id',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserControllers.getUser,
);

UserRouter.get('/login', UserControllers.userLogin);
UserRouter.post(
  '/',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserControllers.updateUser,
);
UserRouter.put(
  '/',
  createStripe,
  UserControllers.userRegister,
  emailForVerification,
);
UserRouter.post(
  '/resetPassword/:token',
  validateEmail,
  UserControllers.resetPassword,
);

UserRouter.get(
  '/resetPassword',
  emailForVerification, //send email in body
);

UserRouter.get(
  '/verify-email/:token',
  validateEmail,
  UserControllers.makeVerified,
);

///user Cart

UserRouter.delete(
  '/cart/:id',
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.deleteFromCart,
);
UserRouter.post(
  '/cart',
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.updateQuantity,
);

UserRouter.get(
  '/cart/all',
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.getWholeCart,
);

UserRouter.put(
  '/cart',
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.addToCart,
);

//user Order

///

UserRouter.put(
  '/order',
  validateToken,
  authorizeRole([Role.USER]),
  UserOrderControllers.createOrder,
);

UserRouter.delete(
  '/order/:id',
  validateToken,
  authorizeRole([Role.USER]),
  UserOrderControllers.deleteOrder,
);

UserRouter.get(
  '/order/:id',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserOrderControllers.getOrder,
);
UserRouter.get(
  '/order/all',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserOrderControllers.getAllOrders,
);

//user Wish

///
UserRouter.post(
  '/wish/:id',
  validateToken,
  authorizeRole([Role.USER]),
  UserWishControllers.deleteFromWish,
);

UserRouter.get(
  '/wish/all',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserWishControllers.getWholeWish,
);

UserRouter.put('/wish', validateToken, UserWishControllers.addToWish);

//shippig address

UserRouter.get(
  '/shippingAddress/:id',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),

  ShippingAddressControllers.getShippingAddress,
);

UserRouter.get(
  '/shippingAddress/all',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  ShippingAddressControllers.getAllShippingAddress,
);

UserRouter.put(
  '/shippingAddress',
  validateToken,
  authorizeRole([Role.USER]),
  ShippingAddressControllers.addShippingAddress,
);

UserRouter.post(
  '/shippingAddress',
  validateToken,
  authorizeRole([Role.USER]),
  ShippingAddressControllers.updateShippingAddress,
);
UserRouter.delete(
  '/shippingAddress/:id',
  validateToken,
  authorizeRole([Role.USER]),
  ShippingAddressControllers.deleteShippingAddress,
);

/// phone info

UserRouter.get(
  '/phone/all',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.getAllPhoneNumber,
);

UserRouter.get(
  '/phone/:id',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.getPhoneNumber,
);

UserRouter.post(
  '/phone/makePrimary/:id',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.makePrimary,
);

UserRouter.delete(
  '/phone/:id',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.deletePhoneNumber,
);

UserRouter.put(
  '/phone',
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.addPhoneNumber,
);
