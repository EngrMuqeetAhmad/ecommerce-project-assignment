import { z } from 'zod';
import {
  PaymentMethodOutputSchema,
  PaymentMethodSchema,
} from '../schema/paymentMethod';

export type PaymentMethodTypes = z.infer<typeof PaymentMethodSchema>;
export type PaymentMethodOutputTypes = z.infer<
  typeof PaymentMethodOutputSchema
>;
