import { VariationImagesMapper } from '../../mappers/variationImage.mapper';
import { VariationImage } from '../../models/variationImage.model';
import {
  ProductVariationImgInput,
  ProductVariationImgOutput,
} from '../../types';

export class VariationImageServices {
  

  public async getAllVariationImages(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    try {
      const { variationID } = req.body;
      let data: Array<ProductVariationImgOutput>;
      const result: any = await VariationImage.findAll({
        where: {
          variationID: variationID,
        },
      });
      data = result.map((item: ProductVariationImgOutput) =>
        VariationImagesMapper.toDTOOutput(item),
      );
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaitons images' });
      return;
    }
  }

  public async deleteImage(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await VariationImage.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting p variation image' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting p variatoin image' });
    }
  }

  public async addImage(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: ProductVariationImgInput =
      VariationImagesMapper.toDTOInput(params);

    try {
      await VariationImage.create(payload);
      res.status(200).json({ message: 'created product variation image' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product variation image' });
      return;
    }
  }
}
