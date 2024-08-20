import { debug } from "console";
import { connectToDatabase } from "../../config/dbConnection";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";

async function deleteCartProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { cartProductID } = req.params;

  //validation:
  if (!cartProductID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: cartProductID,
        type: sql.Char,
      },
      userID: {
        value: ID,
        type: sql.Char,
      },
    };

    const query = `DELETE FROM userCartTable WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting Base Product variation Type`,
      successMessage: `success deleting base product variation Type`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteCartProduct };
 