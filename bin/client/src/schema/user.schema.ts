import { z } from 'zod'

export const UserRegisterSchema = z.object({
    firstName: z.string().regex(/^[A-Za-z]+$/, { message: "Only Alphabets are allowed" }).min(3, { message: "min characters 3" }).max(255, { message: "max characters 255" }).toLowerCase(),
    secondName: z.string().regex(/^[A-Za-z]+$/, { message: "Only Alphabets are allowed" }).min(1, { message: "min characters 1" }).max(255, { message: "max characters 255" }).toLowerCase(),
    email: z.string().email({ message: "email format error" }),
    password: z.string().min(6, { message: "min length 6" }).max(255, { message: "max legth 255" }).refine((password: string) => {
        const hasAlphabet = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasAlphabet && hasNumber && hasSpecialChar;
    }, { message: "Password must be alphanumeric, special chars" })
})

