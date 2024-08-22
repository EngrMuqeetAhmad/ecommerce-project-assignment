import jwt from 'jsonwebtoken';

import { UserOutput } from '../types';
import User from '../models/user.model';
import { UserMapper } from '../mappers';
async function validateEmail(req: any, res: any, next: any) {
  const { token } = req.params;

  jwt.verify(token, 'MuqeetAhmad', async (err: any, decodedData: any) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    let user: UserOutput;
    const result: any = await User.findOne({
      attributes: ['ID', 'email', 'isVerified'],
      where: {
        email: decodedData?.email,
      },
    });
    user = UserMapper.toUserDTOOutput(result);

    if (user.email != decodedData?.email || !user.email) {
      res
        .status(404)
        .json({ message: 'User Not Found - email verification failed' });

      return;
    }
    if (!user.isVerified) {
      try {
        await User.update(
          {
            isVerified: true,
          },
          {
            where: {
              email: decodedData?.email,
            },
          },
        );
      } catch (error) {
        res
          .status(404)
          .json({ message: 'failed - updating user verification status' });
        return;
      }
    }
    res.status(200).json({ message: 'Email verified Successfully' });
    next();
    return;
  });
}

export { validateEmail };
