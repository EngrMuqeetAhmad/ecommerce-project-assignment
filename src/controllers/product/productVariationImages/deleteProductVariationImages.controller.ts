import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';

import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function deleteProductVariationImages(req: any, res: any) {
  const { ID, role } = req.user;
  const { imageID } = req.body;

  //validation:
  if (!imageID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: imageID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM ProductVariationImages WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting  Product variation image detail`,
      successMessage: `success deleting  product variation image detail`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);

    return;
  }
}

export { deleteProductVariationImages };
