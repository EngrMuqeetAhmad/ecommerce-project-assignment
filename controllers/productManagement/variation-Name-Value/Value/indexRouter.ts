import express from "express";
import { authorizeRole, validateToken } from "../../../../utils/validateToken";
import { Role } from "../../../../types/userTypes";
import { getVariationTypeValue } from "./getVariationValue";
import { deleteVariationValue } from "./deleteVariationValue";
import { updateVariationValue } from "./updateVariationValue";
import { addProductVariationValue } from "./addVariationValue";

var router = express.Router();

router.put(
  "/product/variation/addTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationValue(req, res);
  }
);

router.post(
  "/product/variation/updateTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateVariationValue(req, res);
  }
);
router.post(
  "/product/variation/deleteTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteVariationValue(req, res);
  }
);

router.get(
  "/product/variation/getTypeValue",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getVariationTypeValue(req, res);
  }
);

module.exports = router;
