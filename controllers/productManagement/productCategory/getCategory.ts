import sql from "mssql";
import { connectToDatabase } from "../../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import { Role } from "../../../types/userTypes";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function getCategory(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { categoryID } = req.body;

  //validation:
  if (!categoryID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {


    const query =
      "SELECT ID, categoryName FROM Category WHERE ID=@ID";

    const params = {
      ID: { value: categoryID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      query,
      messages,
      res
    );
    return;
  }
}

export { getCategory };
