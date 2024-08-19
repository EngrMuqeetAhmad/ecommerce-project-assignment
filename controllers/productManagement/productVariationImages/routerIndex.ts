import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addProductVariationImages } from "./addProductVariationImages";
import { getProductVariationImage } from "./getProductVariationImages";
import { getAllProductVariationImages } from "./getAllProductVariationsImages";
import { updateProductVariationImages } from "./updateProductVariationImages";
import { deleteProductVariationImages } from "./deleteProductVariationImages";

var router = express.Router();

router.put(
  "/addProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationImages(req, res);
  }
);

router.get(
  "/getProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariationImage(req, res);
  }
);

router.get(
  "/getAllProductVariationImages",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariationImages(req, res);
  }
);

router.post(
  "/updateProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariationImages(req, res);
  }
);

router.post(
  "/deleteProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariationImages(req, res);
  }
);

module.exports = router;
