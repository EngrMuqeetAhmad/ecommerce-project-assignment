import { z } from 'zod';
import {
  ShippingAddressSchema,
  ShippingAddressInputSchema,
} from '../schema/shippingAddress';

export type ShippingAddressTypes = z.infer<typeof ShippingAddressSchema>;

export type ShippingAddressInput = z.infer<typeof ShippingAddressInputSchema>;
