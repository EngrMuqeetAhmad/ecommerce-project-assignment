import sql from 'mssql';
import { connectToDatabase } from '../../config/dbConnection';
import { UPDATEQueryString } from '../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../utils/controllerFunctionTemplate';

import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function udpateCartProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { cartProductID, quantity } = req.params;

  //validation:
  if (!cartProductID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const paramToUpdate: object = {
      quantity: {
        value: quantity,
        type: sql.Int,
      },
    };

    const conditions: object = {
      ID: {
        value: cartProductID,
        type: sql.Char,
      },
    };

    const tableName: string = 'userCartTable';

    const query: string =
      UPDATEQueryString(tableName, Object.keys(paramToUpdate)) +
      'WHERE ID = @ID';

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };
    const params = { conditions, paramToUpdate };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { udpateCartProduct };
