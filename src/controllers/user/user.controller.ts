import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserServices from '../../services/user/user.service';
import { UserInput, UserOutput, UserUpdate } from '../../types';
import { Role } from '../../utils/enum.util';
import { hashString } from '../../utils/passwordHashednSalated';
class UserControllers {
  private static userServices: UserServices;

  public static async makeVerified(req: Request, res: Response) {
    const email = req.body.email;

    try {
      const result: number = await UserServices.makeVerified(email);
      if (result > 0) {
        res.status(200).json({ message: 'Email verified Successfully' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error making verified' });
      return;
    }
  }
  public static async resetPassword(req: Request, res: Response) {
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
            const result: number = await UserServices.resetPassword(
              decodedData,
              password,
            );
            if (result > 0) {
              req.body.user = null;
              res.json({ message: 'password updated succesfully' });
              res.redirect('https://localhost:3000/login');
              return;
            } else {
              throw new Error();
            }
          } catch (error) {
            res.json({ error: 'Unable to update passwrod - try again' });
            return;
          }
        },
      );
    }
  }
  public static async getUser(req: Request, res: Response) {
    const { ID } = req.body.user;
    try {
      const data: UserOutput | null = await UserServices.getUser(ID);

      res.status(200).json({
        data: data,
      });
      return;
    } catch (error) {
      res.json({
        error: 'error getting user',
      });
    }
  }
  public static async updateUser(req: Request, res: Response) {
    const { ID } = req.body.user;
    const payload: Partial<UserUpdate> = req.body;
    try {
      const result: number = await UserServices.updateUser(payload, ID);
      if (result > 0) {
        res.status(200).json({ message: 'Successfully updated User' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error updating User' });
      return;
    }
  }
  public static async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const user: UserOutput | null = await UserServices.userLogin(
      email,
      password,
    );

    if (user == null) {
      res.status(404).json({
        message: 'Email or Password is Wrong',
      });
      return;
    }

    const SECRET = 'MuqeetAhmad';

    const token = jwt.sign(
      {
        ID: user?.ID,
        email: user.email,
        role: user.role,
        stripeID: user.stripeID,
        cartID: user.cartID,
        wishTableID: user.wishTableID,
      },
      SECRET,
    );

    req.body.user = user;

    res.status(200).json({
      data: {
        data: user,
        token: token,
      },
    });
    return;
  }

  public static async userRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { firstName, secondName, email, password } = req.body;
    const stripeID: string = req.body.stripeID;

    const payload: UserInput = {
      firstName,
      secondName,
      email,
      password: hashString(password),
      isVerified: false,
      role: Role.USER,
      stripeID,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      cartID: 0,
      wishTableID: 0,
    };

    try {
      await UserServices.userRegister(payload);

      req.body.accessRoute = 'emailVerification';

      next();
    } catch (error: any) {
      console.log('error creating user', error);
      res.status(500).json({ error: 'Error creating user' });
      return;
    }
  }
}

export default UserControllers;
