import { Request, Response } from 'express';
import { VariationTypeServices } from '../../services/variationType/variationType.service';
import {
  TypesAndAssociatedValues,
  VariationTypeInput,
} from '../../types';
export class VariationTypeControllers {
  public static async getAllVariationTypes(req: Request, res: Response) {
    try {
      const data: Array<TypesAndAssociatedValues> =
        await VariationTypeServices.getAllVariationTypes();
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting v types' });
      return;
    }
  }

  public static async deleteVariationType(req: Request, res: Response) {
    const { type } = req.params;

    try {
      const result: number =
        await VariationTypeServices.deleteVariationType(type);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting v type' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting v type' });
    }
  }
  public static async addVariationType(req: Request, res: Response) {
    const { variationType } = req.body;

    const payload: VariationTypeInput = {
      variationType,
    };

    try {
      await VariationTypeServices.addVariationType(payload);
      res.status(200).json({ message: 'created variation type' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding variation type' });
      return;
    }
  }
}
