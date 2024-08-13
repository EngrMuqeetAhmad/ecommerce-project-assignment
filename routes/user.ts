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
///////

//forget password,  shippind address add/update/delete,, payment method add/update/delete
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
