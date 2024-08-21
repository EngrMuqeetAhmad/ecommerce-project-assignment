import { connectToDatabase } from "../../../config/dbConnection";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function deleteCategory(req: any, res: any) {
  const { ID, role } = req.user;
  const { categoryID } = req.body;

  //validation:
  if (!categoryID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: categoryID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM Category WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting  Product Category detail`,
      successMessage: `success deleting  product Category detail`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteCategory };
