import { BaseProduct } from '../../models/baseProduct.model';
import { BaseProductInput, BaseProductOuput } from '../../types';

export class BaseProductServices {
  public static async getBaseProduct(
    id: number,
  ): Promise<BaseProductOuput | null> {
    const result: BaseProductOuput | null = await BaseProduct.findByPk(id, {
      raw: true,
    });

    return result;
  }

  public static async deleteBaseProduct(id: number): Promise<number> {
    const result: number = await BaseProduct.destroy({
      where: {
        ID: id,
      },
    });

    return result;
  }

  public static async addBaseProduct(payload: BaseProductInput): Promise<void> {
    await BaseProduct.create(payload);

    return;
  }
}
