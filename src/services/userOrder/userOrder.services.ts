import { Op } from 'sequelize';
import { UserOrderMapper } from '../../mappers/userOrder.mapper';
import { UserOrder } from '../../models/userOrder.model';

import {
  CartProductOuput,
  OrderProductInput,
  UserOrderInput,
  UserOrderOutput,
} from '../../types';
import { STATUS } from '../../types/userOrder.types';
import { UserCart } from '../../models/userCart.model';
import { OrderProductJunction } from '../../models/junctionModels/OrderProduct.model';
import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { CartProductMapper } from '../../mappers/CartProductJunction.mapper';

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
    const params = req.body; // shipp add ID, paymentID, totalAmount
    params.body.userID = ID;
    const payload: UserOrderInput = UserOrderMapper.toUserOrderDTOInput(params);

    try {
      await UserOrder.create(payload)
        .then(async (userOrder) => {
          let CartProduct: Array<CartProductOuput>;
          const result = await CartProductJunction.findAll({
            where: {
              userID: ID,
            },
          });
          CartProduct = result.map((item) =>
            CartProductMapper.toDTOOutput(result),
          );

          CartProduct.forEach(async (item) => {
            const payload: OrderProductInput = {
              productID: item.productID,
              orderID: userOrder.ID,
              userID: ID,
              quantity: item.quantity,
            };
            await OrderProductJunction.create(payload)
              .then(async () => {
                await CartProductJunction.destroy({
                  where: {
                    ID: item.ID,
                  },
                });
              })
              .catch(() => {
                console.log('error removing cart product');
              });
            res.status(200).json({ message: 'ORDER created' });
            return;
          });
        })
        .catch(() => {
          console.log('error completing erro');
        });
    } catch (error) {
      res.json({ error: 'Error creating order' });
      return;
    }
  }
}
