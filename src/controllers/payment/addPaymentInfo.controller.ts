import { v4 as uuid } from "uuid";
import sql from "mssql";
import encryptSensitiveData from "../../utils/encryptSensitiveData";
import dotenv from "dotenv";
import { INSERTQueryString } from "../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";
async function userAddPaymentInfo(req: any, res: any) {
  const { ID } = req.user;
  const {
    fullNameOnPaymentCard,
    paymentCardNumber,
    cardProvider,
    expMonth,
    expYear,
    cardCVC,
  } = req.body;
  dotenv.config();
  //validation:
  if (!fullNameOnPaymentCard || !paymentCardNumber || !cardProvider) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const paymentCardID = uuid();
    ///creating objects/query params

    const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

    let paymentMethod;
    try {
      paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          number: paymentCardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cardCVC,
        },
      });
    } catch (error) {
      console.log("error creating paymentMethod in stripe");
      res.json({ message: "an error occured - stripe" });
      return;
    }

    const params: object = {
      ID: {
        value: paymentCardID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      fullNameOnPaymentCard: {
        value: fullNameOnPaymentCard,
        type: sql.NVarChar,
      },
      paymentCardNumber: {
        value: encryptSensitiveData(paymentCardNumber),
        type: sql.NVarChar,
      },
      cardProvider: {
        value: cardProvider,
        type: sql.VarChar,
      },
      stripePaymentMethodID: {
        value: paymentMethod.id,
        type: sql.NVarChar,
      },
      expMonth: {
        value: expMonth, //this is userID
        type: sql.Char,
      },
      expYear: {
        value: expYear, //this is userID
        type: sql.Char,
      },
    };

    const tableName: string = "userPaymentCardInfo";

    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { userAddPaymentInfo };
