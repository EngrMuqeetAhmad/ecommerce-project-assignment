import express from "express";
import { authorizeRole, validateToken } from "../../utils/validateToken";

import { getUserPaymentCardInfo } from "./getPaymentInfo.controller";
import { getUserAllPaymentCardInfo } from "./getAllPaymentCardsInfo.controller";
import { userAddPaymentInfo } from "./addPaymentInfo.controller";
import { userUpdatePaymentInfo } from "./updatePaymentInfo.controller";
import { userDeletePaymentInfo } from "./deletePaymentInfo.controller";
import { Role } from "../../types/userTypes";
import { createPaymentFlow } from "./createPayment.controller";

///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

export const paymentRouter = express.Router();
///
paymentRouter.get(
  "/protected/getPaymentCardInfo/:paymentCardID",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPaymentCardInfo(req, res);
  }
);

paymentRouter.get(
  "/protected/getUserAllPaymentCardsInfo/",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserAllPaymentCardInfo(req, res);
  }
);

paymentRouter.put(
  "/protected/addPaymentInfo",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userAddPaymentInfo(req, res);
  }
);

paymentRouter.post(
  "/protected/updatePaymentInfo",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userUpdatePaymentInfo(req, res);
  }
);
paymentRouter.post(
  "/protected/deletePaymentInfo",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userDeletePaymentInfo(req, res);
  }
);

paymentRouter.post(
  "/protected/createPayment",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await createPaymentFlow(req, res);
  }
);
///////
