import express from 'express';

import { userAddPaymentInfo } from './addPaymentInfo.controller';
import { createPaymentFlow } from './createPayment.controller';
import { userDeletePaymentInfo } from './deletePaymentInfo.controller';
import { getUserAllPaymentCardInfo } from './getAllPaymentCardsInfo.controller';
import { getUserPaymentCardInfo } from './getPaymentInfo.controller';
import { userUpdatePaymentInfo } from './updatePaymentInfo.controller';
import { Role } from '../../types/userTypes';
import { authorizeRole, validateToken } from '../../utils/validateToken';

///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

export const paymentRouter = express.Router();
///
paymentRouter.get(
  '/protected/getPaymentCardInfo/:paymentCardID',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPaymentCardInfo(req, res);
  },
);

paymentRouter.get(
  '/protected/getUserAllPaymentCardsInfo/',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserAllPaymentCardInfo(req, res);
  },
);

paymentRouter.put(
  '/protected/addPaymentInfo',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userAddPaymentInfo(req, res);
  },
);

paymentRouter.post(
  '/protected/updatePaymentInfo',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userUpdatePaymentInfo(req, res);
  },
);
paymentRouter.post(
  '/protected/deletePaymentInfo',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userDeletePaymentInfo(req, res);
  },
);

paymentRouter.post(
  '/protected/createPayment',
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await createPaymentFlow(req, res);
  },
);
///////
