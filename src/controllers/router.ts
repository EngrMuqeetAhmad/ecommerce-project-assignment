import express from "express";
import { userWishRouter } from "./userWish/router";
import { userOrderRouter } from "./userOrder/router";

export const AppRouter = express.Router();

AppRouter.use("/userWish", userWishRouter);

AppRouter.use("/userOrder", userOrderRouter);

AppRouter.use("/userCart", userOrderRouter);

AppRouter.use("/user", userOrderRouter);

AppRouter.use("/shippingAddress", userOrderRouter);

AppRouter.use("/product", userOrderRouter);

AppRouter.use("/payment", userOrderRouter);
