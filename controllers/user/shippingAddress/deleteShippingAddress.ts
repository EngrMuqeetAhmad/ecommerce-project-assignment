import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function userDeleteShippingAddress(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { addressID } = req.body;

  //validation:
  if (!addressID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: addressID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryDeleteShippingAddress = `DELETE FROM userShippingAddress WHERE ID = @ID AND userID = @userID`;

      const resultDeleteShippingAddress: QueryResult = await queryInDatabase(
        queryDeleteShippingAddress,
        params,
        pool
      );

      if (resultDeleteShippingAddress.data.rowsAffected == 0) {
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

export { userDeleteShippingAddress };
