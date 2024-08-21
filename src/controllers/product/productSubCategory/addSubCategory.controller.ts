import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";
import { INSERTQueryString } from "../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function addSubCategory(req: any, res: any) {
  const { ID, role } = req.user;
  const { subCategoryName } = req.body;

  //validation:
  if (!subCategoryName) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const subCategoryID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: subCategoryID,
        type: sql.Char,
      },
      subCategoryName: {
        value: subCategoryName, //this is userID
        type: sql.Char,
      },      
    };

    const tableName: string = "SubCategory";
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addSubCategory };
