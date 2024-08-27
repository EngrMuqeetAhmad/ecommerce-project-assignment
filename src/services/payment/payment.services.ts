import dotenv from 'dotenv';
import {
  CartProduct,
  PaymentInput,
  PaymentOutput,
  ProductTypes,
} from '../../types';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { Payment } from '../../models/payment.model';
import { CartProductJunction } from '../../models/junctionModels/CartProduct.model';
import { Optional } from 'sequelize';
import { Product } from '../../models/product.model';
dotenv.config();
export class PaymentServices {
  //make payment method default

  public async calculatePayment(req: any, res: any, next: any): Promise<void> {
    const { cartID } = req.user;
    //
    let totalAmount: number = 0;

    //if total amount is greater than 3000 Rs., there will be 5 % discount plus free Shipping
    let discount: number = 5; //percent
    let shippingFee: number = 200; //Rs.

    let CartProduct: Array<Pick<CartProduct, 'productID' | 'quantity'>>;
    const result: any = await CartProductJunction.findAll({
      include: ['productID', 'quantity'],
      where: {
        cartID: cartID,
      },
    });

    CartProduct = result.map(
      (item: Pick<CartProduct, 'productID' | 'quantity'>) => ({
        productID: item.productID,
        quantity: item.quantity,
      }),
    );

    if (CartProduct.length > 0) {
      CartProduct?.forEach(
        async (item: Pick<CartProduct, 'productID' | 'quantity'>) => {
          let product: Pick<ProductTypes, 'price'>;
          const result: any = await Product.findOne({
            include: ['price'],
            where: {
              ID: item?.productID,
            },
          });
          product = {
            price: result.price,
          };
          if (product != null) {
            totalAmount = item.quantity * product.price;

            if (totalAmount >= 3000) {
              totalAmount = totalAmount - shippingFee;
              totalAmount = totalAmount - (totalAmount * discount) / 100; // discount
              req.body.totalAmount = totalAmount;
              next();
            } else {
              req.body.totalAmount = totalAmount;
              next();
            }
          }
        },
      );
    } else {
      res.json({ error: 'error calculating payment' });
      return;
    }
  }

  public async createPaymentIntent(
    //change name ?
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { stripeID } = req.user;
    const { paymentMethodID, totalAmount } = req.body;
    const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'usd',
        automatic_payment_methods: {
          enable: true,
        },
        customer: stripeID,
        payment_method: paymentMethodID,
        return_url: 'https://localhost:3000/',
        off_session: true,
        confirm: true,
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        totalAmount: totalAmount,
      });
    } catch (err: any) {
      console.log('Error code is: ', err.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
        err.raw.payment_intent.id,
      );
      console.log('PI retrieved: ', paymentIntentRetrieved.id);
    }
  }

  public async getAllPaymentMethod(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    const { userID } = req.body;
    try {
      let data: Array<PaymentOutput>;
      const result: any = await Payment.findAll({
        where: {
          userID: userID,
        },
      });
      data = result.map((item: PaymentOutput) =>
        PaymentMapper.toDTOOutput(item),
      );
      res.status(200).json({
        data: data,
      });
      return;
    } catch (error) {
      res.json({ error: 'error finding payment method' });
      return;
    }
  }

  public async getPaymentMethod(req: any, res: any, next: any): Promise<void> {
    const { ID } = req.body;
    try {
      let data: PaymentOutput;
      const result: any = await Payment.findByPk(ID);
      data = PaymentMapper.toDTOOutput(result);
      res.status(200).json({
        data: data,
      });
      return;
    } catch (error) {
      res.json({ error: 'error finding payment method' });
      return;
    }
  }

  public async deletePaymentMethod(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    try {
      const { ID } = req.body;

      const paymentMethod = await Payment.findOne({
        attributes: ['paymentMethodID'],
        where: {
          ID: ID,
        },
      });
      const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);
      await stripe.paymentMethods
        .detach(paymentMethod?.paymentMethodID)
        .then(async (data: any) => {
          await Payment.destroy({
            where: {
              ID: ID,
            },
          });
          res.status(200).json({ message: 'payment method deleted' });
          return;
        })
        .catch(() => {
          res.json({ error: 'error delting payment methhod' });
          return;
        });
      return;
    } catch (error) {
      console.log(error);
      res.json({ error: 'failed deleting payment method in stripe' });
      return;
    }
  }

  public async createPaymentMethod(
    req: any,
    res: any,
    next: any,
  ): Promise<void> {
    try {
      const payload: PaymentInput = PaymentMapper.toDTOInput(req.body);

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
          res.status(200).json({ message: 'payment method created' });
          return;
        })
        .catch(() => {
          res.json({ error: 'error creating payment methhod' });
          return;
        });
      return;
    } catch (error) {
      console.log(error);
      res.json({ error: 'failed creating payment method in stripe' });
      return;
    }
  }
}
