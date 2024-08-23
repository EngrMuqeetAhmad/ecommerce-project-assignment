import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserMapper } from '../../mappers';
import { UserCartMapper } from '../../mappers/userCart.mapper';
import { User } from '../../models/user.model';
import { UserInput, UserOutput } from '../../types/user.types';
import { hashString } from '../../utils/passwordHashednSalated';

class UserServices {
  public async makeVerified(req: any, res: any, next: any): Promise<void> {
    const email = req.email;

    try {
      await User.update(
        {
          isVerified: true,
        },
        {
          where: {
            email: email,
          },
        },
      );
      res.status(200).json({ message: 'Email verified Successfully' });
    } catch (error) {
      res.json({ error: 'Error making verified' });
      return;
    }
  }
  public async resetPassword(req: any, res: any): Promise<void> {
    const { password } = req.body;
    const { token } = req.params;

    if (token) {
      jwt.verify(
        token,
        'MuqeetAhmad',
        async (err: any, decodedData: any): Promise<void> => {
          if (err) {
            res.json({ error: 'unable to verify email' });
            return;
          }

          try {
            await User.update(
              {
                password: hashString(password),
              },
              {
                where: {
                  email: decodedData?.email,
                },
              },
            );
            req.user = null;
            res.json({ message: 'password updated succesfully' });
            res.redirect('https://localhost:3000/login');
            return;
          } catch (error) {
            res.json({ error: 'Unable to update passwrod - try again' });
            return;
          }
        },
      );
    }
  }

  public async updateUser(req: any, res: any): Promise<void> {
    const payload: Partial<UserOutput> = UserMapper.toUserDTOUpdate(req.body);
    try {
      await User.update(payload, {
        where: {
          ID: req.body.ID,
        },
      });
      res.status(200).json({ message: 'Successfully updated User' });
      return;
    } catch (error) {
      res.json({ error: 'Error updating User' });
      return;
    }
  }

  public async getUser(req: any, res: any): Promise<void> {
    const user: UserOutput = UserMapper.toUserDTOOutput(req.user);
    res.status(200).json({
      data: user,
    });
    return;
  }

  public async userLogin(req: any, res: any): Promise<void> {
    const { email, password } = req.body;

    let user: UserOutput;

    const response: any = await User.findOne({
      attributes: [
        'ID',
        'firstName',
        'secondName',
        'email',
        'isVerified',
        'role',
        'stripeID',
        'createdAt',
        'updatedAt',
      ],
      where: {
        email: email,
        password: hashString(password),
      },
    });

    if (!response.ID) {
      res.status(404).json({
        message: 'Email or Password is Wrong',
      });
      return;
    }

    user = UserMapper.toUserDTOOutput(response);

    const SECRET = 'MuqeetAhmad';

    const token = jwt.sign(
      {
        ID: user?.ID,
        email: user.email,
        role: user.role,
        stripeID: user.stripeID,
      },
      SECRET,
    );

    req.user = user;

    res.status(200).json({
      data: {
        data: user,
        token: token,
      },
    });
    return;
  }

  public async verifyUserEmail(req: any, res: any) {
    const { token } = req.query;

    jwt.verify(
      token,
      'MuqeetAhmad',
      async (err: any, decodedData: any): Promise<void> => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden' });
        }

        const userData: any = await User.findOne({
          attributes: ['email', 'ID'],
          where: {
            email: decodedData?.email,
          },
        });

        if (!userData.ID) {
          res
            .status(404)
            .json({ message: 'User Not Found - email verification failed' });
          return;
        }

        await User.update(
          { isVerified: true },
          {
            where: {
              email: decodedData?.email,
            },
          },
        );

        res.status(200).json({
          message: 'User verified successfully - LogIn to continue',
        });
        return;
      },
    );
  }

  public async userRegister(req: any, res: any, next: any): Promise<void> {
    const params = req.body;
    params.stripeID = req.stripeID;
    params.cart = UserCartMapper.toUserCartDTOInput(req.body); ////create all beloging one-to-one table at user creation
    const payload: UserInput = UserMapper.toUserDTOInput(params);

    try {
      const result = await User.create(payload);
      console.log('result user and cart', result);
      params.accessRoute = 'emailVerification';
      // res.status(201).json({ message: 'user created - please verify email' });
      next();
    } catch (error: any) {
      console.log('error creating user', error);
      res.status(500).json({ error: 'Error creating user' });
      return;
    }
  }

  public async createStripe(req: any, res: any, next: any) {
    const { email, firstName, secondName } = req.body;
    dotenv.config();
    const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

    try {
      const customer = await stripe.customers.create({
        email: email,
        name: `${firstName} ${secondName}`,
      });
      console.log('ok stripe');
      //   res.status(201).json({ message: "OK stripe" });
      req.stripeID = customer.id;
      next();
    } catch (error) {
      console.log('error creating customer in stripe');
      return;
    }
  }
}

export default UserServices;
