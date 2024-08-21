import { connectToDatabase } from "../../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import {
  queryInDatabase,
  QueryResult,
} from "../../../../utils/queryInDatabase";

import sql from "mssql";
import { UPDATEQueryString } from "../../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function updateVariationValue(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { variationTypeValueID, productVariationTypeValue } = req.body;

  //validation:
  if (!variationTypeValueID || productVariationTypeValue) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: variationTypeValueID,
        type: sql.Char,
      },
      productVariationTypeValue: {
        value: productVariationTypeValue, //this is userID
        type: sql.NVarChar,
      },
    };

    const tableName: string = "ProductVariationTypeValue";

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + "WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { updateVariationValue };
