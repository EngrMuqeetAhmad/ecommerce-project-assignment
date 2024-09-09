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
        'ID' | 'userID' | 'createdAt' | 'deletedAt' | 'updatedAt'
      >
    >,
    id: number,
  ): Promise<number> {
    if (payload && typeof payload === 'object' && !Array.isArray(payload)) {
      const keys: (keyof Partial<
        Omit<
          ShippingAddressInput,
          'ID' | 'userID' | 'createdAt' | 'deletedAt' | 'updatedAt'
        >
      >)[] = Object.keys(payload) as (keyof Partial<
        Omit<
          ShippingAddressInput,
          'ID' | 'userID' | 'createdAt' | 'deletedAt' | 'updatedAt'
        >
      >)[];
      const [affectedRows]: Array<any> = await ShippingAddress.update(payload, {
        where: {
          ID: id,
        },
        fields: keys,
      });
      return affectedRows;
    }
    return 0;
  }
  public static async getAllShippingAddress(
    userID: number,
  ): Promise<Array<ShippingAddressOutput>> {
    console.log('shiipig address service', userID);
    const result: Array<ShippingAddressOutput> = await ShippingAddress.findAll({
      attributes: [
        'ID',
        'addressLine1',
        'addressLine2',
        'region',
        'city',
        'country',
        'postalCode',
        'userID',
        'createdAt',
        'updatedAt',
      ],

      where: {
        userID: {
          [Op.eq]: userID,
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
        ID: id,
      },
    });
    return result;
  }

  public static async deleteShippingAddress(id: number): Promise<number> {
    const result: number = await ShippingAddress.destroy({
      where: {
        ID: id,
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
