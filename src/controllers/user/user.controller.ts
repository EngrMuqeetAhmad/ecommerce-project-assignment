import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserServices from '../../services/user/user.service';
import { UserInput, UserOutput, UserUpdate } from '../../types';
import { Role } from '../../utils/enum.util';

class UserControllers {
  public static async makeVerified(req: Request, res: Response) {
    const { email } = req.body;

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
    const email = req.body.email;
    console.log(email, password);
    try {
      const result: number = await UserServices.resetPassword(email, password);
      console.log('update resilt', result);
      if (result > 0) {
        req.body.user = undefined;
        res.status(200).json({ message: 'password updated succesfully' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(405).json({ error: 'Unable to update passwrod - try again' });
      return;
    }
  }
  public static async getMe(req: Request, res: Response) {
    const { ID } = req.body.user;
    console.log('user in body');
    try {
      const data: UserOutput | null = await UserServices.getUser(ID);
      console.log('success data', data);
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
  public static async getUserByID(req: Request, res: Response) {
    const { ID } = req.body;
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

  public static async userLogout(req: Request, res: Response) {
    const token = req.header('Authorization'); // Assumes Bearer token

    if (!token) {
      return res.status(400).json({ message: 'Token required' });
    }

    if (await UserServices.tokenBlackList(token)) {
      req.body.user = undefined;
      res.json({ message: 'Logout successful' });
    } else {
      res.json({ error: 'Logout failed' });
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
        error: 'Email or Password is Wrong',
        token: '',
      });
      return;
    }

    const SECRET = 'MuqeetAhmad';

    const token = jwt.sign(
      {
        ID: user?.id,
        email: user.email,
        role: user.role,
        stripeID: user.stripeID,
        cartID: user.cartId,
        wishTableID: user.wishTableId,
      },
      SECRET,
    );

    req.body.user = user;
    console.log('return token', token);
    res.status(200).json({
      token: token,
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
      password: password,
      isVerified: false,
      role: Role.USER,
      stripeID,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      cartId: 0,
      wishTableId: 0,
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
