import express from "express";
import { authorizeRole, validateToken } from "../utils/validateToken";
import { addOrder } from "../controllers/userOrder/addOrder";
import { deleteOrder } from "../controllers/userOrder/deleteOrder";
import { getOrder } from "../controllers/userOrder/getOrder";
import { Role } from "../types/userTypes";
import { getAllOrders } from "../controllers/userOrder/getAllOrders";

var router = express.Router();

///

router.put(
  "/protected/addOrder",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await addOrder(req, res);
  }
);

router.post(
  "/protected/deleteOrder",
  validateToken,
  authorizeRole([Role.USER]),
  async (req: any, res: any) => {
    await deleteOrder(req, res);
  }
);

router.get(
  "/protected/getOrder",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getOrder(req, res);
  }
);
router.get(
  "/protected/getAllOrders",
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  async (req: any, res: any) => {
    await getAllOrders(req, res);
  }
);

module.exports = router;
