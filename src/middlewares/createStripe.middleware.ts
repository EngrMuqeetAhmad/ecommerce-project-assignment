import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
export async function createStripe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, firstName, secondName } = req.body;
  dotenv.config();
  const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

  try {
    const customer = await stripe.customers.create({
      email: email,
      name: `${firstName} ${secondName}`,
    });
    console.log('ok stripe');
    //   res.status(201).json({ message: "OK stripe" });
    req.body.stripeID = customer.id;
    next();
  } catch (error: any) {
    console.log('error creating customer in stripe', error?.message);
    return;
  }
}
