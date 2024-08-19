import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { INSERTQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function addCategory(req: any, res: any) {
  const { ID, role } = req.user;
  const { categoryName } = req.body;

  //validation:
  if (!categoryName) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const categoryID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: categoryID,
        type: sql.Char,
      },
      categoryName: {
        value: categoryName, //this is userID
        type: sql.Char,
      },      
    };

    const tableName: string = "Category";
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addCategory };
