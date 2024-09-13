import { z } from 'zod';

export const ShippingAddressSchema = z.object({
  id: z.number(),
  addressLine1: z.string().toLowerCase(),
  addressLine2: z.string().toLowerCase(),
  region: z.string().toLowerCase(),
  city: z.string().toLowerCase(),
  country: z.string().toLowerCase(),
  postalCode: z.string().toLowerCase(),
  userid: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const ShippingAddressInputSchema = z.object({
  addressLine1: z.string().toLowerCase(),
  addressLine2: z.string().toLowerCase(),
  region: z.string().toLowerCase(),
  city: z.string().toLowerCase(),
  country: z.string().toLowerCase(),
  postalCode: z.string().toLowerCase(),
});
