
import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { UserCart } from '../../models/userCart.model';
import {  UserCartOutput } from '../../types';
import { CartProduct, CartProductInput } from '../../types/CartProductJunction.types';

export class UserCartServices {
  public static async getWholeCart(id: number): Promise<Array<UserCartOutput>> {
    const data: Array<UserCartOutput> = await UserCart.findAll({
      where: {
        userId: id,
      },
    });

    return data;
  }

  public static async updateItemQuantity(
    payload: Omit<CartProduct, 'id' | 'productId' | 'userId' | 'cartId'>,
    id: number,
  ): Promise<number> {
    const [affectedRows] = await CartProductJunction.update(
      {
        quantity: payload.quantity,
      },
      {
        where: {
          id: id,
        },
      },
    );
    return affectedRows;
  }

  public static async deleteItemFromCart(id: number): Promise<number> {
    const result: number = await CartProductJunction.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }

  public static async addItemToCart(payload: CartProductInput): Promise<void> {
    await CartProductJunction.create(payload);

    return;
  }
}
