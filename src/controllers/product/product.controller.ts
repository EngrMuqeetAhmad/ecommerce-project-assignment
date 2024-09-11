import { Request, Response } from 'express';
import { Product } from '../../models/product.model';
import { ProductServices } from '../../services/product/product.service';
import { ProductInput, ProductOuput } from '../../types';
export class ProductControllers {
  public static async getAllProducts(req: Request, res: Response) {
    const { baseProductId } = req.params;
    let ID;
    try {
      ID = Number(baseProductId);
    } catch (error) {
      res.json({ error: 'Error - baseProductID is not a number' });
      return;
    }
    try {
      const data: Array<ProductOuput> =
        await ProductServices.getAllProducts(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting products' });
      return;
    }
  }

  public static async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const data: ProductOuput | null = await ProductServices.getProduct(ID);
      if (data != null) {
        res.status(200).json({ data: data });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error getting product' });
      return;
    }
  }

  public static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      await ProductServices.deleteProduct(ID);
      res.status(200).json({ message: 'Success deleting product ' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting product ' });
    }
  }
  public static async addProduct(req: Request, res: Response) {
    const { baseProductId, variationId, details, price } = req.body;
    const payload: ProductInput = {
      baseProductId,
      variationId,
      details, //json string
      price,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
    try {
      await ProductServices.addProduct(payload);
      res.status(200).json({ message: 'created product ' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product ' });
      return;
    }
  }
}
