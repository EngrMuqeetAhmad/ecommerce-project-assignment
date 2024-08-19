import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { INSERTQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function addProductVariationDetails(req: any, res: any) {
  const { ID, role } = req.user;
  const { productVariationID, productVariationTypeValueID } = req.body;

  //validation:
  if (!productVariationID || !productVariationTypeValueID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const productVariationDetailsID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: productVariationDetailsID,
        type: sql.Char,
      },
      productVariationTypeValueID: {
        value: productVariationTypeValueID,
        type: sql.Char,
      },
      productVariationID: {
        value: productVariationID, 
        type: sql.Char,
      },
     
      
    };

    const tableName: string = "ProductVariationDetails";
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addProductVariationDetails };
