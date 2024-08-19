import { v4 as uuid } from "uuid";

import sql from "mssql";
import { INSERTQueryString } from "../../../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function addProductVariationValue(req: any, res: any) {
  const { ID, role } = req.user;
  const { productVariationTypeValue, productVariationTypeID } = req.body;

  //validation:
  if (!productVariationTypeValue || productVariationTypeID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const variationTypeValueID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: variationTypeValueID,
        type: sql.Char,
      },
      productVariationTypeValue: {
        value: productVariationTypeValue, 
        type: sql.NVarChar,
      },
      productVariationTypeID: {
        value: productVariationTypeID,
        type: sql.Char,
      },
    };

    const tableName: string = "ProductVariationTypeValue";

    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addProductVariationValue };
