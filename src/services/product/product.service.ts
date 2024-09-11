import { Product } from '../../models/product.model';
import { ProductInput, ProductOuput } from '../../types';

export class ProductServices {
  public static async getAllProducts(
    baseProductId: number,
  ): Promise<Array<ProductOuput>> {
    const result: Array<ProductOuput> = await Product.findAll({
      where: {
        baseProductId: baseProductId,
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
        id: id,
      },
    });

    return result;
  }

  public static async addProduct(payload: ProductInput): Promise<void> {
    await Product.create(payload);

    return;
  }
}
