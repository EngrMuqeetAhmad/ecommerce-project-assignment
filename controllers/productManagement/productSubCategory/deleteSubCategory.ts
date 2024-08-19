import { connectToDatabase } from "../../../config/dbConnection";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function deleteSubCategory(req: any, res: any) {
  const { ID, role } = req.user;
  const { subCategoryID } = req.body;

  //validation:
  if (!subCategoryID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: subCategoryID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM SubCategory WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting  Product SubCategory detail`,
      successMessage: `success deleting  product SubCategory detail`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteSubCategory };
