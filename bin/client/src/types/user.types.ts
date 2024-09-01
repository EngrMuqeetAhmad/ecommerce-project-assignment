import { z } from 'zod';
import {
  EmailSchema,
  ResetPasswordSchema,
  UserLoginSchema,
  UserRegisterSchema,
} from '../schema';

export type UserRegisterTypes = z.infer<typeof UserRegisterSchema>;

export type UserLoginTypes = z.infer<typeof UserLoginSchema>;

export type EmailType = z.infer<typeof EmailSchema>;

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
