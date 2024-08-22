import express from 'express';

import { getUser } from './getUser.controller';
import { getUserPhoneInfo } from './getUserPhoneInfo.controller';
import userPasswordUpdate from './resetPassword.controller';
import UserControllers from './user.controller';
import userLogin from './userLogin.controller';
import UserServices from '../../services/user/user.services';
import { Role } from '../../types/userTypes';
import { emailForVerification } from '../../utils/emailForVerification';
import { authorizeRole, validateToken } from '../../utils/validateToken';
import { validateEmail } from '../../validators/verifyEmailFnc.validation';

///////

//add functionality to verfiy email for reset-password
export const userRouter = express.Router();
///

const userControllers = new UserControllers();
const userServices = new UserServices();

userRouter.get(
  '/protected/getUserPhoneInfo',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPhoneInfo(req, res);
  },
);

userRouter.put(
  '/protected/getUserPhoneInfo',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPhoneInfo(req, res);
  },
);

userRouter.post(
  '/resetPassword/:token',
  validateEmail, //send email in body
  userControllers.resetPassword,
);

userRouter.get(
  '/resetPassword',
  emailForVerification, //send email in body
);

userRouter.get(
  '/protected/getUser',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  userControllers.getUser,
);

userRouter.get('/userLogin', userControllers.userLogin);

userRouter.put(
  '/userRegister', ///validate funtion here
  userServices.createStripe,
  userControllers.userRegister,
  emailForVerification,
);

userRouter.get('/verify-email/:token', validateEmail);
