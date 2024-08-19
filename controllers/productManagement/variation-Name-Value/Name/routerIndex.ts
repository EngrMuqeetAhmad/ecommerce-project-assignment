import express from "express";
import { authorizeRole, validateToken } from "../../../../utils/validateToken";
import { Role } from "../../../../types/userTypes";
import { getVariationName } from "./getVariationName";
import { deleteVariationType } from "./deleteVariationName";
import { updateVairationName } from "./updateVariationName";
import { addProductVariationName } from "./addVariationName";
import { getAllVariationName } from "./getAllVariationName";

var router = express.Router();

router.put(
  "/product/variation/addName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationName(req, res);
  }
);
router.post(
  "/product/variation/updateName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateVairationName(req, res);
  }
);

router.post(
  "/product/variation/deleteName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteVariationType(req, res);
  }
);

router.get(
  "/product/variation/getName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getVariationName(req, res);
  }
);
router.get(
  "/product/variation/getAllName",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllVariationName(req, res);
  }
);

module.exports = router;
