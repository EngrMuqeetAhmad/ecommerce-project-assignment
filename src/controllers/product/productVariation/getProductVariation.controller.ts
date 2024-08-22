import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';

import { Role } from '../../../types/userTypes';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function getProductVariation(req: any, res: any) {
  const { ID, role } = req.user; //user ID
  const { productVariationID } = req.body;

  //validation:
  if (!productVariationID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const query =
      'SELECT ID, productID, stockQuantity, additionalPrice FROM ProductVariation WHERE ID=@ID';

    const params = {
      ID: { value: productVariationID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getProductVariation };
