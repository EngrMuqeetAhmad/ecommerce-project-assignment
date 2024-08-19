import { connectToDatabase } from "../../../config/dbConnection";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function deleteProductVariation(req: any, res: any) {
  const { ID, role } = req.user;
  const { productVariationID } = req.body;

  //validation:
  if (!productVariationID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: productVariationID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM ProductVariation WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting  Product variation`,
      successMessage: `success deleting  product variation`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteProductVariation };
