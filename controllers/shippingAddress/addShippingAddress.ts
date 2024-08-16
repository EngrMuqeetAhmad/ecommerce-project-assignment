import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";

async function userAddShippingAddress(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { addressLine1, addressLine2, region, postalCode, country } = req.body;

  //validation:
  if (!addressLine1 || !addressLine2 || !region || !postalCode || !country) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const addressID = uuid();
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
      addressLine1: {
        value: addressLine1,
        type: sql.NVarChar,
      },
      addressLine2: {
        value: addressLine2,
        type: sql.NVarChar,
      },
      region: {
        value: region,
        type: sql.VarChar,
      },
      postalCode: {
        value: postalCode,
        type: sql.VarChar,
      },

      country: {
        value: country,
        type: sql.VarChar,
      },
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryAddShippingAddress = `INSERT INTO userShippingAddress (ID, userID, addressLine1, addressLine2, region, postalCode, country) VALUES (@ID, @userID, @addressLine1, @addressLine2, @region, @postalCode, @country)`;

      const resultAddShippingAddress: QueryResult = await queryInDatabase(
        queryAddShippingAddress,
        params,
        pool
      );

      if (resultAddShippingAddress.data.rowsAffected == 0) {
        res.json({ message: "error adding shipping address" });
        return;
      }

      res.json({ message: "Success Adding shipping address" });
      return;
    } catch (error) {
      res.json({ message: `creation failed` });
      await pool?.close();
      return;
    }
  }
}

export { userAddShippingAddress };
