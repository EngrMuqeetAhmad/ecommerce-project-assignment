import express from "express";
import { createPaymentFlow } from "../controllers/paymentFlow/customPaymentFlow";
import { authorizeRole, validateToken } from "../utils/validateToken";
import { Role } from "../types/userTypes";

var router = express.Router();
/* GET home page. */
router.post(
  "/createPayment",
  validateToken,
  authorizeRole([Role.USER]),
  async function (req: any, res: any) {
    await createPaymentFlow(req, res);
  }
);

module.exports = router;
