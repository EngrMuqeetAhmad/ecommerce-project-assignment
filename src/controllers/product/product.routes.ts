import express from 'express';
import { BaseProductControllers } from './baseProduct.controller';
import { ProductControllers } from './product.controller';
import { ProductImageControllers } from './productImages.controller';
import { ProductVariationControllers } from './productVariation.controller';
import { ReviewControllers } from './review.controller';
import { VariationTypeControllers } from './variationType.controller';
import { VariationTypeValueControllers } from './variationTypeValue.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';
import { checkBlacklist } from '../../middlewares/checkBlackListed.middleware';

//routers
export const ProductRouter = express.Router();

///
ProductRouter.delete(
  '/baseProduct/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  BaseProductControllers.deleteBaseProduct,
);
ProductRouter.put(
  '/baseProduct',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  BaseProductControllers.addBaseProduct,
);
ProductRouter.get(
  '/baseProduct/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  BaseProductControllers.getBaseProduct,
);
///

ProductRouter.get(
  '/product/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ProductControllers.getAllProducts,
);

ProductRouter.get(
  '/product/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  ProductControllers.getProduct,
);

ProductRouter.delete(
  '/product/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]), //server
  ProductControllers.deleteProduct,
);

ProductRouter.put(
  '/product',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  ProductControllers.addProduct,
);
///
ProductRouter.get(
  '/image/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  ProductImageControllers.getAllVariationImages,
);

ProductRouter.delete(
  '/image/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ProductImageControllers.deleteImage,
);

ProductRouter.put(
  '/image',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ProductImageControllers.addImage,
);
///
ProductRouter.get(
  '/review/approve/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ReviewControllers.approveReview,
);

ProductRouter.get(
  '/review/:variationID',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ReviewControllers.getAllProductReview,
);

ProductRouter.delete(
  '/review/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  ReviewControllers.deleteReview,
);

ProductRouter.put(
  '/review',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  ReviewControllers.addReview,
);
////

ProductRouter.get(
  '/variation/:baseProductID',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  ProductVariationControllers.getProductVariations,
);

ProductRouter.delete(
  '/variation/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ProductVariationControllers.deleteProductVariation,
);

ProductRouter.put(
  '/variation',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  ProductVariationControllers.addProductVariation,
);

///variation type

ProductRouter.get(
  '/variationType/all',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  VariationTypeControllers.getAllVariationTypes,
);

ProductRouter.delete(
  '/variationType/:type',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  VariationTypeControllers.deleteVariationType,
);

ProductRouter.put(
  '/variationType',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  VariationTypeControllers.addVariationType,
);

///variation type value

ProductRouter.get(
  '/variationTypeValue/:type',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  VariationTypeValueControllers.getAllVariationTypeValues,
);

ProductRouter.delete(
  '/variationTypeValue/:value',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  VariationTypeValueControllers.deleteVariationTypeValue,
);

ProductRouter.put(
  '/variationTypeValue',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.ADMIN]),
  VariationTypeValueControllers.addVariationTypeValue,
);
