import { connectToDatabase } from "../../../config/dbConnection";
import encryptSensitiveData from "../../../utils/encryptSensitiveData";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import jwt from "jsonwebtoken";
import sql from "mssql";

async function userUpdatePaymentInfo(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const {
    paymentCardID,
    fullNameOnPaymentCard,
    paymentCardNumber,
    cardProvider,
  } = req.body;

  //validation:
  if (
    !paymentCardID ||
    !fullNameOnPaymentCard ||
    !paymentCardNumber ||
    !cardProvider
  ) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

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
      const queryUpdatePaymentCard = `UPDATE userPaymentCardInfo SET fullNameOnPaymentCard = @fullNameOnPaymentCard, paymentCardNumber = @paymentCardNumber, cardProvider = @cardProvider WHERE ID = @ID AND userID = @userID`;

      const resultUpdatePaymentCard: QueryResult = await queryInDatabase(
        queryUpdatePaymentCard,
        params,
        pool
      );

      if (resultUpdatePaymentCard.data.rowsAffected == 0) {
        res.json({ message: "error updating payment info" });
        return;
      }

      res.json({ message: "Success- updating payment info" });
      return;
    } catch (error) {
      res.json({ message: `updating failed` });
      await pool?.close();
      return;
    }
  }
}

export { userUpdatePaymentInfo };
