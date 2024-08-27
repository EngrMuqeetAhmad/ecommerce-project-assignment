import { Optional } from 'sequelize';

export enum MONTHS {
  JAN = 1,
  FEB,
  MAR,
  APR,
  MAY,
  JUN,
  JUL,
  AUG,
  SEP,
  OCT,
  NOV,
  DEC,
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
