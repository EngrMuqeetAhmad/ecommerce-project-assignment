import { Request, Response } from 'express';
import { ProductVariationServices } from '../../services/productVariation/productVariation.service';
import { ProductVariationInput, ProductVariationOutput } from '../../types';
export class ProductVariationControllers {
  public static async getProductVariations(req: Request, res: Response) {
    const { baseProductID } = req.params;
    let ID;
    try {
      ID = Number(baseProductID);
    } catch (error) {
      res.json({ error: 'Error - baseProductID is not a number' });
      return;
    }
    try {
      const data: Array<ProductVariationOutput> =
        await ProductVariationServices.getProductVariations(ID);

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaitons' });
      return;
    }
  }

  public static async deleteProductVariation(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const result: number =
        await ProductVariationServices.deleteProductVariation(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting p variation' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting p variatoin' });
    }
  }
  public static async addProductVariation(req: Request, res: Response) {
    const body = req.body;

    const payload: ProductVariationInput = {
      productID: body.productID,
      stockQuantity: body.stockQuantity,
      additionPrice: body.stockQuantity,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };

    try {
      await ProductVariationServices.addProductVariation(payload);
      res.status(200).json({ message: 'created product variation' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product variation' });
      return;
    }
  }
}
