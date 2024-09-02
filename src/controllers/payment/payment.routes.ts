import express from 'express';
import { PaymentControllers } from './payment.controller';
import { calculatePayment } from '../../middlewares/calculatePayment.middleware';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';
import { checkBlacklist } from '../../middlewares/checkBlackListed.middleware';

export const PaymentRouter = express.Router();

PaymentRouter.put(
  '/checkout',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  calculatePayment,
  PaymentControllers.createPaymentIntent,
);
PaymentRouter.get(
  '/:userID',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.getAllPaymentMethods,
);
PaymentRouter.get(
  '/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.getPaymentMethod,
);

PaymentRouter.delete(
  '/:id',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.deletePaymentMethod,
);

PaymentRouter.put(
  '/addMethod',
  checkBlacklist,
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.createPaymentMethod,
);
