import { UserCartMapper } from '../../mappers/userCart.mapper';
import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { UserCart } from '../../models/userCart.model';
import {
  CartProduct,
  CartProductInput,
  UserCartInput,
  UserCartOutput,
} from '../../types';

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

  public async updateIteminCart(req: any, res: any, next: any): Promise<void> {
    const { ID, quantity } = req.body;
    const payload: Omit<CartProduct, 'ID' | 'productID' | 'userID' | 'cartID'> =
      {
        quantity: quantity,
      };

    try {
      await CartProductJunction.update(
        {
          quantity: quantity,
        },
        {
          where: {
            ID: ID,
          },
        },
      );
      res.status(200).json({ message: 'Success deleting cart ITEM' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting cart Item' });
    }
  }

  public async deleteItemFromCart(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.body;

    try {
      await CartProductJunction.destroy({
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
    const { ID, cartID } = req.user;
    const { productID, quantity } = req.body;

    const payload: CartProductInput = {
      userID: ID,
      cartID: cartID,
      productID: productID,
      quantity: quantity,
    };

    try {
      await CartProductJunction.create(payload);
      res.status(200).json({ message: 'item added to cart' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding item to cart' });
      return;
    }
  }
}
