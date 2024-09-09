import { Request, Response } from 'express';
import { ShippigAddressServices } from '../../services/shippingAddress/shippingAddress.service';
import { ShippingAddressInput, ShippingAddressOutput } from '../../types';
export class ShippingAddressControllers {
  public static async getAllShippingAddress(req: Request, res: Response) {
    const { ID } = req.body.user;
    console.log('shiipig address Controller', "ID");
    try {
     
      const data: Array<ShippingAddressOutput> =
        await ShippigAddressServices.getAllShippingAddress(ID);
        console.log(data)
      res.status(200).json({ data: data });
     
      return;
    } catch (error) {
      res.status(404).json({ error: 'Error getting shipping addresss' });
      return;
    }
  }
  public static async getShippingAddress(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const data: ShippingAddressOutput | null =
        await ShippigAddressServices.getShippingAddress(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting shipping address' });
      return;
    }
  }
  public static async updateShippingAddress(req: Request, res: Response) {
    // const {addressLine1, addressLine2, region, city, country, postalCode} = req.body
    const payload: Partial<
      Omit<
        ShippingAddressInput,
        'ID' | 'userID' | 'deletedAt' | 'createdAt' | 'updatedAt'
      >
    > = req.body;
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }

    try {
      const result: number = await ShippigAddressServices.updateShippingAddress(
        payload,
        ID,
      );
      if (result > 0) {
        res
          .status(200)
          .json({ message: 'Successfully updated Shipping address' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error updating shipping address' });
      return;
    }
  }
  public static async deleteShippingAddress(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      const result: number =
        await ShippigAddressServices.deleteShippingAddress(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting Shipping Address' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting Shipping  Address' });
      return;
    }
  }
  public static async addShippingAddress(req: Request, res: Response) {
    const { ID } = req.body.user;
    const { addressLine1, addressLine2, region, city, country, postalCode } =
      req.body;

    const payload: ShippingAddressInput = {
      addressLine1,
      addressLine2,
      region,
      city,
      country,
      postalCode,
      userID: ID,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };

    try {
      await ShippigAddressServices.addShippingAddress(payload);
      res.status(200).json({ message: 'Shipping Address added to user' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding Shipping Address to user' });
      return;
    }
  }
}
