import { z } from 'zod';

export const PaymentMethodSchema = z.object({
  cardNumber: z.string().min(16).max(16).trim(),
  fullName: z.string(),
  expMonth: z.string().min(2).max(2),
  expYear: z.string().min(4).max(4),
  cvc: z.string(),
});

export const PaymentMethodOutputSchema = z.object({
  id: z.number(),
  userid: z.number(),
  fullName: z.string(),
  expMonth: z.number(),
  expYear: z.number(),
  lastFour: z.number(),
});
