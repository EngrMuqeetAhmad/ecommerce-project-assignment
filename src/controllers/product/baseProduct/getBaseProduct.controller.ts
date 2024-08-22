import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';

import { Role } from '../../../types/userTypes';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function getBaseProduct(req: any, res: any) {
  const { ID, role } = req.user; //user ID
  const { productID } = req.body;

  //validation:
  if (!productID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetBaseProduct =
      'SELECT ID, productTitle, productDescription, basePrice, categoryID, subCategoryID FROM Product WHERE ID=@ID';

    const params = {
      ID: { value: productID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      queryGetBaseProduct,
      messages,
      res,
    );
    return;
  }
}

export { getBaseProduct };
