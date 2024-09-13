import { Request, Response } from 'express';
import { BaseProductServices } from '../../services/baseProduct/baseProduct.service';
import {
  BaseProductInput,
  BaseProductOuput,
  SubCategoryAssociatedProducts,
} from '../../types';
export class BaseProductControllers {
  public static async getAllBaseProducts(req: Request, res: Response) {
    try {
      const data: Array<BaseProductOuput> =
        await BaseProductServices.getAllBaseProducts();

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      console.log(error);
      res.json({ error: 'Error getting base products' });
      return;
    }
  }
  public static async getBaseProductsBySubCategory(
    req: Request,
    res: Response,
  ) {
    const { category, subCategory } = req.params;
    try {
      const data: SubCategoryAssociatedProducts | null =
        await BaseProductServices.getBaseProductsBySubCategory(
          category,
          subCategory,
        );

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      console.log(error);
      res.json({ error: 'Error getting base productasdfsadfasdf' });
      return;
    }
  }

  public static async getBaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const data: BaseProductOuput | null =
        await BaseProductServices.getBaseProduct(ID);

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting base product' });
      return;
    }
  }

  public static async deleteBaseProduct(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - userID is not a number' });
      return;
    }
    try {
      const result: number = await BaseProductServices.deleteBaseProduct(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting base product' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error occured' });
    }
  }
  public static async addBaseProduct(req: Request, res: Response) {
    const { title, description, basePrice, subCategoryId, brand } = req.body;
    const payload: BaseProductInput = {
      title,
      description,
      basePrice,
      subCategoryId,
      brand,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
    console.log(payload);
    try {
      await BaseProductServices.addBaseProduct(payload);
      res.status(200).json({ message: 'created base product' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding base product' });
      return;
    }
  }
}
