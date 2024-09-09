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
import { checkBlacklist } from '../../middlewares/checkBlackListed.middleware';
import { validateEmail } from '../../middlewares/verifyEmail.middleware';
import { Role } from '../../utils/enum.util';
import UserServices from '../../services/user/user.service';

///////

//add functionality to verfiy email for reset-password
export const UserRouter = express.Router();
///

UserRouter.get(
  '/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),

  UserControllers.getUserByID,
);
UserRouter.get(
  '/',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),

  UserControllers.getMe,
);

UserRouter.post('/login', UserControllers.userLogin);
UserRouter.post(
  '/logout',
  // checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserControllers.userLogout,
);
UserRouter.post(
  '/',
  checkBlacklist,
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
UserRouter.post('/resetPassword/:token', validateEmail, (req, res) => {
  res.status(200).json({ message: 'link verified' });
});

UserRouter.post(
  '/resetPassword/y/:token',
  validateEmail,
  UserControllers.resetPassword,
);
UserRouter.post(
  '/resetPassword',
  emailForVerification, //send email in body
);

UserRouter.get(
  '/verify-email/:token',
  validateEmail,
  UserControllers.makeVerified,
);

///user Cart
UserRouter.get(
  '/cart/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.getWholeCart,
);


UserRouter.delete(
  '/cart/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.deleteFromCart,
);
UserRouter.post(
  '/cart',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.updateQuantity,
);


UserRouter.put(
  '/cart',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserCartControllers.addToCart,
);

//user Order

///
UserRouter.get(
  '/order/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserOrderControllers.getAllOrders,
);

UserRouter.put(
  '/order',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserOrderControllers.createOrder,
);

UserRouter.delete(
  '/order/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserOrderControllers.deleteOrder,
);

UserRouter.get(
  '/order/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserOrderControllers.getOrder,
);


//user Wish

///
UserRouter.get(
  '/wish/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  UserWishControllers.getWholeWish,
);
UserRouter.post(
  '/wish/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  UserWishControllers.deleteFromWish,
);



UserRouter.put(
  '/wish',
  checkBlacklist,
  validateToken,
  UserWishControllers.addToWish,
);

// //shippig address

UserRouter.get(
  '/shippingAddress/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),

  ShippingAddressControllers.getAllShippingAddress,
);

UserRouter.get(
  '/shippingAddress/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),

  ShippingAddressControllers.getShippingAddress,
);

UserRouter.put(
  '/shippingAddress',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  ShippingAddressControllers.addShippingAddress,
);

UserRouter.post(
  '/shippingAddress/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  ShippingAddressControllers.updateShippingAddress,
);
UserRouter.delete(
  '/shippingAddress/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  ShippingAddressControllers.deleteShippingAddress,
);

/// phone info

UserRouter.get(
  '/phone/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.getAllPhoneNumber,
);

UserRouter.get(
  '/phone/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.getPhoneNumber,
);

UserRouter.post(
  '/phone/makePrimary/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.makePrimary,
);

UserRouter.delete(
  '/phone/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.deletePhoneNumber,
);

UserRouter.put(
  '/phone',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER, Role.ADMIN]),
  PhoneInfoController.addPhoneNumber,
);
