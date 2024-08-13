import express from "express";
var router = express.Router();
import userRegister from "../controllers/user/userRegister";
import userExists from "../controllers/user/validations/userExists";
import userLogin from "../controllers/user/userLogin";
import jwt from "jsonwebtoken";
import { validateToken } from "../utils/validateToken";
import { getUser } from "../controllers/user/getUser";
///////

/* GET users listing. */
router.get(
  "/protected/getUser",
  validateToken,
  async  (req: any, res: any) => {
    await getUser(req, res);
  }
);

//login User

router.get("/userLogin", async (req: any, res: any) => {
  await userLogin(req, res);
});

//update user profile data name, phoneNo

//register user
router.put("/userRegister", async (req: any, res: any) => {
  await userRegister(req, res);
});

module.exports = router;
