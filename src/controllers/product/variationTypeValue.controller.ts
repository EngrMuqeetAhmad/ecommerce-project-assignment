import { Request, Response } from 'express';
import { VariationTypeValueServices } from '../../services/variationTypeValue/variationTypeValue.service';
import {
  AssociatedVariationValues,
  VariationTypeValueInput,
  VariationTypeValueOutput,
} from '../../types';

export class VariationTypeValueControllers {
  public static async getAllVariationTypeValues(req: Request, res: Response) {
    const { typeId } = req.params;
    let ID;
    try {
      ID = Number(typeId);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const data: AssociatedVariationValues =
        await VariationTypeValueServices.getValuesByType(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting v types values' });
      return;
    }
  }

  public static async deleteVariationTypeValue(req: Request, res: Response) {
    const { value } = req.params;

    try {
      const result: number =
        await VariationTypeValueServices.deleteVariationTypeValue(value);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting v type value' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting v type value' });
    }
  }
  public static async addVariationTypeValue(req: Request, res: Response) {
    const { typeId, variationTypeValue } = req.body;

    const payload: VariationTypeValueInput = {
      variationTypeValue,
      typeId,
    };
    try {
      await VariationTypeValueServices.addVariationTypeValue(payload);
      res.status(200).json({ message: 'created variation type value' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding variation type value' });
      return;
    }
  }
}
