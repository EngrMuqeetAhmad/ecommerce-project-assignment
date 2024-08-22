import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';

import { Role } from '../../../types/userTypes';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function getProductVariationImage(req: any, res: any) {
  const { ID, role } = req.user; //user ID
  const { imageID } = req.body;

  //validation:
  if (!imageID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const query =
      'SELECT ID, productVariationID, path FROM ProductVariationImages WHERE ID = @ID';

    const params = {
      ID: { value: imageID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getProductVariationImage };
