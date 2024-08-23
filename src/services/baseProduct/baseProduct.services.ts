import { BaseProductMapper } from '../../mappers/baseProduct.mapper';
import { BaseProduct } from '../../models/baseProduct.model';
import { BaseProductInput, BaseProductOuput } from '../../types';

export class BaseProductServices {
  public async getBaseProduct(req: any, res: any, next: any): Promise<void> {
    const { baseProductID } = req.body;
    try {
      let data: BaseProductOuput;
      const result: any = await BaseProduct.findByPk(baseProductID);
      data = BaseProductMapper.toBaseProductDTOOutput(result);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting base product' });
      return;
    }
  }

  public async deleteBaseProduct(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await BaseProduct.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting base product' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting base product' });
    }
  }

  public async addBaseProduct(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: BaseProductInput =
      BaseProductMapper.toBaseProductDTOInput(params);

    try {
      await BaseProduct.create(payload);
      res.status(200).json({ message: 'created base product' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding base product' });
      return;
    }
  }
}
