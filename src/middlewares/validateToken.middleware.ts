import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestUser } from '../types';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  console.log('incoming token in validation', token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized middleware' });
  }

  jwt.verify(token, 'MuqeetAhmad', (err: any, user: any) => {
    console.log('inside jwt');
    if (err) {
      console.log(err);
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
    console.log(reqUser);
    req.body.user = reqUser;
    next();
    console.log('after valiate toke authorized');
  });
}

function authorizeRole(roles: Array<string | undefined>) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('roles', roles, 'req.body', req.body.user.role);
    if (!roles.includes(req.body.user?.role)) {
      res.status(403).json({ message: 'UnAuthorized' });
      return;
    }
    console.log('role authorized');
    next();
    console.log('after role authorized');
  };
}

export { validateToken, authorizeRole };
