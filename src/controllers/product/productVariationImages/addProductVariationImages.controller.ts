import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { INSERTQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function addProductVariationImages(req: any, res: any) {
  const { ID, role } = req.user;
  const { path, productVariationID } = req.body;

  //validation:
  if (!path || !productVariationID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////
    const imageID = uuid();
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
        type: sql.NVarChar,
      },
    };

    const tableName: string = 'ProductVariationImages';
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addProductVariationImages };
