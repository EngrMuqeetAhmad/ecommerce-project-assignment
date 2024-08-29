import express from 'express';

import { CategoryRouter } from './controllers/category/category.routes';
import { PaymentRouter } from './controllers/payment/payment.routes';

import { ProductRouter } from './controllers/product/product.routes';
import { SubCategoryRouter } from './controllers/subCategory/subCategory.routes';
import { UserRouter } from './controllers/user/user.routes';
export const AppRouter = express.Router();

AppRouter.use('/subCategory', SubCategoryRouter);
AppRouter.use('/category', CategoryRouter);

AppRouter.use('/user', UserRouter);

AppRouter.use('/product', ProductRouter);

AppRouter.use('/payment', PaymentRouter);
