import express from 'express';

import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';
import { ProductControllers } from './product.controller';

export const ProductRouter = express.Router();
const productController = new ProductControllers();
ProductRouter.get(
    '/protected/product/getAll',
    validateToken,
    authorizeRole([Role.ADMIN]),
    productController.getAllProducts,
  );
  
ProductRouter.get(
  '/protected/product/get',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  productController.getProduct,
);

ProductRouter.delete(
  '/protected/product/delete',
  validateToken,
  authorizeRole([Role.SERVER]), //server
  productController.deleteProduct,
);

ProductRouter.put(
  '/protected/product/add',
  validateToken,
  authorizeRole([Role.USER]),
  productController.addProduct,
);
