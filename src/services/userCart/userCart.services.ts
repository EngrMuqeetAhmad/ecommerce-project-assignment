import { UserCartMapper } from '../../mappers/userCart.mapper';
import { UserCart } from '../../models/userCart.model';
import { UserCartInput, UserCartOutput } from '../../types';

export class UserCartServices {
  public async getWholeCart(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    try {
      let cart: Array<UserCartOutput>;
      const result: Array<any> = await UserCart.findAll({
        where: {
          userID: ID,
        },
      });
      cart = result.map((data: any) =>
        UserCartMapper.toUserCartDTOOutput(data),
      );
      res.status(200).json({ data: cart });
      return;
    } catch (error) {
      res.json({ error: 'Error getting cart' });
      return;
    }
  }

  public async deleteItemFromCart(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.body;

    try {
      await UserCart.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting cart ITEM' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting cart Item' });
    }
  }

  public async addItemToCart(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    const params = req.body;
    params.body.userID = ID;
    const payload: UserCartInput = UserCartMapper.toUserCartDTOInput(params);

    try {
      await UserCart.create(payload);
      res.status(200).json({ message: 'item added to cart' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding item to cart' });
      return;
    }
  }
}
