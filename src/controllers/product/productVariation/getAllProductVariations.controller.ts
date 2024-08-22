import sql from 'mssql';

import { Role } from '../../../types/userTypes';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';

async function getAllProductVariations(req: any, res: any) {
  const { ID, role } = req.user; //user ID
  const { productID } = req.body;

  //validation:
  if (!productID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const query =
      'SELECT ID, productID, stockQuantity, additionalPrice FROM ProductVariation WHERE productID=@productID';

    const params = {
      productID: { value: productID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getAllProductVariations };
