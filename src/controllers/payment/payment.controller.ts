import { Request, Response } from 'express';
import { PaymentServices } from '../../services/payment/payment.service';
import {
  PaymentInput,
  PaymentIntentInput,
  PaymentIntentOutput,
  PaymentOutput,
} from '../../types';

export class PaymentControllers {
  public static async createPaymentIntent(req: Request, res: Response) {
    const { stripeId } = req.body.user;
    const { paymentMethodId, totalAmount } = req.body;
    const payload: PaymentIntentInput = {
      stripeId,
      paymentMethodId,
      totalAmount,
    };
    try {
      const result: PaymentIntentOutput =
        await PaymentServices.createPaymentIntent(payload);
      res.json({
        clientSecret: result.clientSecret,
        totalAmount: result.totalAmount,
      });
    } catch (err: any) {
      console.log('Error code is: ', err.code);
    }
  }

  public static async getAllPaymentMethods(req: Request, res: Response) {
    const { ID } = req.body.user;

    try {
      const data: Array<PaymentOutput> =
        await PaymentServices.getAllPaymentMethod(ID);
      res.status(200).json({
        data: data,
      });
      return;
    } catch (error) {
      res.json({ error: 'error finding payment method' });
      return;
    }
  }
  public static async getPaymentMethod(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const data: PaymentOutput | null =
        await PaymentServices.getPaymentMethod(id);
      res.status(200).json({
        data: data,
      });
      return;
    } catch (error) {
      res.json({ error: 'error finding payment method' });
      return;
    }
  }

  public static async deletePaymentMethod(req: Request, res: Response) {
    const { id } = req.params;
    let ID;
    try {
      ID = Number(id);
    } catch (error) {
      res.json({ error: 'Error - id is not a number' });
      return;
    }
    try {
      await PaymentServices.deletePaymentMethod(ID);
      res.status(200).json({ message: 'payment method deleted' });

      return;
    } catch (error) {
      console.log(error);
      res.json({ error: 'failed deleting payment method in stripe' });
      return;
    }
  }

  public static async createPaymentMethod(req: Request, res: Response) {
    const { cardNumber, fullName, expMonth, expYear, cvc } = req.body;
    const { ID } = req.body.user;
    const s: string = cardNumber.toString();
    const sliced: string = s.slice(12, 16);

    const lastFour: number = Number(sliced);
    console.log(s, sliced, lastFour);
    try {
      const payload: PaymentInput = {
        userId: ID,
        cardNumber,
        fullName,
        expMonth,
        expYear,
        cvc,
        lastFour,
        paymentMethodId: '',
      };

      await PaymentServices.createPaymentMethod(payload);
      res.json({ message: 'success creating payment method' });
      return;
    } catch (error) {
      console.log(error);
      res.json({ error: 'failed creating payment method' });
      return;
    }
  }
}
