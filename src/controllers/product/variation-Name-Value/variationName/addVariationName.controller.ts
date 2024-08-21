import { v4 as uuid } from "uuid";

import sql from "mssql";
import { INSERTQueryString } from "../../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function addProductVariationName(req: any, res: any) {
  const { ID, role } = req.user;
  const { productVariationName } = req.body;

  //validation:
  if (!productVariationName) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const variationNameID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: variationNameID,
        type: sql.Char,
      },
      productVariationName: {
        value: productVariationName, //this is userID
        type: sql.NVarChar,
      },
    };

    const tableName: string = "ProductVariationType";

    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addProductVariationName };
