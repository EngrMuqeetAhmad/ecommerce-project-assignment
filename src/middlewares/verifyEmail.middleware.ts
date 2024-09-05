import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import { UserOutput } from '../types';
async function validateEmail(req: Request, res: Response, next: NextFunction) {
  const { token } = req.params;
  console.log('emial validat token', token);
  jwt.verify(token, 'MuqeetAhmad', async (err: any, decodedData: any) => {
    console.log(err);
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    let user: UserOutput | null = await User.findOne({
      attributes: ['ID', 'email', 'isVerified'],
      where: {
        email: decodedData?.email,
      },
      raw: true,
    });
    console.log(user);

    if (user?.email != decodedData?.email || !user?.email) {
      res
        .status(404)
        .json({ message: 'User Not Found - email verification failed' });

      return;
    }
    req.body.email = decodedData?.email;
    console.log('validation token success');
    next();
  });
}

export { validateEmail };
