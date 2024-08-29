import { Request, Response } from 'express';
import { VariationImageServices } from '../../services/productImages/productImages.service';
import {
  ProductVariationImgInput,
  ProductVariationImgOutput,
} from '../../types';
export class ProductImageControllers {
  public static async getAllVariationImages(req: Request, res: Response) {
    try {
      const { variationID } = req.body;
      const data: Array<ProductVariationImgOutput> =
        await VariationImageServices.getAllVariationImages(variationID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting product vairaitons images' });
      return;
    }
  }

  public static async deleteImage(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const result: number = await VariationImageServices.deleteImage(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting p variation image' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting p variatoin image' });
    }
  }
  public static async addImage(req: Request, res: Response) {
    const body = req.body;
    const payload: ProductVariationImgInput = {
      path: body.path,
      variationID: body.variationID,
    };

    try {
      await VariationImageServices.addImage(payload);
      res.status(200).json({ message: 'created product variation image' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product variation image' });
      return;
    }
  }
}
