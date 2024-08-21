import express from "express";
import { authorizeRole, validateToken } from "../../utils/validateToken";
import { Role } from "../../types/userTypes";
import getProductWithVariationCombinations from "./getProductwithVariationCombination.controller";
import { baseProductRouter } from "./baseProduct/router";
import { variationNameRouter } from "./variation-Name-Value/variationName/router";
import { variationValueRouter } from "./variation-Name-Value/variationValue/router";
import { productVariationRouter } from "./productVariation/router";
import { variationDetailsRouter } from "./productVariationDetails/router";
import { variationImagesRouter } from "./productVariationImages/router";
import { variationReviewRouter } from "./productReviews/router";
import { subCategoryRouter } from "./productSubCategory/router";
import { categoryRouter } from "./productCategory/router";

export const productRouter = express.Router();

productRouter.use("/subCategory", subCategoryRouter);

productRouter.use("/category", categoryRouter);

productRouter.use("/variationReview", variationReviewRouter);

///  variation type and variation option
productRouter.use("/productImage", variationImagesRouter);

productRouter.use("/variationDetail", variationDetailsRouter);

productRouter.use("/productVariation", productVariationRouter);
///////
productRouter.use("/variationValue", variationValueRouter);

productRouter.use("/variationName", variationNameRouter);
///  base product
productRouter.use("/baseProduct", baseProductRouter);

//// this will get the whole products with all the combinations set,
productRouter.get(
  "/getProductWithVariationCombinations/:baseProductID",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getProductWithVariationCombinations(req, res);
  }
);
