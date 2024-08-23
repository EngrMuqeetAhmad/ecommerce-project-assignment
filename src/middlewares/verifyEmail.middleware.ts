import jwt from 'jsonwebtoken';

import { UserMapper } from '../mappers';
import { User } from '../models/user.model';
import { UserOutput } from '../types';
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
    req.email = decodedData?.email;

    next();
    return;
  });
}

export { validateEmail };
