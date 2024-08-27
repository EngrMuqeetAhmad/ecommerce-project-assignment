import { OrderProductInput, OrderProductOuput } from '../types';

export class OrderProductMapper {
  public static toDTOInput(model: any): OrderProductInput {
    return {
      productID: model.productID,
      orderID: model.orderID,
      userID: model.userID,
      quantity: model.quantity,
    };
  }

  public static toDTOOutput(model: any): OrderProductOuput {
    return {
      ID: model.ID,
      productID: model.productID,
      orderID: model.orderID,
      userID: model.userID,
      quantity: model.quantity,
    };
  }
}
