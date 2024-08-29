import { Op } from 'sequelize';
import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { OrderProductJunction } from '../../models/junctionModels/OrderProduct.model';
import { Product } from '../../models/product.model';
import { UserOrder } from '../../models/userOrder.model';

import {
  CartProductOuput,
  OrderProductInput,
  UserOrderAndProductOutput,
  UserOrderInput,
} from '../../types';
import { STATUS } from '../../utils/enum.util';

export class UserOrderServices {
  public static async getAllOrders(
    userID: number,
  ): Promise<Array<UserOrderAndProductOutput>> {
    const result: Array<UserOrderAndProductOutput> = await UserOrder.findAll({
      where: {
        userID,
      },
      raw: true,
      include: [
        {
          model: Product,
          as: 'products',
          through: {
            as: 'info',
            attributes: ['quantity'],
          },
          attributes: ['price', 'details', 'baseProducID'],
        },
      ],
    });

    return result;
  }
  public static async getOrder(
    id: number,
  ): Promise<UserOrderAndProductOutput | null> {
    const result: UserOrderAndProductOutput | null = await UserOrder.findByPk(
      id,
      {
        raw: true,
        include: [
          {
            model: Product,
            as: 'products',
            through: {
              as: 'info',
              attributes: ['quantity'],
            },
            attributes: ['price', 'details', 'baseProducID'],
          },
        ],
      },
    );

    return result;
  }

  public static async deleteOrderAndAssociatedProducts(
    orderID: number,
  ): Promise<number> {
    const result: number = await UserOrder.destroy({
      where: {
        ID: orderID,
        [Op.or]: [{ status: STATUS.PENDING }, { status: STATUS.PROCESSING }],
        // [Op.not]: [
        //   { status: { [Op.ne]: STATUS.SHIPPED } },
        //   { status: { [Op.ne]: STATUS.DELIEVERED } },
        // ],
      },
    });
    return result;
  }

  public static async createOrder(payload: UserOrderInput): Promise<void> {
    await UserOrder.create(payload)
      .then(async (userOrder) => {
        const CartProduct: Array<CartProductOuput> =
          await CartProductJunction.findAll({
            where: {
              userID: payload.userID,
            },
            raw: true,
          });

        CartProduct.forEach(async (item) => {
          const payload: OrderProductInput = {
            productID: item.productID,
            orderID: userOrder.ID,
            userID: userOrder.userID,
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

          return;
        });
      })
      .catch(() => {
        throw new Error();
      });
  }
}
