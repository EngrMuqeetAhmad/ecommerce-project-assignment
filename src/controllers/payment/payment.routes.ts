import express from 'express';
import { PaymentControllers } from './payment.controller';
import { calculatePayment } from '../../middlewares/calculatePayment.middleware';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../utils/enum.util';

export const PaymentRouter = express.Router();

PaymentRouter.put(
  '/checkout',
  validateToken,
  authorizeRole([Role.USER]),
  calculatePayment,
  PaymentControllers.createPaymentIntent,
);
PaymentRouter.get(
  '/:userID',
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.getAllPaymentMethods,
);
PaymentRouter.get(
  '/:id',
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.getPaymentMethod,
);

PaymentRouter.delete(
  '/:id',
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.deletePaymentMethod,
);

PaymentRouter.put(
  '/addMethod',
  validateToken,
  authorizeRole([Role.USER]),
  PaymentControllers.createPaymentMethod,
);
