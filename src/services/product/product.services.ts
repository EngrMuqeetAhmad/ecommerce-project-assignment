import { ProductMapper } from '../../mappers/product.mapper';
import { Product } from '../../models/product.model';
import { ProductInput, ProductOuput } from '../../types';

export class ProductServices {
  public async getAllProducts(req: any, res: any, next: any): Promise<void> {
    try {
      const { baseProductID } = req.body;
      let data: Array<ProductOuput>;
      const result: any = await Product.findAll({
        where: {
          baseProductID: baseProductID,
        },
      });

       data = result.map((item: ProductOuput) => ProductMapper.toDTOOutput(item)) 

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting products' });
      return;
    }
  }
  public async getProduct(req: any, res: any, next: any): Promise<void> {
    try {
      const { ID } = req.body;

      const result: any = await Product.findOne({
        where: {
          ID: ID,
        },
      });

      const data: ProductOuput = ProductMapper.toDTOOutput(result);

      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting product' });
      return;
    }
  }

  public async deleteProduct(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;

    try {
      await Product.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting product ' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting product ' });
    }
  }

  public async addProduct(req: any, res: any, next: any): Promise<void> {
    const params = req.body;

    const payload: ProductInput = ProductMapper.toDTOInput(params);

    try {
      await Product.create(payload);
      res.status(200).json({ message: 'created product ' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding product ' });
      return;
    }
  }
}
