import { VariationImage } from '../../models/variationImage.model';
import {
  ProductVariationImgInput,
  ProductVariationImgOutput,
} from '../../types';

export class VariationImageServices {
  public static async getAllVariationImages(
    variationId: number,
  ): Promise<Array<ProductVariationImgOutput>> {
    const result: Array<ProductVariationImgOutput> =
      await VariationImage.findAll({
        where: {
          variationId: variationId,
        },
        raw: true,
      });
    return result;
  }

  public static async deleteImage(id: number): Promise<number> {
    const result: number = await VariationImage.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }

  public static async addImage(
    payload: ProductVariationImgInput,
  ): Promise<void> {
    await VariationImage.create(payload);

    return;
  }
}
