import express from 'express';

import UserControllers from './user.controller';
import { emailForVerification } from '../../middlewares/sendVerificationEmail.middleware';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { validateEmail } from '../../middlewares/verifyEmail.middleware';
import UserServices from '../../services/user/user.services';
import { Role } from '../../types/userTypes';

///////

//add functionality to verfiy email for reset-password
export const userRouter = express.Router();
///

const userControllers = new UserControllers();
const userServices = new UserServices();

userRouter.get(
  '/protected/getUser',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userControllers.getUser,
);

userRouter.get('/userLogin', userControllers.userLogin);
userRouter.post(
  '/protected/updateUser',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userControllers.updateUser,
);
userRouter.put(
  '/userRegister', ///validate funtion here
  userServices.createStripe,
  userControllers.userRegister,
  emailForVerification,
);
userRouter.post(
  '/reset/:token',
  validateEmail, //send email in body
  userControllers.resetPassword,
);

userRouter.get(
  '/resetPassword',
  emailForVerification, //send email in body
);

userRouter.get(
  '/verify-email/:token',
  validateEmail,
  userControllers.updateIsVerified,
);
