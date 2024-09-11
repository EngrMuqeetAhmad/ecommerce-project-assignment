import { Request, Response } from 'express';
import { UserWishServices } from '../../services/userWish/userWish.service';
import { UserWishOutput, WishProductInput } from '../../types';

export class UserWishControllers {
  public static async getWholeWish(req: Request, res: Response) {
    const { ID } = req.body.user;
    try {
      const data: Array<UserWishOutput> =
        await UserWishServices.getWholeWish(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting cart' });
      return;
    }
  }

  public static async deleteFromWish(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const result: number = await UserWishServices.deleteItemFromWish(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting wish ITEM' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting wish Item' });
    }
  }
  public static async addToWish(req: Request, res: Response) {
    const { wishTableID } = req.body.user;
    const { productId } = req.body;

    const payload: WishProductInput = {
      wishTableId: wishTableID,
      productId,
    };

    try {
      await UserWishServices.addItemToWish(payload);
      res.status(200).json({ message: 'item added to wish' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding item to wish' });
      return;
    }
  }
}
