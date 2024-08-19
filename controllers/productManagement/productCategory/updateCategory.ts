import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { UPDATEQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function updateCategory(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { categoryID, categoryName } = req.body;

  //validation:
  if (!categoryID || categoryName) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

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

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + "WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { updateCategory };
