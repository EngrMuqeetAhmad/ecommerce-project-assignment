import { Product } from '../../models/product.model';
import { ProductInput, ProductOuput } from '../../types';

export class ProductServices {
  public static async getAllProducts(
    baseProductID: number,
  ): Promise<Array<ProductOuput>> {
    const result: Array<ProductOuput> = await Product.findAll({
      where: {
        baseProductID: baseProductID,
      },
    });

    return result;
  }
  public static async getProduct(id: number): Promise<ProductOuput | null> {
    const result: ProductOuput | null = await Product.findByPk(id, {
      raw: true,
    });
    return result;
  }

  public static async deleteProduct(id: number): Promise<number> {
    const result: number = await Product.destroy({
      where: {
        ID: id,
      },
    });

    return result;
  }

  public static async addProduct(payload: ProductInput): Promise<void> {
    await Product.create(payload);

    return;
  }
}
