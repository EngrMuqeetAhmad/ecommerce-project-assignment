import dotenv from 'dotenv';
import { Payment } from '../../models/payment.model';
import {
  PaymentInput,
  PaymentIntentInput,
  PaymentIntentOutput,
  PaymentOutput,
  PaymentTypes,
} from '../../types';
dotenv.config();
export class PaymentServices {
  public static async createPaymentIntent(
    payload: PaymentIntentInput,
  ): Promise<PaymentIntentOutput> {
    const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: payload.totalAmount,
      currency: 'usd',
      automatic_payment_methods: {
        enable: true,
      },
      customer: payload.stripeID,
      payment_method: payload.paymentMethodID,
      return_url: 'https://localhost:3000/',
      off_session: true,
      confirm: true,
    });
    return {
      clientSecret: paymentIntent.client_secret,
      totalAmount: payload.totalAmount,
    };
  }

  public static async getAllPaymentMethod(
    userID: number,
  ): Promise<Array<PaymentOutput>> {
    const result: Array<PaymentOutput> = await Payment.findAll({
      where: {
        userID: userID,
      },
      raw: true,
    });

    return result;
  }

  public static async getPaymentMethod(
    id: number,
  ): Promise<PaymentOutput | null> {
    const result: PaymentOutput | null = await Payment.findByPk(id, {
      raw: true,
    });
    return result;
  }

  public static async deletePaymentMethod(id: number): Promise<void> {
    const paymentMethod: Omit<
      PaymentTypes,
      | 'ID'
      | 'userID'
      | 'cardNumber'
      | 'fullName'
      | 'expMonth'
      | 'expYear'
      | 'cvc'
      | 'lastFour'
    > | null = await Payment.findOne({
      attributes: ['paymentMethodID'],
      where: {
        ID: id,
      },
      raw: true,
    });
    if (paymentMethod == null) {
      throw new Error();
    }
    const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);
    await stripe.paymentMethods
      .detach(paymentMethod?.paymentMethodID)
      .then(async () => {
        await Payment.destroy({
          where: {
            ID: id,
          },
        });
      })
      .catch(() => {
        throw new Error();
      });
    return;
  }

  public static async createPaymentMethod(
    payload: PaymentInput,
  ): Promise<void> {
    const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);
    await stripe.paymentMethods
      .create({
        type: 'card',
        card: {
          number: payload.cardNumber,
          exp_month: payload.expMonth,
          exp_year: payload.expYear,
          cvc: payload.cvc,
        },
      })
      .then(async (data: any) => {
        payload.paymentMethodID = data.id;
        await Payment.create(payload);
      })
      .catch(() => {
        throw new Error();
      });
    return;
  }
}
