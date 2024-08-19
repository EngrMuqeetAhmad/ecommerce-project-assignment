import express from "express";
import { authorizeRole, validateToken } from "../../../utils/validateToken";
import { Role } from "../../../types/userTypes";
import { deleteProductVariationDetails } from "./deleteProductVariationDetails";
import { updateProductVariationDetails } from "./updateProductVariationDetails";
import { getProductVariationDetials } from "./getProductVariationDetails";
import { addBaseProduct } from "../baseProduct/addBaseProduct";
import { addProductVariationDetails } from "./addProductVariationDetails";
import { getAllProductVariationDetails } from "./getAllProductVariationsDetails";

var router = express.Router();

router.put(
  "/addProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await addProductVariationDetails(req, res);
  }
);

router.get(
  "/getProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getProductVariationDetials(req, res);
  }
);

router.get(
  "/getAllProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await getAllProductVariationDetails(req, res);
  }
);

router.post(
  "/updateProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await updateProductVariationDetails(req, res);
  }
);

router.post(
  "/deleteProductVariationDetails",
  validateToken,
  authorizeRole([Role.ADMIN]),
  async (req: any, res: any) => {
    await deleteProductVariationDetails(req, res);
  }
);

module.exports = router;
