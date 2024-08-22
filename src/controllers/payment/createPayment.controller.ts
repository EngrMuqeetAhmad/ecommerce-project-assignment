import dotenv from 'dotenv';
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

async function createPaymentFlow(req: any, res: any) {
  const { stripeID } = req.user;
  const { totalAmount, paymentMethodID } = req.body;
  if (!totalAmount) {
    res.json({ message: 'BAD Request' });
    return;
  } else {
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
      });
    } catch (err: any) {
      // Error code will be authentication_required if authentication is needed
      console.log('Error code is: ', err.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
        err.raw.payment_intent.id,
      );
      console.log('PI retrieved: ', paymentIntentRetrieved.id);
    }
    return;
  }
}

export { createPaymentFlow };
