import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { UPDATEQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function updateBaseProduct(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const {
    productID,
    productTitle,
    productDescription,
    basePrice,
    categoryID,
    subCategoryID,
  } = req.body;

  //validation:
  if (
    !productID ||
    !productTitle ||
    !productDescription ||
    !basePrice ||
    !categoryID
  ) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: productID,
        type: sql.Char,
      },
      productTitle: {
        value: productTitle, //this is userID
        type: sql.NVarChar,
      },
      productDescription: {
        value: productDescription,
        type: sql.NVarChar,
      },
      basePrice: {
        value: basePrice,
        type: sql.Decimal,
      },
      categoryID: {
        value: categoryID,
        type: sql.Char,
      },
      subCategoryID: {
        value: subCategoryID,
        type: sql.Char,
      },
    };

    const tableName: string = "Product";

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + "WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { updateBaseProduct };
