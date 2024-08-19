import express from "express";
import { authorizeRole, validateToken } from "../utils/validateToken";
import { Role } from "../types/userTypes";
import { addBaseProduct } from "../controllers/productManagement/baseProduct/addBaseProduct";
import { getBaseProduct } from "../controllers/productManagement/baseProduct/getBaseProduct";
import { updateBaseProduct } from "../controllers/productManagement/baseProduct/updateBaseProduct";
import { deleteProduct } from "../controllers/productManagement/baseProduct/deleteProduct";
import { addProductVariationName } from "../controllers/productManagement/variation-Name-Value/Name/addVariationName";
import { updateVairationName } from "../controllers/productManagement/variation-Name-Value/Name/updateVariationName";
import { getVariationName } from "../controllers/productManagement/variation-Name-Value/Name/getVariationName";
import { deleteVariationType } from "../controllers/productManagement/variation-Name-Value/Name/deleteVariationName";
import { addProductVariationValue } from "../controllers/productManagement/variation-Name-Value/Value/addVariationValue";
import { updateVariationValue } from "../controllers/productManagement/variation-Name-Value/Value/updateVariationValue";
import { deleteVariationValue } from "../controllers/productManagement/variation-Name-Value/Value/deleteVariationValue";
import { getVariationTypeValue } from "../controllers/productManagement/variation-Name-Value/Value/getVariationValue";

const router = express.Router();

///  variation type and variation option
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
///////
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

///  base product
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

router.post(
  "/updateBaseProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateBaseProduct(req, res);
  }
);

router.post(
  "/deleteProduct",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProduct(req, res);
  }
);

module.exports = router;
