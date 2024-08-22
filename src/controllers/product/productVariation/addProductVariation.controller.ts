import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { INSERTQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function addProductVariation(req: any, res: any) {
  const { ID, role } = req.user;
  const { productID, stockQuantity, additionalPrice } = req.body;

  //validation:
  if (!productID || !stockQuantity || !additionalPrice) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////
    const productVariationID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: productVariationID,
        type: sql.Char,
      },
      productID: {
        value: productID, //this is userID
        type: sql.Char,
      },
      stockQuantity: {
        value: stockQuantity,
        type: sql.Decimal,
      },
      additionalPrice: {
        value: additionalPrice,
        type: sql.Decimal,
      },
    };

    const tableName: string = 'ProductVariation';
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addProductVariation };
