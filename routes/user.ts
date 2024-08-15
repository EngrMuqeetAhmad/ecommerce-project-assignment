import express from "express";
var router = express.Router();
import userRegister from "../controllers/user/userRegister";

import userLogin from "../controllers/user/userLogin";

import { validateToken } from "../utils/validateToken";
import { getUser } from "../controllers/user/getUser";
import { getUserPhoneInfo } from "../controllers/user/getUserPhoneInfo";
import { emailForVerification } from "../controllers/user/validations/emailForVerification";
import { validateEmail } from "../controllers/user/validations/verifyEmailFnc";
import userPasswordUpdate from "../controllers/user/resetPassword";
import { userAddShippingAddress } from "../controllers/user/addShippingAddress";
import { userDeleteShippingAddress } from "../controllers/user/deleteShippingAddress";
import { userUpdateShippingAddress } from "../controllers/user/updateShippingAddress";
import { getUserShippingAddress } from "../controllers/user/getShippingAddress";
import { getUserAllShippingAddress } from "../controllers/user/getAllShippingAddress";
import { getUserPaymentCardInfo } from "../controllers/user/getPaymentInfo";
import { getUserAllPaymentCardInfo } from "../controllers/user/getAllPaymentCardsInfo";
import { userAddPaymentInfo } from "../controllers/user/addPaymentInfo";
import { userUpdatePaymentInfo } from "../controllers/user/updatePaymentInfo";
import { userDeletePaymentInfo } from "../controllers/user/deletePaymentInfo";
///////

//  wish list add/delete

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

router.get(
  "/protected/getShippingAddress/:id",
  validateToken,
  async (req: any, res: any) => {
    await getUserShippingAddress(req, res);
  }
);

router.get(
  "/protected/getUserAllShippingAddress/",
  validateToken,
  async (req: any, res: any) => {
    await getUserAllShippingAddress(req, res);
  }
);

router.put(
  "/protected/addShippingAddress",
  validateToken,
  async (req: any, res: any) => {
    await userAddShippingAddress(req, res);
  }
);

router.post(
  "/protected/updateShippingAddress",
  validateToken,
  async (req: any, res: any) => {
    await userUpdateShippingAddress(req, res);
  }
);
router.post(
  "/protected/deleteShippingAddress",
  validateToken,
  async (req: any, res: any) => {
    await userDeleteShippingAddress(req, res);
  }
);

///

router.post("/resetPassword", async (req: any, res: any) => {
  await userPasswordUpdate(req, res);
});

/* GET users listing. */

router.get("/protected/getUser", validateToken, async (req: any, res: any) => {
  await getUser(req, res);
});

////email verification

//forget password

// router.post(
//   "/protected/updatePassword",

// )

router.get(
  "/protected/getUserPhoneInfo",
  validateToken,
  async (req: any, res: any) => {
    await getUserPhoneInfo(req, res);
  }
);

router.put(
  "/protected/getUserPhoneInfo",
  validateToken,
  async (req: any, res: any) => {
    await getUserPhoneInfo(req, res);
  }
);

//login User

router.get("/userLogin", async (req: any, res: any) => {
  await userLogin(req, res);
});

//update user profile data name, phoneNo

//register user
router.put(
  "/userRegister",
  async (req: any, res: any, next: any) => {
    await userRegister(req, res);
    next();
  },
  async (req: any, res: any) => {
    await emailForVerification(req, res);
  }
);

router.get("/verify-email", async (req: any, res: any) => {
  await validateEmail(req, res);
});

module.exports = router;
