import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { UPDATEQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function updateProductVariationImages(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const {
    imageID, productVariationDetailsID, path
  } = req.body;

  //validation:
  if (
    !imageID ||
    productVariationDetailsID ||
    path
  ) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: imageID,
        type: sql.Char,
      },
      productVariationDetailsID: {
        value: productVariationDetailsID, //this is userID
        type: sql.Char,
      },
      path: {
        value: path,
        type: sql.Decimal,
      },
    };

    const tableName: string = "ProductVariationImages";

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + "WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { updateProductVariationImages };
