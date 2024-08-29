import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { UserCart } from '../../models/userCart.model';
import { CartProduct, CartProductInput, UserCartOutput } from '../../types';

export class UserCartServices {
  public static async getWholeCart(id: number): Promise<Array<UserCartOutput>> {
    const data: Array<UserCartOutput> = await UserCart.findAll({
      where: {
        userID: id,
      },
    });

    return data;
  }

  public static async updateItemQuantity(
    payload: Omit<CartProduct, 'ID' | 'productID' | 'userID' | 'cartID'>,
    id: number,
  ): Promise<number> {
    const [affectedRows] = await CartProductJunction.update(
      {
        quantity: payload.quantity,
      },
      {
        where: {
          ID: id,
        },
      },
    );
    return affectedRows;
  }

  public static async deleteItemFromCart(id: number): Promise<number> {
    const result: number = await CartProductJunction.destroy({
      where: {
        ID: id,
      },
    });
    return result;
  }

  public static async addItemToCart(payload: CartProductInput): Promise<void> {
    await CartProductJunction.create(payload);

    return;
  }
}
