import express from "express";

import userRegister from "./userRegister.controller";

import userLogin from "./userLogin.controller";

import { authorizeRole, validateToken } from "../../utils/validateToken";
import { getUser } from "./getUser.controller";
import { getUserPhoneInfo } from "./getUserPhoneInfo.controller";
import { emailForVerification } from "../../utils/emailForVerification";
import { validateEmail } from "../../validators/verifyEmailFnc.validation";
import userPasswordUpdate from "./resetPassword.controller";
import { Role } from "../../types/userTypes";

///////

//add functionality to verfiy email for reset-password
export const userRouter = express.Router()
///

userRouter.post("/resetPassword", async (req: any, res: any) => {
  await userPasswordUpdate(req, res);
});

/* GET users listing. */

userRouter.get(
  "/protected/getUser",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUser(req, res);
  }
);

userRouter.get(
  "/protected/getUserPhoneInfo",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPhoneInfo(req, res);
  }
);

userRouter.put(
  "/protected/getUserPhoneInfo",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserPhoneInfo(req, res);
  }
);

//login User

userRouter.get("/userLogin", async (req: any, res: any) => {
  await userLogin(req, res);
});

//update user profile data name, phoneNo

//register user
userRouter.put(
  "/userRegister",
  async (req: any, res: any, next: any) => {
    await userRegister(req, res, next);
  },
  async (req: any, res: any) => {
    await emailForVerification(req, res);
  }
);

userRouter.get("/verify-email", async (req: any, res: any) => {
  await validateEmail(req, res);
});
