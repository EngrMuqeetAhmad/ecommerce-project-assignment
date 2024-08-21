import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteProductVariationDetails } from "./deleteProductVariationDetails.controller";
import { updateProductVariationDetails } from "./updateProductVariationDetails.controller";
import { getProductVariationDetials } from "./getProductVariationDetails.controller";
import { addBaseProduct } from "../baseProduct/addBaseProduct.controller";
import { addProductVariationDetails } from "./addProductVariationDetails.controller";
import { getAllProductVariationDetails } from "./getAllProductVariationsDetails.controller";

export const variationDetailsRouter = express.Router()

variationDetailsRouter.put(
  "/addProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationDetails(req, res);
  }
);

variationDetailsRouter.get(
  "/getProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariationDetials(req, res);
  }
);

variationDetailsRouter.get(
  "/getAllProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariationDetails(req, res);
  }
);

variationDetailsRouter.post(
  "/updateProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariationDetails(req, res);
  }
);

variationDetailsRouter.post(
  "/deleteProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariationDetails(req, res);
  }
);
