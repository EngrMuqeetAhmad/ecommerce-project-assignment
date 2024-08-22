import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../config/dbConnection';

import { INSERTQueryString } from '../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';
import userCartProductExists from '../../validators/cartExists.validation';

async function addUserCartProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { productVariationID, quantity } = req.params;

  //validation:
  if (!productVariationID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /// check wish already exists

    const isProductInCartExists: QueryResult = await userCartProductExists(
      ID,
      productVariationID,
    );

    if (isProductInCartExists.data.rowsAffected != 0) {
      res.json({ message: 'user cart product already exists' });
      return;
    }

    /////
    const wishID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: wishID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      productVariationID: {
        value: productVariationID,
        type: sql.Char,
      },
      quantity: {
        value: quantity,
        type: sql.Int,
      },
    };

    const tableName: string = 'userCartTable';

    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { addUserCartProduct };
