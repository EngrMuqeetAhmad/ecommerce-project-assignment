import express from "express";
var router = express.Router();


import { authorizeRole, validateToken } from "../utils/validateToken";

import { getUserPaymentCardInfo } from "../controllers/paymentInfo/getPaymentInfo";
import { getUserAllPaymentCardInfo } from "../controllers/paymentInfo/getAllPaymentCardsInfo";
import { userAddPaymentInfo } from "../controllers/paymentInfo/addPaymentInfo";
import { userUpdatePaymentInfo } from "../controllers/paymentInfo/updatePaymentInfo";
import { userDeletePaymentInfo } from "../controllers/paymentInfo/deletePaymentInfo";
import { Role } from "../types/userTypes";

///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation


///
router.get(
  "/protected/getPaymentCardInfo/:paymentCardID",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPaymentCardInfo(req, res);
  }
);

router.get(
  "/protected/getUserAllPaymentCardsInfo/",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserAllPaymentCardInfo(req, res);
  }
);

router.put(
  "/protected/addPaymentInfo",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userAddPaymentInfo(req, res);
  }
);

router.post(
  "/protected/updatePaymentInfo",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userUpdatePaymentInfo(req, res);
  }
);
router.post(
  "/protected/deletePaymentInfo",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userDeletePaymentInfo(req, res);
  }
);
///////

module.exports = router;
