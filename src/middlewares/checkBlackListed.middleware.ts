import { NextFunction, Request, Response } from 'express';
import { blacklistedTokens } from '../utils/globals';

export const checkBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization');
  console.log('black list req.authorization', token);

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: 'Token is invalid' });
  }

  next();
};
