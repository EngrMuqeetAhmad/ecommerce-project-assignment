import { VariationTypeValueModel } from '../../models/variantTypeValue.model';
import { VariationTypeValueInput, VariationTypeValueOutput } from '../../types';

export class VariationTypeValueServices {
  public static async getAllVariationTypeValues(
    variationType: string,
  ): Promise<Array<VariationTypeValueOutput>> {
    const result: Array<VariationTypeValueOutput> =
      await VariationTypeValueModel.findAll({
        where: {
          variationType: variationType,
        },
      });

    return result;
  }

  public static async deleteVariationTypeValue(
    variationTypeValue: string,
  ): Promise<number> {
    const result: number = await VariationTypeValueModel.destroy({
      where: {
        variationTypeValue,
      },
    });
    return result;
  }

  public static async addVariationTypeValue(
    payload: VariationTypeValueInput,
  ): Promise<void> {
    await VariationTypeValueModel.create(payload);
    return;
  }
}
