import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../utils/enum.util';

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token.split(' ')[1], 'MuqeetAhmad', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.body.user = user;
    next();
  });
}

function authorizeRole(roles: Array<Role>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.body.user?.role)) {
      res.status(403).json({ message: 'UnAuthorized' });
      return;
    }
    next();
  };
}

export { validateToken, authorizeRole };
