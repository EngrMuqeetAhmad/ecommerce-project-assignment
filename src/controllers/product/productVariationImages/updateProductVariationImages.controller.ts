import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { UPDATEQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function updateProductVariationImages(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { imageID, productVariationID, path } = req.body;

  //validation:
  if (!imageID || productVariationID || path) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: imageID,
        type: sql.Char,
      },
      productVariationID: {
        value: productVariationID, //this is userID
        type: sql.Char,
      },
      path: {
        value: path,
        type: sql.Decimal,
      },
    };

    const tableName: string = 'ProductVariationImages';

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + 'WHERE ID = @ID';

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { updateProductVariationImages };
