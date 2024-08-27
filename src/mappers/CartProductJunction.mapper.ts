import { CartProductInput, CartProductOuput } from '../types';

export class CartProductMapper {
  public static toDTOInput(model: any): CartProductInput {
    return {
      productID: model.productID,
      cartID: model.cartID,
      userID: model.userID,
      quantity: model.quantity,
    };
  }

  public static toDTOOutput(model: any): CartProductOuput {
    return {
      ID: model.ID,
      productID: model.productID,
      cartID: model.cartID,
      userID: model.userID,
      quantity: model.quantity,
    };
  }
}
