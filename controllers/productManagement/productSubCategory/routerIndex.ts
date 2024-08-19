import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { addSubCategory } from "./addSubCategory";
import { getSubCategory } from "./getSubCategory";
import { getAllSubCategory } from "./getAllSubCategory";
import { updateSubCategory } from "./updateSubCategory";
import { deleteSubCategory } from "./deleteSubCategory";

var router = express.Router();

router.put(
  "/addSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addSubCategory(req, res);
  }
);

router.get(
  "/getSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getSubCategory(req, res);
  }
);

router.get(
  "/getAllSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllSubCategory(req, res);
  }
);

router.post(
  "/updateSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateSubCategory(req, res);
  }
);

router.post(
  "/deleteSubCategory",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteSubCategory(req, res);
  }
);

module.exports = router;
