import { z } from 'zod';

export const UserRegisterSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Only Alphabets are allowed' })
    .min(3, { message: 'min characters 3' })
    .max(255, { message: 'max characters 255' })
    .toLowerCase(),
  secondName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Only Alphabets are allowed' })
    .min(1, { message: 'min characters 1' })
    .max(255, { message: 'max characters 255' })
    .toLowerCase(),
  email: z.string().email({ message: 'email format error' }),
  password: z
    .string()
    .min(6, { message: 'min length 6' })
    .max(255, { message: 'max legth 255' })
    .refine(
      (password: string) => {
        const hasAlphabet = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasAlphabet && hasNumber && hasSpecialChar;
      },
      { message: 'Password must be alphanumeric, special chars' }
    ),
});
export const UserUpdateSchema = z.object({
  firstName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Only Alphabets are allowed' })
    .min(3, { message: 'min characters 3' })
    .max(255, { message: 'max characters 255' })
    .toLowerCase(),
  secondName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Only Alphabets are allowed' })
    .min(1, { message: 'min characters 1' })
    .max(255, { message: 'max characters 255' })
    .toLowerCase(),
  role: z.string().toLowerCase(),
});
export const UserLoginSchema = z.object({
  email: z.string().email({ message: 'Please provide correct email' }),
  password: z
    .string({ message: 'Please provide the password' })
    .min(6, { message: 'min 6 characters' }),
});

export const EmailSchema = z.object({
  email: z.string().email({ message: 'Please provide correct email' }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'min length 6' })
      .max(255, { message: 'max legth 255' })
      .refine(
        (password: string) => {
          const hasAlphabet = /[a-zA-Z]/.test(password);
          const hasNumber = /\d/.test(password);
          const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
          return hasAlphabet && hasNumber && hasSpecialChar;
        },
        { message: 'Password must be alphanumeric, special chars' }
      ),
    confirmPassword: z
      .string()
      .min(6, { message: 'min length 6' })
      .max(255, { message: 'max legth 255' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'], // Error message will be associated with confirmPassword field
  });
