import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../utils/enum.util';
import { RequestUser } from '../types';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  console.log('incoming token in validation', token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized middleware' });
  }

  jwt.verify(token, 'MuqeetAhmad', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { ID, email, role, stripeID, cartID, wishTableID } = user;
    const reqUser: RequestUser = {
      ID,
      email,
      role,
      stripeID,
      cartID,
      wishTableID,
    };

    req.body.user = reqUser;
    next();
  });
}

function authorizeRole(roles: Array<string | undefined>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.body.user?.role)) {
      res.status(403).json({ message: 'UnAuthorized' });
      return;
    }
    next();
  };
}

export { validateToken, authorizeRole };
