import express from 'express';
import { CategoryRouter } from './controllers/category/router';
import { paymentRouter } from './controllers/payment/router';
import { phoneInfoRouter } from './controllers/phoneInfo/router';
import { productRouter } from './controllers/product/router';
import { shippingAddressRouter } from './controllers/shippingAddress/router';
import { SubCategoryRouter } from './controllers/subCategory/router';
import { userRouter } from './controllers/user/router';
import { userCartRouter } from './controllers/userCart/router';
import { userOrderRouter } from './controllers/userOrder/router';
import { userWishRouter } from './controllers/userWish/router';
export const AppRouter = express.Router();

AppRouter.use('/userWish', userWishRouter);

AppRouter.use('/userOrder', userOrderRouter);

AppRouter.use('/subCategory', SubCategoryRouter);
AppRouter.use('/category', CategoryRouter);
AppRouter.use('/userCart', userCartRouter);
AppRouter.use('/user/phoneInfo', phoneInfoRouter);

AppRouter.use('/user', userRouter);

AppRouter.use('/shippingAddress', shippingAddressRouter);

// AppRouter.use("/product", productRouter);

// AppRouter.use("/payment", paymentRouter);
