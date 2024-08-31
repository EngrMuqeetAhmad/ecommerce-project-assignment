import { z } from "zod";
import { UserRegisterSchema } from "../schema";

export type UserRegisterTypes = z.infer<typeof UserRegisterSchema>