import { z } from 'zod';
import {
  EmailSchema,
  ResetPasswordSchema,
  UserLoginSchema,
  UserRegisterSchema,
  UserUpdateSchema,
} from '../schema';

export type UserRegisterTypes = z.infer<typeof UserRegisterSchema>;

export type UserLoginTypes = z.infer<typeof UserLoginSchema>;

export type EmailType = z.infer<typeof EmailSchema>;

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

export interface User {
  ID: number;
  firstName: string; //
  secondName: string; //
  email: string;
  password: string;
  role: string; //
  isVerified: boolean;
  stripeID: string;
  createdAt?: Date;
  updatedAt?: Date;

  cartID?: number;
  wishTableID?: number;
}

export interface UserOutput extends Omit<User, 'password' | 'deletedAt'> {}

export interface UserRegisterInput
  extends Pick<User, 'firstName' | 'secondName' | 'email' | 'password'> {}

export interface UserState {
  isAuthenticated: boolean;
  user: Omit<User, 'password' | 'deletedAt' | 'stripeID'> | null;
}
