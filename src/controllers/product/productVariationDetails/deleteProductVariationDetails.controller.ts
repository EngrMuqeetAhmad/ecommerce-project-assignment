import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';

import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function deleteProductVariationDetails(req: any, res: any) {
  const { ID, role } = req.user;
  const { productVariationDetailsID } = req.body;

  //validation:
  if (!productVariationDetailsID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: productVariationDetailsID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM ProductVariationDetails WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting  Product variation detail`,
      successMessage: `success deleting  product variation detail`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteProductVariationDetails };
