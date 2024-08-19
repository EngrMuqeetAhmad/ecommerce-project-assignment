import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addCategory } from "./addCategory";
import { getCategory } from "./getCategory";
import { getAllCategories } from "./getAllCategory";
import { updateCategory } from "./updateCategory";
import { deleteCategory } from "./deleteCategory";


var router = express.Router();

router.put(
  "/addCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addCategory(req, res);
  }
);

router.get(
  "/getCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getCategory(req, res);
  }
);

router.get(
  "/getAllCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllCategories(req, res);
  }
);

router.post(
  "/updateCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateCategory(req, res);
  }
);

router.post(
  "/deleteCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteCategory(req, res);
  }
);

module.exports = router;
