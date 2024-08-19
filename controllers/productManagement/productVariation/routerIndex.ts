import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteProduct } from "./deleteProductVariation";
import { updateBaseProduct } from "./updateProductVariation";
import { getBaseProduct } from "./getProductVariation";
import { addBaseProduct } from "./addProductVariation";

var router = express.Router();

router.put(
  "/addBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addBaseProduct(req, res);
  }
);

router.get(
  "/getBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getBaseProduct(req, res);
  }
);

router.post(
  "/updateBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateBaseProduct(req, res);
  }
);

router.post(
  "/deleteProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProduct(req, res);
  }
);

module.exports = router;
