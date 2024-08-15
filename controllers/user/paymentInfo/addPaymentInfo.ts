import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import jwt from "jsonwebtoken";
import sql from "mssql";
import encryptSensitiveData from "../../../utils/encryptSensitiveData";

async function userAddPaymentInfo(req: any, res: any) {
  const { ID } = req.user;
  const { fullNameOnPaymentCard, paymentCardNumber, cardProvider } = req.body;

  //validation:
  if (!fullNameOnPaymentCard || !paymentCardNumber || !cardProvider) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const paymentCardID = uuid();
    ///creating objects/query params

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
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryAddPaymentCard = `INSERT INTO userPaymentCardInfo (ID, userID, fullNameOnPaymentCard, paymentCardNumber, cardProvider) VALUES (@ID, @userID, @fullNameOnPaymentCard, @paymentCardNumber, @cardProvider)`;

      const resultAddPaymentCard: QueryResult = await queryInDatabase(
        queryAddPaymentCard,
        params,
        pool
      );

      if (resultAddPaymentCard.data.rowsAffected == 0) {
        res.json({ message: "error adding payment card info" });
        return;
      }

      res.json({ message: "Success Adding payment card info" });
      return;
    } catch (error) {
      res.json({ message: `creation failed` });
      await pool?.close();
      return;
    }
  }
}

export { userAddPaymentInfo };
