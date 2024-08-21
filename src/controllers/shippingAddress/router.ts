import express from "express";


import { authorizeRole, validateToken } from "../../utils/validateToken";

import { userAddShippingAddress } from "./addShippingAddress.controller";
import { userDeleteShippingAddress } from "./deleteShippingAddress.controller";
import { userUpdateShippingAddress } from "./updateShippingAddress.controller";
import { getUserShippingAddress } from "./getShippingAddress.controller";
import { getUserAllShippingAddress } from "./getAllShippingAddress.controller";
import { Role } from "../../types/userTypes";

///////

//add functionality to verfiy email for reset-password

///////

export const shippingAddressRouter = express.Router()
shippingAddressRouter.get(
  "/protected/getShippingAddress/:id",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserShippingAddress(req, res);
  }
);

shippingAddressRouter.get(
  "/protected/getAllUserShippingAddress/",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getUserAllShippingAddress(req, res);
  }
);

shippingAddressRouter.put(
  "/protected/addShippingAddress",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userAddShippingAddress(req, res);
  }
);

shippingAddressRouter.post(
  "/protected/updateShippingAddress",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userUpdateShippingAddress(req, res);
  }
);
shippingAddressRouter.post(
  "/protected/deleteShippingAddress",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await userDeleteShippingAddress(req, res);
  }
);

///

