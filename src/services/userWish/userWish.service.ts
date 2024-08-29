import { WishProductJunction } from '../../models/junctionModels/WishProduct.model';
import { UserWish } from '../../models/userWish.model';
import { UserWishOutput, WishProductInput } from '../../types';

export class UserWishServices {
  public static async getWholeWish(
    userID: number,
  ): Promise<Array<UserWishOutput>> {
    const result: Array<UserWishOutput> = await UserWish.findAll({
      where: {
        userID,
      },
    });
    return result;
  }

  public static async deleteItemFromWish(id: number): Promise<number> {
    const result: number = await WishProductJunction.destroy({
      where: {
        ID: id,
      },
    });
    return result;
  }

  public static async addItemToWish(payload: WishProductInput): Promise<void> {
    await WishProductJunction.create(payload);
    return;
  }
}
