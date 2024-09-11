import { VariationTypeModel } from '../../models/variantionType.models';
import { VariationTypeValueModel } from '../../models/variantTypeValue.model';
import {
  AssociatedVariationValues,
  VariationTypeValueInput,
} from '../../types';

export class VariationTypeValueServices {
  public static async getValuesByType(
    typeId: number,
  ): Promise<AssociatedVariationValues> {
    const result: AssociatedVariationValues = await VariationTypeModel.findOne({
      include: {
        model: VariationTypeValueModel,
        where: {
          typeId: typeId,
        },
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
