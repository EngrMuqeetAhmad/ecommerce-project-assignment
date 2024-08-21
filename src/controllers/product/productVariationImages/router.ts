import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addProductVariationImages } from "./addProductVariationImages.controller";
import { getProductVariationImage } from "./getProductVariationImages.controller";
import { getAllProductVariationImages } from "./getAllProductVariationsImages.controller";
import { updateProductVariationImages } from "./updateProductVariationImages.controller";
import { deleteProductVariationImages } from "./deleteProductVariationImages.controller";

export const variationImagesRouter = express.Router()

variationImagesRouter.put(
  "/addProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationImages(req, res);
  }
);

variationImagesRouter.get(
  "/getProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariationImage(req, res);
  }
);

variationImagesRouter.get(
  "/getAllProductVariationImages",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariationImages(req, res);
  }
);

variationImagesRouter.post(
  "/updateProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariationImages(req, res);
  }
);

variationImagesRouter.post(
  "/deleteProductVariationImage",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariationImages(req, res);
  }
);
