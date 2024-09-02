import { NextFunction, Request, Response } from 'express';
import { blacklistedTokens } from '../utils/globals';

export const checkBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
 
) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  if (blacklistedTokens.has(token)) {
    return res.status(401).json({ message: 'Token is invalid' });
  }

  next();
};
