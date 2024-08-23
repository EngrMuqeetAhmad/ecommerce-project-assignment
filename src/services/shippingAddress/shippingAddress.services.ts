import { ShippingAddressMapper } from '../../mappers';
import { ShippingAddress } from '../../models/shippingAddress.model';
import {
  ShippingAddressInput,
  ShippingAddressOutput,
} from '../../types/shippingAddress.types';

export class ShippigAddressServices {
  public async updateShippingAddress(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const payload: Partial<ShippingAddress> =
      ShippingAddressMapper.toShippingAddressDTOInput(req.body);
    try {
      await ShippingAddress.update(payload, {
        where: {
          ID: req.body.ID,
        },
      });
      res
        .status(200)
        .json({ message: 'Successfully updated Shipping address' });
      return;
    } catch (error) {
      res.json({ error: 'Error updating shipping address' });
      return;
    }
  }
  public async getAllShippingAddress(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.user;
    try {
      let shippingAddress: Array<ShippingAddressOutput>;
      const result: Array<any> = await ShippingAddress.findAll({
        where: {
          userID: ID,
        },
      });
      shippingAddress = result.map((data: any) =>
        ShippingAddressMapper.toShippingAddressDTOOutput(data),
      );
      res.status(200).json({ data: shippingAddress });
      return;
    } catch (error) {
      res.json({ error: 'Error getting phone no' });
      return;
    }
  }
  public async getShippingAddress(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.body;
    try {
      let shippingAddress: ShippingAddressOutput;
      const result: any = await ShippingAddress.findOne({
        where: {
          ID: ID,
        },
      });
      shippingAddress =
        ShippingAddressMapper.toShippingAddressDTOOutput(result);
      res.status(200).json({ data: shippingAddress });
      return;
    } catch (error) {
      res.json({ error: 'Error getting shipping address' });
      return;
    }
  }

  public async deleteShippingAddress(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.body;

    try {
      await ShippingAddress.destroy({
        where: {
          ID: ID,
        },
      });
      res.status(200).json({ message: 'Success deleting Shipping Address' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting Shipping  Address' });
    }
  }

  public async addShippingAddress(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { ID } = req.user;
    const params = req.body;
    params.body.userID = ID;
    const payload: ShippingAddressInput =
      ShippingAddressMapper.toShippingAddressDTOInput(params);

    try {
      await ShippingAddress.create(payload);
      res.status(200).json({ message: 'Shipping Address added to user' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding Shipping Address to user' });
      return;
    }
  }
}
