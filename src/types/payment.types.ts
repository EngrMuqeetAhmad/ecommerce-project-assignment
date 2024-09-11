import { MONTHS } from '../utils/enum.util';

export interface PaymentIntentInput {
  stripeId: string;
  paymentMethodId: string;
  totalAmount: number;
}
export interface PaymentIntentOutput {
  clientSecret: string;
  totalAmount: number;
}
export interface PaymentTypes {
  id: number;
  userId: number;
  cardNumber: number;
  fullName: string;
  expMonth: MONTHS;
  expYear: number;
  cvc: number;
  lastFour: number;
  paymentMethodId: string; //in stripe
}

export interface PaymentInput extends Omit<PaymentTypes, 'id'> {}

export interface PaymentOutput
  extends Omit<PaymentTypes, 'cardNumber' | 'cvc'> {}
