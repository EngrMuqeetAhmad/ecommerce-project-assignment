import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addCategory } from "./addCategory.controller";
import { getCategory } from "./getCategory.controller";
import { getAllCategories } from "./getAllCategory.controller";
import { updateCategory } from "./updateCategory.controller";
import { deleteCategory } from "./deleteCategory.controller";


export const categoryRouter = express.Router()

categoryRouter.put(
  "/addCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addCategory(req, res);
  }
);

categoryRouter.get(
  "/getCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getCategory(req, res);
  }
);

categoryRouter.get(
  "/getAllCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllCategories(req, res);
  }
);

categoryRouter.post(
  "/updateCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateCategory(req, res);
  }
);

categoryRouter.post(
  "/deleteCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteCategory(req, res);
  }
);


