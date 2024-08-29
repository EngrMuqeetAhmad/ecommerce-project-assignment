import { Request, Response } from 'express';
import { UserOrderServices } from '../../services/userOrder/userOrder.service';
import { UserOrderAndProductOutput, UserOrderInput } from '../../types';
import { STATUS } from '../../utils/enum.util';

export class UserOrderControllers {
  private static userOrderServices: UserOrderServices;

  public static async getAllOrders(req: Request, res: Response) {
    const { ID } = req.body.user;
    try {
      const data: Array<UserOrderAndProductOutput> =
        await UserOrderServices.getAllOrders(ID);
      if (data.length == 0) {
        res.status(200).json({ message: 'no data fount' });
        return;
      }
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting orders' });
      return;
    }
  }

  public static async getOrder(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      // let order;

      const data: UserOrderAndProductOutput | null =
        await UserOrderServices.getOrder(ID);
      res.status(200).json({ data: data });
      return;
    } catch (error) {
      res.json({ error: 'Error getting order' });
      return;
    }
  }

  public static async deleteOrder(req: Request, res: Response) {
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
        await UserOrderServices.deleteOrderAndAssociatedProducts(ID);
      if (result > 0) {
        res.status(200).json({ message: 'Success deleting ORDER AND ITEMS' });
        return;
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ error: 'Error deleting order and Item' });
    }
  }
  public static async createOrder(req: Request, res: Response) {
    const { ID } = req.body.user; //id
    const { shippingAddressID, totalAmount, paymentID } = req.body; // shipp add ID, paymentID, totalAmount

    const payload: UserOrderInput = {
      shippingAddressID,
      paymentID,
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
      userID: ID,
      status: STATUS.PENDING,
    };

    try {
      await UserOrderServices.createOrder(payload);
      res.json({ message: 'success creating order' });
    } catch (error) {
      res.json({ error: 'Error creating order' });
      return;
    }
  }
}
