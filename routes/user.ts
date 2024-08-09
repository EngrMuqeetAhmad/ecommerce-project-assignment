import express from "express";
var router = express.Router();
import userRegister from "../controllers/user/userRegister";

///////

/* GET users listing. */
router.get("/", async function (req: any, res: any, next: any) {
  res.json({ message: "hello" });
});

//update user profile data name, phoneNo

//register user
router.put("/userRegister", async (req: any, res: any) => {
  await userRegister(req, res);
});

module.exports = router;
