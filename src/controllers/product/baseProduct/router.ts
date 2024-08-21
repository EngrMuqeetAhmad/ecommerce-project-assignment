import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteBaseProduct } from "./deleteBaseProduct.controller";
import { updateBaseProduct } from "./updateBaseProduct.controller";
import { getBaseProduct } from "./getBaseProduct.controller";
import { addBaseProduct } from "./addBaseProduct.controller";
import { getAllBaseProducts } from "./getAllBaseProduct.controller";

export const baseProductRouter = express.Router()

baseProductRouter.put(
  "/addBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addBaseProduct(req, res);
  }
);

baseProductRouter.get(
  "/getBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getBaseProduct(req, res);
  }
);
baseProductRouter.get(
  "/getAllBaseProducts",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllBaseProducts(req, res);
  }
);

baseProductRouter.post(
  "/updateBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateBaseProduct(req, res);
  }
);

baseProductRouter.post(
  "/deleteBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteBaseProduct(req, res);
  }
);


