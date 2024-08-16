import express from "express";
import { validateToken } from "../utils/validateToken";
import { addOrder } from "../controllers/userOrder/addOrder";
import { deleteOrder } from "../controllers/userOrder/deleteOrder";
import { getOrder } from "../controllers/userOrder/getOrder";

var router = express.Router();

///

router.put("/protected/addOrder", validateToken, async (req: any, res: any) => {
  await addOrder(req, res);
});

router.post(
  "/protected/deleteOrder",
  validateToken,
  async (req: any, res: any) => {
    await deleteOrder(req, res);
  }
);

router.get("/protected/getOrder", validateToken, async (req: any, res: any) => {
  await getOrder(req, res);
});

module.exports = router;
