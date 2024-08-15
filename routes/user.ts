import express from "express";
var router = express.Router();
import userRegister from "../controllers/user/user/userRegister";

import userLogin from "../controllers/user/user/userLogin";

import { validateToken } from "../utils/validateToken";
import { getUser } from "../controllers/user/user/getUser";
import { getUserPhoneInfo } from "../controllers/user/user/getUserPhoneInfo";
import { emailForVerification } from "../controllers/user/validations/emailForVerification";
import { validateEmail } from "../controllers/user/validations/verifyEmailFnc";
import userPasswordUpdate from "../controllers/user/user/resetPassword";
import { userAddShippingAddress } from "../controllers/user/shippingAddress/addShippingAddress";
import { userDeleteShippingAddress } from "../controllers/user/shippingAddress/deleteShippingAddress";
import { userUpdateShippingAddress } from "../controllers/user/shippingAddress/updateShippingAddress";
import { getUserShippingAddress } from "../controllers/user/shippingAddress/getShippingAddress";
import { getUserAllShippingAddress } from "../controllers/user/shippingAddress/getAllShippingAddress";
import { getUserPaymentCardInfo } from "../controllers/user/paymentInfo/getPaymentInfo";
import { getUserAllPaymentCardInfo } from "../controllers/user/paymentInfo/getAllPaymentCardsInfo";
import { userAddPaymentInfo } from "../controllers/user/paymentInfo/addPaymentInfo";
import { userUpdatePaymentInfo } from "../controllers/user/paymentInfo/updatePaymentInfo";
import { userDeletePaymentInfo } from "../controllers/user/paymentInfo/deletePaymentInfo";
import { addWishProduct } from "../controllers/user/wishList/addUserWish";
import { deleteWishProduct } from "../controllers/user/wishList/deleteUserWish";
import { getAllWishProducts } from "../controllers/user/wishList/getAllWishProducts";
///////

//  wish list add/delete
router.post(
  "/protected/deleteWish/:productID",
  validateToken,
  async (req: any, res: any) => {
    await deleteWishProduct(req, res);
  }
);

router.get(
  "/protected/getAllWishProducts",
  validateToken,
  async (req: any, res: any) => {
    await getAllWishProducts(req, res);
  }
);

router.put(
  "/protected/addWish/:productID",
  validateToken,
  async (req: any, res: any) => {
    await addWishProduct(req, res);
  }
);

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
