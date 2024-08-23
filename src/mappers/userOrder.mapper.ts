import { UserOrderInput, UserOrderOutput } from '../types';

export class UserOrderMapper {
  public static toUserOrderDTOInput(model: any): UserOrderInput {
    return {
      userID: model.ID,
      status: 'pending',
      shippingAddressID: model.shippingAddressID,
      paymentID: model.paymentID,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }

  public static toUserOrderDTOOutput(model: any): UserOrderOutput {
    return {
      ID: model.ID,
      userID: model.ID,
      status: model.status,
      shippingAddressID: model.shippingAddressID,
      createdAt: new Date(`${model.createdAt}`),
      updatedAt: new Date(`${model.updatedAt}`),
    };
  }
}
