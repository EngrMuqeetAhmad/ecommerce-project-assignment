import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";
import userWishExists from "../../validators/wishExists.validation";
import { INSERTQueryString } from "../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";

async function addWishProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { productVariationID } = req.params;

  //validation:
  if (!productVariationID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /// check wish already exists

    const isWishExists: QueryResult = await userWishExists(ID, productVariationID);

    if (isWishExists.data.rowsAffected != 0) {
      res.json({ message: "user wish already exists" });
      return;
    }

    /////
    const wishID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: wishID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      productVariationID: {
        value: productVariationID,
        type: sql.Char,
      },
    };


    const tableName: string = "userWishTable";

    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;

 
  }
}

export { addWishProduct };
