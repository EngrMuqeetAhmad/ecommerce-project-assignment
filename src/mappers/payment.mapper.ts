import { PaymentInput, PaymentOutput } from '../types';

export class PaymentMapper {
  public static toDTOInput(model: any): PaymentInput {
    return {
      userID: model.userID,
      paymentMethodID: model.paymentMethodID,
      lastFour: model.lastFour,
      fullName: model.fullName,
      cardNumber: model.cardNumber,
      expMonth: model.expMonth,
      expYear: model.expYear,
      cvc: model.cvc,
    };
  }

  public static toDTOOutput(model: any): PaymentOutput {
    return {
      ID: model.ID,
      userID: model.userID,
      paymentMethodID: model.paymentMethodID,
      lastFour: model.lastFour,
      fullName: model.fullName,
      expMonth: model.expMonth,
      expYear: model.expYear,
    };
  }
}
