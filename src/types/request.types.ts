import { Request } from 'express';
import { RequestUser } from './user.types';


 interface CustomRequest extends Request {
  user: Partial<RequestUser>;
}
