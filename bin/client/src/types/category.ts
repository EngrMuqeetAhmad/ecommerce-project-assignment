import { z } from 'zod';
import { CategorySchema } from '../schema/category';

export type CategoryTypes = z.infer<typeof CategorySchema>;
