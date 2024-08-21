import express from "express";
import { authorizeRole, validateToken } from "../../../../utils/validateToken";
import { Role } from "../../../../types/userTypes";
import { getVariationTypeValue } from "./getVariationValue.controller";
import { deleteVariationValue } from "./deleteVariationValue.controller";
import { updateVariationValue } from "./updateVariationValue.controller";
import { addProductVariationValue } from "./addVariationValue.controller";
import { getAllVariationTypeValues } from "./getAllVariationValues.controller";

export const variationValueRouter = express.Router()


variationValueRouter.put(
  "/product/variation/addTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationValue(req, res);
  }
);

variationValueRouter.post(
  "/product/variation/updateTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateVariationValue(req, res);
  }
);
variationValueRouter.post(
  "/product/variation/deleteTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteVariationValue(req, res);
  }
);

variationValueRouter.get(
  "/product/variation/getTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getVariationTypeValue(req, res);
  }
);
variationValueRouter.get(
  "/product/variation/getAllTypeValues",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllVariationTypeValues(req, res);
  }
);
