import { VariationTypeMapper } from '../../mappers/variantTypes.mapper';
import { VariationTypeModel } from '../../models/variantionType.models';
import { VariationTypeInput, VariationTypeOutput } from '../../types';

export class VariationTypeServices {
  public async getAllVariationTypes(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    try {
      let data: Array<VariationTypeOutput>;
      const result: any = await VariationTypeModel.findAll();
      data = result.map((item: VariationTypeOutput) => VariationTypeMapper.toDTOOutput(item));
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting v types' });
      return;
    }
  }

  public async deleteVariationType(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { variationType } = req.body;

    try {
      await VariationTypeModel.destroy({
        where: {
          variationType: variationType,
        },
      });
      res.status(200).json({ message: 'Success deleting v type' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting v type' });
    }
  }

  public async addVariationType(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: VariationTypeInput = VariationTypeMapper.toDTOInput(params);

    try {
      await VariationTypeModel.create(payload);
      res.status(200).json({ message: 'created variation type' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding variation type' });
      return;
    }
  }
}
