import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { UPDATEQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function updateProductVariation(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { productVariationID, stockQuantity, productID, additionalPrice } =
    req.body;

  //validation:
  if (
    !productID ||
    !productVariationID ||
    !stockQuantity ||
    !additionalPrice
  ) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: productVariationID,
        type: sql.Char,
      },
      productID: {
        value: productID, //this is userID
        type: sql.Char,
      },
      stockQuantity: {
        value: stockQuantity,
        type: sql.Decimal,
      },
      additionalPrice: {
        value: additionalPrice,
        type: sql.Decimal,
      },
    };

    
    const tableName: string = "ProductVariation";

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + "WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
    
  }
}

export { updateProductVariation };
