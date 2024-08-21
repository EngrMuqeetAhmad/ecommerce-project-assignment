import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addSubCategory } from "./addSubCategory.controller";
import { getSubCategory } from "./getSubCategory.controller";
import { getAllSubCategory } from "./getAllSubCategory.controller";
import { updateSubCategory } from "./updateSubCategory.controller";
import { deleteSubCategory } from "./deleteSubCategory.controller";

export const subCategoryRouter = express.Router()

subCategoryRouter.put(
  "/addSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addSubCategory(req, res);
  }
);

subCategoryRouter.get(
  "/getSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getSubCategory(req, res);
  }
);

subCategoryRouter.get(
  "/getAllSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllSubCategory(req, res);
  }
);

subCategoryRouter.post(
  "/updateSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateSubCategory(req, res);
  }
);

subCategoryRouter.post(
  "/deleteSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteSubCategory(req, res);
  }
);

 