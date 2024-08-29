import { VariationTypeModel } from '../../models/variantionType.models';
import { VariationTypeInput, VariationTypeOutput } from '../../types';

export class VariationTypeServices {
  public static async getAllVariationTypes(): Promise<
    Array<VariationTypeOutput>
  > {
    const result: Array<VariationTypeOutput> =
      await VariationTypeModel.findAll();
    return result;
  }

  public static async deleteVariationType(
    variationType: string,
  ): Promise<number> {
    const result: number = await VariationTypeModel.destroy({
      where: {
        variationType,
      },
    });
    return result;
  }

  public static async addVariationType(
    payload: VariationTypeInput,
  ): Promise<void> {
    await VariationTypeModel.create(payload);
  }
}
