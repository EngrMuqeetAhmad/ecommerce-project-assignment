import { connectToDatabase } from "../../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import {
  queryInDatabase,
  QueryResult,
} from "../../../../utils/queryInDatabase";

import sql from "mssql";
import { UPDATEQueryString } from "../../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function updateVairationName(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { variationID, productVariationName } = req.body;

  //validation:
  if (!variationID || productVariationName) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const paramToUpdate: object = {
      productVariationName: {
        value: productVariationName, //this is userID
        type: sql.NVarChar,
      },
    };

    const conditions: object = {
      ID: {
        value: variationID,
        type: sql.Char,
      },
    };

    const tableName: string = "ProductVariationType";

    const query: string =
      UPDATEQueryString(tableName, Object.keys(paramToUpdate)) +
      "WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };
    const params = { conditions, paramToUpdate };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { updateVairationName };
