import { VariationTypeValueMapper } from '../../mappers/variantTypeValue.mapper';
import { VariationTypeValueModel } from '../../models/variantTypeValue.model';
import { VariationTypeValueInput, VariationTypeValueOutput } from '../../types';

export class VariationTypeValueServices {
  public async getAllVariationTypeValues(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { variationType } = req.body;
    try {
      let data: Array<VariationTypeValueOutput>;
      const result: any = await VariationTypeValueModel.findAll({
        where: {
          variationType: variationType,
        },
      });
      data = result.map((item: VariationTypeValueOutput) =>
        VariationTypeValueMapper.toDTOOutput(item),
      );
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting v types values' });
      return;
    }
  }

  public async deleteVariationTypeValue(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { variationTypeValue } = req.body;

    try {
      await VariationTypeValueModel.destroy({
        where: {
          variationTypeValue: variationTypeValue,
        },
      });
      res.status(200).json({ message: 'Success deleting v type value' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting v type value' });
    }
  }

  public async addVariationTypeValue(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const params = req.body;

    const payload: VariationTypeValueInput =
      VariationTypeValueMapper.toDTOInput(params);

    try {
      await VariationTypeValueModel.create(payload);
      res.status(200).json({ message: 'created variation type value' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding variation type value' });
      return;
    }
  }
}
