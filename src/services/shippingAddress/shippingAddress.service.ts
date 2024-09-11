import { Op } from 'sequelize';
import { ShippingAddress } from '../../models/shippingAddress.model';
import {
  ShippingAddressInput,
  ShippingAddressOutput,
} from '../../types/shippingAddress.types';

export class ShippigAddressServices {
  public static async updateShippingAddress(
    payload: Partial<
      Omit<
        ShippingAddressInput,
        'id' | 'userId' | 'createdAt' | 'deletedAt' | 'updatedAt'
      >
    >,
    id: number,
  ): Promise<number> {
    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      const keys: (keyof Partial<
        Omit<
          ShippingAddressInput,
          'id' | 'userId' | 'createdAt' | 'deletedAt' | 'updatedAt'
        >
      >)[] = Object.keys(payload) as (keyof Partial<
        Omit<
          ShippingAddressInput,
          'id' | 'userId' | 'createdAt' | 'deletedAt' | 'updatedAt'
        >
      >)[];
      const [affectedRows]: Array<any> = await ShippingAddress.update(payload, {
        where: {
          id: id,
        },
        fields: keys,
      });
      return affectedRows;
    }
    return 0;
  }
  public static async getAllShippingAddress(
    userId: number,
  ): Promise<Array<ShippingAddressOutput>> {
    console.log('shiipig address service', userId);
    const result: Array<ShippingAddressOutput> = await ShippingAddress.findAll({
      attributes: [
        'id',
        'addressLine1',
        'addressLine2',
        'region',
        'city',
        'country',
        'postalCode',
        'userId',
        'createdAt',
        'updatedAt',
      ],

      where: {
        userId: {
          [Op.eq]: userId,
        },
      },
      raw: true,
    });
    console.log('shipping address service raw', result);
    return result;
  }
  public static async getShippingAddress(
    id: number,
  ): Promise<ShippingAddressOutput | null> {
    const result: ShippingAddressOutput | null = await ShippingAddress.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  public static async deleteShippingAddress(id: number): Promise<number> {
    const result: number = await ShippingAddress.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }

  public static async addShippingAddress(
    payload: ShippingAddressInput,
  ): Promise<void> {
    await ShippingAddress.create(payload);
    return;
  }
}
