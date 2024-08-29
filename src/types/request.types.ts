import { Request } from 'express';

interface USER {
  ID: number;
  email: string;
  role: string;
  stripeID: string;
  cartID: number;
  wishTableID: number;
}

export interface CustomRequest extends Request {
  user: USER;
}
