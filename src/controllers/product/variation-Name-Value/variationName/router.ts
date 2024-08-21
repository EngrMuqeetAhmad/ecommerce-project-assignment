import express from "express";
import { authorizeRole, validateToken } from "../../../../utils/validateToken";
import { Role } from "../../../../types/userTypes";
import { getVariationName } from "./getVariationName.controller";
import { deleteVariationType } from "./deleteVariationName.controller";
import { updateVairationName } from "./updateVariationName.controller";
import { addProductVariationName } from "./addVariationName.controller";
import { getAllVariationName } from "./getAllVariationName.controller";

export const variationNameRouter = express.Router()

variationNameRouter.put(
  "/product/variation/addName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationName(req, res);
  }
);
variationNameRouter.post(
  "/product/variation/updateName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateVairationName(req, res);
  }
);

variationNameRouter.post(
  "/product/variation/deleteName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteVariationType(req, res);
  }
);

variationNameRouter.get(
  "/product/variation/getName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getVariationName(req, res);
  }
);
variationNameRouter.get(
  "/product/variation/getAllName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllVariationName(req, res);
  }
);

module.exports = variationNameRouter;
