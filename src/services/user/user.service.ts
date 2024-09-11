import { User } from '../../models/user.model';
import { UserCart } from '../../models/userCart.model';
import { UserWish } from '../../models/userWish.model';
import {
  UserInput,
  UserOutput,
  UserTypes,
  UserUpdate,
} from '../../types/user.types';
import { hashString } from '../../utils/passwordHashednSalated';
import { UserCartTypes, UserWishTypes } from '../../types';

class UserServices {
  private static blacklistedTokens = new Set();

  public static async makeVerified(email: string): Promise<number> {
    const [affectedRows] = await User.update(
      {
        isVerified: true,
      },
      {
        where: {
          email: email,
        },
      },
    );
    return affectedRows;
  }
  public static async resetPassword(
    email: string,
    password: string,
  ): Promise<number> {
    const [affectedRows] = await User.update(
      {
        password,
      },
      {
        where: {
          email: email,
        },
      },
    );
    return affectedRows;
  }

  public static async updateUser(
    payload: Partial<UserUpdate>,
    id: number,
  ): Promise<number> {
    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      const keys: (keyof UserUpdate)[] = Object.keys(
        payload,
      ) as (keyof UserUpdate)[];

      const [affectedRows] = await User.update(payload, {
        where: {
          id: id,
        },
        fields: keys,
      });
      return affectedRows;
    }
    return 0;
  }

  public static async getUser(id: number): Promise<UserOutput | null> {
    const data: UserOutput | null = await User.findByPk(id, {
      attributes: {
        exclude: ['password', 'deletedAt'],
      },
      raw: true,
    });
    return data;
  }

  public static async tokenBlackList(token: string): Promise<boolean> {
    try {
      this.blacklistedTokens.add(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  public static async userLogin(
    email: string,
    password: string,
  ): Promise<UserOutput | null> {
    const user: UserOutput | null = await User.findOne({
      attributes: {
        exclude: ['password', 'deletedAt'],
      },
      where: {
        email: email,
        password: hashString(password),
      },
      raw: true,
    });

    return user;
  }

  public static async userRegister(payload: UserInput): Promise<void> {
    await User.create(payload).then(async (user: Partial<UserTypes>) => {
      await UserCart.create({
        userId: user.id,
      }).then(async (cart: Partial<UserCartTypes>) => {
        await User.update(
          {
            cartId: cart.id,
          },
          {
            where: {
              id: user.id,
            },
          },
        );
      });
      await UserWish.create({
        userId: user.id,
      }).then(async (wish: Partial<UserWishTypes>) => {
        await User.update(
          {
            wishTableId: wish.id,
          },
          {
            where: {
              id: user.id,
            },
          },
        );
      });
    });
  }
}

export default UserServices;
