import { VariationImage } from '../../models/variationImage.model';
import {
  ProductVariationImgInput,
  ProductVariationImgOutput,
} from '../../types';

export class VariationImageServices {
  public static async getAllVariationImages(
    variationID: number,
  ): Promise<Array<ProductVariationImgOutput>> {
    const result: Array<ProductVariationImgOutput> =
      await VariationImage.findAll({
        where: {
          variationID: variationID,
        },
        raw: true,
      });
    return result;
  }

  public static async deleteImage(id: number): Promise<number> {
    const result: number = await VariationImage.destroy({
      where: {
        ID: id,
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
