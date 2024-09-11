import { Request, Response } from 'express';
import { UserCartServices } from '../../services/userCart/userCart.service';
import { UserCartOutput } from '../../types';
import {
  CartProduct,
  CartProductInput,
} from '../../types/CartProductJunction.types';

export class UserCartControllers {
  public static async getWholeCart(req: Request, res: Response) {
    const { ID } = req.body.user;
    try {
      const data: Array<UserCartOutput> =
        await UserCartServices.getWholeCart(ID);

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting cart' });
      return;
    }
  }

  public static async updateQuantity(req: Request, res: Response) {
    const { ID, quantity } = req.body;
    const payload: Omit<CartProduct, 'id' | 'productId' | 'userId' | 'cartId'> =
      {
        quantity: quantity,
      };

    try {
      const result: number = await UserCartServices.updateItemQuantity(
        payload,
        ID,
      );
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting cart ITEM' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting cart Item' });
    }
  }

  public static async deleteFromCart(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }

    try {
      const result: number = await UserCartServices.deleteItemFromCart(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting cart ITEM' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting cart Item' });
    }
  }
  public static async addToCart(req: Request, res: Response) {
    const { ID, cartID } = req.body.user;
    const { productID, quantity } = req.body;

    const payload: CartProductInput = {
      userId: ID,
      cartId: cartID,
      productId: productID,
      quantity: quantity,
    };

    try {
      await UserCartServices.addItemToCart(payload);
      res.status(200).json({ message: 'item added to cart' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding item to cart' });
      return;
    }
  }
}
