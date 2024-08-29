import { Optional } from 'sequelize';
import { MONTHS } from '../utils/enum.util';

export interface PaymentIntentInput {
  stripeID: string;
  paymentMethodID: string;
  totalAmount: number;
}
export interface PaymentIntentOutput {
  clientSecret: string;
  totalAmount: number;
}
export interface PaymentTypes {
  ID: number;
  userID: number;
  cardNumber: number;
  fullName: string;
  expMonth: MONTHS;
  expYear: number;
  cvc: number;
  lastFour: number;
  paymentMethodID: string; //in stripe
}

export interface PaymentInput extends Optional<PaymentTypes, 'ID'> {}

export interface PaymentOutput
  extends Omit<PaymentTypes, 'cardNumber' | 'cvc'> {}
