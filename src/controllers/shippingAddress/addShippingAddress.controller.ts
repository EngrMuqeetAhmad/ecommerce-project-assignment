import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";
import { INSERTQueryString } from "../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";

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

    const tableName: string = "userShippingAddress";

    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { userAddShippingAddress };
