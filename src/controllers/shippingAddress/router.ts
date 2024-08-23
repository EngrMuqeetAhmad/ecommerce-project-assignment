import express from 'express';
import {
  authorizeRole,
  validateToken,
} from '../../middlewares/validateToken.middleware';
import { Role } from '../../types/userTypes';
import { ShippingAddressControllers } from './shippingAddress.contoller';


export const shippingAddressRouter = express.Router();
const shippingAddressControllers = new ShippingAddressControllers();
shippingAddressRouter.get(
  '/protected/getShippingAddress/:id',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),

  shippingAddressControllers.getShippingAddress,
);

shippingAddressRouter.get(
  '/protected/getAllUserShippingAddress/',
  validateToken,
  authorizeRole([Role.ADMIN, Role.USER]),
  shippingAddressControllers.getAllShippingAddress,
);

shippingAddressRouter.put(
  '/protected/addShippingAddress',
  validateToken,
  authorizeRole([Role.USER]),
  shippingAddressControllers.addShippingAddress,
);

shippingAddressRouter.post(
  '/protected/updateShippingAddress',
  validateToken,
  authorizeRole([Role.USER]),
  shippingAddressControllers.updateShippingAddress,
);
shippingAddressRouter.delete(
  '/protected/deleteShippingAddress',
  validateToken,
  authorizeRole([Role.USER]),
  shippingAddressControllers.deleteShippingAddress,
);

///
