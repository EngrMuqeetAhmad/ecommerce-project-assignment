import { z } from 'zod';
export const BaseProduct = z.object({
  title: z.string().min(10).max(255),
  description: z.string().min(10).max(255),
  basePrice: z.string(),
  subCategory: z.string(),
  brand: z.string(),
});
