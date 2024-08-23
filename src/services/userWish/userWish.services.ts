import { UserWishMapper } from '../../mappers/userWish.mapper';
import { UserWish } from '../../models/userWish.model';
import { UserWishInput, UserWishOutput } from '../../types';

export class UserWishServices {
  public async getWholeWish(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    try {
      let cart: Array<UserWishOutput>;
      const result: Array<any> = await UserWish.findAll({
        where: {
          userID: ID,
        },
      });
      cart = result.map((data: any) =>
        UserWishMapper.toUserWishDTOOutput(data),
      );
      res.status(200).json({ data: cart });
      return;
    } catch (error) {
      res.json({ error: 'Error getting cart' });
      return;
    }
  }

  public async deleteItemFromWish(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.body;

    try {
      await UserWish.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting wish ITEM' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting wish Item' });
    }
  }

  public async addItemToWish(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    const params = req.body;
    params.body.userID = ID;
    const payload: UserWishInput = UserWishMapper.toUserWishDTOInput(params);

    try {
      await UserWish.create(payload);
      res.status(200).json({ message: 'item added to wish' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding item to wish' });
      return;
    }
  }
}
