import { connectToDatabase } from "../../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function userDeletePaymentInfo(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { paymentCardID } = req.body;

  //validation:
  if (!paymentCardID) {
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
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryDeletePaymentCard = `DELETE FROM userPaymentCard WHERE ID = @ID AND userID = @userID`;

      const resultDeletePaymentCard: QueryResult = await queryInDatabase(
        queryDeletePaymentCard,
        params,
        pool
      );

      if (resultDeletePaymentCard.data.rowsAffected == 0) {
        res.json({ message: "error adding shipping address or not found" });
        return;
      }

      res.json({ message: "Success deleting shipping address" });
      return;
    } catch (error) {
      res.json({ message: `deletion failed` });
      await pool?.close();
      return;
    }
  }
}

export { userDeletePaymentInfo };
