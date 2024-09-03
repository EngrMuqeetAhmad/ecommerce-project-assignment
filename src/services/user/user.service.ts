import { User } from '../../models/user.model';
import { UserCart } from '../../models/userCart.model';
import { UserWish } from '../../models/userWish.model';
import { UserInput, UserOutput, UserUpdate } from '../../types/user.types';
import { hashString } from '../../utils/passwordHashednSalated';

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
          ID: id,
        },
        fields: keys,
      });
      return affectedRows;
    }
    return 0;
  }

  public static async getUser(id: number): Promise<UserOutput | null> {
    const data: UserOutput | null = await User.findByPk(id, {
      attributes: [
        'ID',
        'firstName',
        'secondName',
        'email',
        'isVerified',
        'role',
        'cartID',
        'wishTableID',
        'stripeID',
        'createdAt',
        'updatedAt',
      ],
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
      attributes: [
        'ID',
        'firstName',
        'secondName',
        'email',
        'isVerified',
        'role',
        'cartID',
        'wishTableID',
        'stripeID',
        'createdAt',
        'updatedAt',
      ],
      where: {
        email: email,
        password: hashString(password),
      },
      raw: true,
    });

    return user;
  }

  public static async userRegister(payload: UserInput): Promise<void> {
    await User.create(payload).then(async (user) => {
      await UserCart.create({
        userID: user.ID,
      }).then(async (cart) => {
        await User.update(
          {
            cartID: cart.ID,
          },
          {
            where: {
              ID: user.ID,
            },
          },
        );
      });
      await UserWish.create({
        userID: user.ID,
      }).then(async (wish) => {
        await User.update(
          {
            wishTableID: wish.ID,
          },
          {
            where: {
              ID: user.ID,
            },
          },
        );
      });
    });
  }
}

export default UserServices;
