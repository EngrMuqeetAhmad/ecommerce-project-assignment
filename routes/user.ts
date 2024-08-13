import express from "express";
var router = express.Router();
import userRegister from "../controllers/user/userRegister";
import userExists from "../controllers/user/validations/userExists";
import userLogin from "../controllers/user/userLogin";
import jwt from "jsonwebtoken";
import { validateToken } from "../utils/validateToken";
///////

/* GET users listing. */
router.get("/getUser", async function (req: any, res: any, next: any) {


  const isTokenValid = validateToken(req.headers.authorization?.split(" ")[1]);

  res.status(200).json({
    message: isTokenValid,
    data: { userId: "id", email: "email" },
  });
});

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
