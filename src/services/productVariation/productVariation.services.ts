import { ProductVariationMapper } from '../../mappers/productVariation.mapper';
import { ProductVariation } from '../../models/productVariation.model';
import { ProductVariationInput, ProductVariationOutput } from '../../types';

export class ProductVariationServices {
  public async getProductVariation(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    try {
      const { ID } = req.body;

      const result: any = await ProductVariation.findAll();

      const data: ProductVariationOutput =
        ProductVariationMapper.toDTOOutput(result);

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaiton' });
      return;
    }
  }

  public async getAllProductVariations(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    try {
      const { baseProductID } = req.body;
      let data: Array<ProductVariationOutput>;
      const result: any = await ProductVariation.findAll();
      data = result.map((item: ProductVariationOutput) =>
        ProductVariationMapper.toDTOOutput(item),
      );
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting p vairaitons' });
      return;
    }
  }

  public async deleteProductVariation(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.body;

    try {
      await ProductVariation.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting p variation' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting p variatoin' });
    }
  }

  public async addProductVariation(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const params = req.body;

    const payload: ProductVariationInput =
      ProductVariationMapper.toDTOInput(params);

    try {
      await ProductVariation.create(payload);
      res.status(200).json({ message: 'created product variation' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product variation' });
      return;
    }
  }
}
