import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteBaseProduct } from "./deleteBaseProduct";
import { updateBaseProduct } from "./updateBaseProduct";
import { getBaseProduct } from "./getBaseProduct";
import { addBaseProduct } from "./addBaseProduct";
import { getAllBaseProducts } from "./getAllBaseProduct";

var router = express.Router();

router.put(
  "/addBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addBaseProduct(req, res);
  }
);

router.get(
  "/getBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getBaseProduct(req, res);
  }
);
router.get(
  "/getAllBaseProducts",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllBaseProducts(req, res);
  }
);

router.post(
  "/updateBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateBaseProduct(req, res);
  }
);

router.post(
  "/deleteBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteBaseProduct(req, res);
  }
);

module.exports = router;
