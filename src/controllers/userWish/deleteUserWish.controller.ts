import sql from 'mssql';
import { connectToDatabase } from '../../config/dbConnection';
import { ControllerFunctionTemplate } from '../../utils/controllerFunctionTemplate';

import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function deleteWishProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { wishID } = req.params;

  //validation:
  if (!wishID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: wishID,
        type: sql.Char,
      },
      userID: {
        value: ID,
        type: sql.Char,
      },
    };

    const query = `DELETE FROM userWishTable WHERE ID = @ID AND userID = @userID`;

    const messages: object = {
      errorMessage: `Failed deleting user wish`,
      successMessage: `success deleting user wish`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteWishProduct };
