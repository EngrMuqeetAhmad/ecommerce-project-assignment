import { Op } from 'sequelize';

import { Product } from '../../models/product.model';
import { UserOrder } from '../../models/userOrder.model';

import {
  UserOrderAndProductOutput,
  UserOrderInput,
  UserOrderTypes,
} from '../../types';
import { STATUS } from '../../utils/enum.util';
import {
  CartProduct,
  CartProductOuput,
} from '../../types/CartProductJunction.types';
import { OrderProductInput } from '../../types/OrderProductJunction.types';
import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { OrderProductJunction } from '../../models/junctionModels/OrderProduct.model';

export class UserOrderServices {
  public static async getAllOrders(
    userId: number,
  ): Promise<Array<UserOrderAndProductOutput>> {
    const result: Array<UserOrderAndProductOutput> = await UserOrder.findAll({
      where: {
        userId,
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
    orderId: number,
  ): Promise<number> {
    const result: number = await UserOrder.destroy({
      where: {
        id: orderId,
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
      .then(async (userOrder: UserOrderTypes) => {
        const CartProduct: Array<CartProductOuput> =
          await CartProductJunction.findAll({
            where: {
              userId: payload.userId,
            },
            raw: true,
          });

        CartProduct.forEach(async (item: CartProduct) => {
          const payload: OrderProductInput = {
            productid: item.productId,
            orderId: userOrder.id,
            userId: userOrder.userId,
            quantity: item.quantity,
          };
          await OrderProductJunction.create(payload)
            .then(async () => {
              await CartProductJunction.destroy({
                where: {
                  id: item.id,
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
