import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteProductVariation } from "./deleteProductVariation";
import { updateProductVariation } from "./updateProductVariation";
import { getProductVariation } from "./getProductVariation";
import { addBaseProduct } from "../baseProduct/addBaseProduct";
import { addProductVariation } from "./addProductVariation";
import { getAllProductVariations } from "./getAllProductVariations";

var router = express.Router();

router.put(
  "/addProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariation(req, res);
  }
);

router.get(
  "/getProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariation(req, res);
  }
);

router.get(
  "/getAllProductVariations",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariations(req, res);
  }
);

router.post(
  "/updateProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariation(req, res);
  }
);

router.post(
  "/deleteProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariation(req, res);
  }
);

module.exports = router;
