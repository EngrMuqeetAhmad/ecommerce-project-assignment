import express from "express";
var router = express.Router();

import { authorizeRole, validateToken } from "../utils/validateToken";

import { addWishProduct } from "../controllers/userWish/addUserWish";
import { deleteWishProduct } from "../controllers/userWish/deleteUserWish";
import { getAllWishProducts } from "../controllers/userWish/getAllWishProducts";
import { Role } from "../types/userTypes";
///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

///
router.post(
  "/protected/deleteWish/:productID",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await deleteWishProduct(req, res);
  }
);

router.get(
  "/protected/getAllWishProducts",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
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

module.exports = router;
