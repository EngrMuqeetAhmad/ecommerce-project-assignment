import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteProductVariation } from "./deleteProductVariation.controller";
import { updateProductVariation } from "./updateProductVariation.controller";
import { getProductVariation } from "./getProductVariation.controller";
import { addBaseProduct } from "../baseProduct/addBaseProduct.controller";
import { addProductVariation } from "./addProductVariation.controller";
import { getAllProductVariations } from "./getAllProductVariations.controller";

export const productVariationRouter = express.Router()

productVariationRouter.put(
  "/addProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariation(req, res);
  }
);

productVariationRouter.get(
  "/getProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariation(req, res);
  }
);

productVariationRouter.get(
  "/getAllProductVariations",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariations(req, res);
  }
);

productVariationRouter.post(
  "/updateProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariation(req, res);
  }
);

productVariationRouter.post(
  "/deleteProductVariation",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariation(req, res);
  }
);

