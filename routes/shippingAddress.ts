import express from "express";
var router = express.Router();

import { validateToken } from "../utils/validateToken";

import { userAddShippingAddress } from "../controllers/shippingAddress/addShippingAddress";
import { userDeleteShippingAddress } from "../controllers/shippingAddress/deleteShippingAddress";
import { userUpdateShippingAddress } from "../controllers/shippingAddress/updateShippingAddress";
import { getUserShippingAddress } from "../controllers/shippingAddress/getShippingAddress";
import { getUserAllShippingAddress } from "../controllers/shippingAddress/getAllShippingAddress";

///////

//add functionality to verfiy email for reset-password


///////

router.get(
  "/protected/getShippingAddress/:id",
  validateToken,
  async (req: any, res: any) => {
    await getUserShippingAddress(req, res);
  }
);

router.get(
  "/protected/getUserAllShippingAddress/",
  validateToken,
  async (req: any, res: any) => {
    await getUserAllShippingAddress(req, res);
  }
);

router.put(
  "/protected/addShippingAddress",
  validateToken,
  async (req: any, res: any) => {
    await userAddShippingAddress(req, res);
  }
);

router.post(
  "/protected/updateShippingAddress",
  validateToken,
  async (req: any, res: any) => {
    await userUpdateShippingAddress(req, res);
  }
);
router.post(
  "/protected/deleteShippingAddress",
  validateToken,
  async (req: any, res: any) => {
    await userDeleteShippingAddress(req, res);
  }
);

///

module.exports = router;
