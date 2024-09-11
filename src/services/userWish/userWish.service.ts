
import { WishProductJuction } from '../../models/junctionModels/WishProduct.model';
import { UserWish } from '../../models/userWish.model';
import { UserWishOutput, WishProductInput } from '../../types';

export class UserWishServices {
  public static async getWholeWish(
    userId: number,
  ): Promise<Array<UserWishOutput>> {
    const result: Array<UserWishOutput> = await UserWish.findAll({
      where: {
        userId,
      },
    });
    return result;
  }

  public static async deleteItemFromWish(id: number): Promise<number> {
    const result: number = await WishProductJuction.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }

  public static async addItemToWish(payload: WishProductInput): Promise<void> {
    await WishProductJuction.create(payload);
    return;
  }
}
