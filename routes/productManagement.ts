import express from "express";
import { authorizeRole, validateToken } from "../utils/validateToken";
import { Role } from "../types/userTypes";
import getProductWithVariationCombinations from "../controllers/productManagement/getProductwithVariationCombination";

var baseProductRouter = require("../controllers/productManagement/baseProduct/routerIndex");
var productVariationNameRouter = require("../controllers/productManagement/variation-Name-Value/Name/routerIndex");
var productVariationValueRouter = require("../controllers/productManagement/variation-Name-Value/Value/routerIndex");
var productVariationRouter = require("../controllers/productManagement/productVariation/routerIndex");
var productVariationDetailsRouter = require("../controllers/productManagement/productVariationDetails/routerIndex");
var productVariationImagesRouter = require("../controllers/productManagement/productVariationImages/routerIndex");
var productReviewRatingRouter = require("../controllers/productManagement/productReviews/routerIndex");
var categoryRouter = require("../controllers/productManagement/productCategory/routerIndex");
var subCategoryRouter = require("../controllers/productManagement/productSubCategory/routerIndex");
const router = express.Router();

router.use("/", subCategoryRouter);

router.use("/", categoryRouter);

router.use("/", productReviewRatingRouter);

///  variation type and variation option
router.use("/", productVariationImagesRouter);

router.use("/", productVariationDetailsRouter);

router.use("/", productVariationRouter);
///////
router.use("/", productVariationValueRouter);

router.use("/", productVariationNameRouter);
///  base product
router.use("/", baseProductRouter);

//// this will get the whole products with all the combinations set,
router.get(
  "/getProductWithVariationCombinations/:baseProductID",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getProductWithVariationCombinations(req, res);
  }
);

module.exports = router;
