import { VariationTypeModel } from '../../models/variantionType.models';
import { VariationTypeValueModel } from '../../models/variantTypeValue.model';
import {
  TypesAndAssociatedValues,
  VariationTypeInput,
} from '../../types';

export class VariationTypeServices {
  public static async getAllVariationTypes(): Promise<
    Array<TypesAndAssociatedValues>
  > {
    const result: Array<TypesAndAssociatedValues> =
      await VariationTypeModel.findAll({
        include: {
          model: VariationTypeValueModel,
        },
      });
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
