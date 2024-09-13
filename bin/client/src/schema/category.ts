import { z } from 'zod';

export const CategorySchema = z.object({
  category: z.string(),
});
