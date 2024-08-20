import express from "express";
var router = express.Router();

import { authorizeRole, validateToken } from "../utils/validateToken";

import { Role } from "../types/userTypes";
import { addUserCartProduct } from "../controllers/userCart/addUserCartProduct";
import { getAllCartProducts } from "../controllers/userCart/getAllCartProducts";
import { deleteCartProduct } from "../controllers/userCart/deleteUserCartProduct";
import { udpateCartProduct } from "../controllers/userCart/updateUserCartProduct";
///////

//add functionality to verfiy email for reset-password

/// update isVerified prop and role in user creation

///
router.post(
  "/protected/deleteCartProduct/:productID",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await deleteCartProduct(req, res);
  }
);

router.get(
  "/protected/getAllCartProducts",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getAllCartProducts(req, res);
  }
);

router.put(
  "/protected/addCartProduct/:productID",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await addUserCartProduct(req, res);
  }
);

router.put(
  "/protected/updateCartProduct/:productID",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await udpateCartProduct(req, res);
  }
);

module.exports = router;
