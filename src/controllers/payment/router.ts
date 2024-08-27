import express from 'express';
import { PaymentControllers } from './payment.controller';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/user.types';

export const PaymentRouter = express.Router();
const paymentControllers = new PaymentControllers();

PaymentRouter.put(
  '/protected/payment/checkout',
  validateToken,
  authorizeRole([Role.USER]),
  paymentControllers.calculatePayment,
  paymentControllers.createPaymentIntent,
);
PaymentRouter.get(
  '/protected/payment/getAllMethods',
  validateToken,
  authorizeRole([Role.USER]),
  paymentControllers.getAllPaymentMethods,
);
PaymentRouter.get(
  '/protected/payment/getMethod',
  validateToken,
  authorizeRole([Role.USER]),
  paymentControllers.getPaymentMethod,
);

PaymentRouter.delete(
  '/protected/payment/deleteMethod',
  validateToken,
  authorizeRole([Role.USER]),
  paymentControllers.deletePaymentMethod,
);

PaymentRouter.put(
  '/protected/payment/addMethod',
  validateToken,
  authorizeRole([Role.USER]),
  paymentControllers.createPaymentMethod,
);
