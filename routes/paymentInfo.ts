import express from "express";
var router = express.Router();


import { validateToken } from "../utils/validateToken";

import { getUserPaymentCardInfo } from "../controllers/paymentInfo/getPaymentInfo";
import { getUserAllPaymentCardInfo } from "../controllers/paymentInfo/getAllPaymentCardsInfo";
import { userAddPaymentInfo } from "../controllers/paymentInfo/addPaymentInfo";
import { userUpdatePaymentInfo } from "../controllers/paymentInfo/updatePaymentInfo";
import { userDeletePaymentInfo } from "../controllers/paymentInfo/deletePaymentInfo";

///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation


///
router.get(
  "/protected/getPaymentCardInfo/:paymentCardID",
  validateToken,
  async (req: any, res: any) => {
    await getUserPaymentCardInfo(req, res);
  }
);

router.get(
  "/protected/getUserAllPaymentCardsInfo/",
  validateToken,
  async (req: any, res: any) => {
    await getUserAllPaymentCardInfo(req, res);
  }
);

router.put(
  "/protected/addPaymentInfo",
  validateToken,
  async (req: any, res: any) => {
    await userAddPaymentInfo(req, res);
  }
);

router.post(
  "/protected/updatePaymentInfo",
  validateToken,
  async (req: any, res: any) => {
    await userUpdatePaymentInfo(req, res);
  }
);
router.post(
  "/protected/deletePaymentInfo",
  validateToken,
  async (req: any, res: any) => {
    await userDeletePaymentInfo(req, res);
  }
);
///////

module.exports = router;
