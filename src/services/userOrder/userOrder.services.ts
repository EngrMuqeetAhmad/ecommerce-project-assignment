import { Op } from 'sequelize';
import { UserOrderMapper } from '../../mappers/userOrder.mapper';
import { UserOrder } from '../../models/userOrder.model';

import { UserOrderInput, UserOrderOutput } from '../../types';
import { STATUS } from '../../types/userOrder.types';

export class UserOrderServices {
  public async getAllOrders(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    try {
      let cart: Array<UserOrderOutput>;
      const result: Array<any> = await UserOrder.findAll({
        where: {
          userID: ID,
        },
      });
      cart = result.map((data: any) =>
        UserOrderMapper.toUserOrderDTOOutput(data),
      );
      res.status(200).json({ data: cart });
      return;
    } catch (error) {
      res.json({ error: 'Error getting cart' });
      return;
    }
  }
  public async getOrder(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user;
    const { orderID } = req.body;
    try {
      // let order;

      let orderInfo: UserOrderOutput;
      const result: any = await UserOrder.findAll({
        where: {
          ID: orderID,
        },
      });
      orderInfo = UserOrderMapper.toUserOrderDTOOutput(result);

      res.status(200).json({ data: orderInfo });
      return;
    } catch (error) {
      res.json({ error: 'Error getting order info' });
      return;
    }
  }

  public async deleteOrderAndAssociatedProducts(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { orderID } = req.body;

    try {
      await UserOrder.destroy({
        where: {
          ID: orderID,
          [Op.or]: [{ status: STATUS.PENDING }, { status: STATUS.PROCESSING }],
          // [Op.not]: [
          //   { status: { [Op.ne]: STATUS.SHIPPED } },
          //   { status: { [Op.ne]: STATUS.DELIEVERED } },
          // ],
        },
      });
      res.status(200).json({ message: 'Success deleting ORDER AND ITEMS' });
      return;
    } catch (error) {
      res.json({ error: 'Error deleting order and Item' });
    }
  }

  public async createOrder(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.user; //userID
    const params = req.body;
    params.body.userID = ID;
    const payload: UserOrderInput = UserOrderMapper.toUserOrderDTOInput(params);

    try {
      await UserOrder.create(payload);
      res.status(200).json({ message: 'item added to ORDER' });
      return;
    } catch (error) {
      res.json({ error: 'Error adding item to order' });
      return;
    }
  }
}
