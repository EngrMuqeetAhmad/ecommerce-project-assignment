import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { INSERTQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function addBaseProduct(req: any, res: any) {
  const { ID, role } = req.user;
  const {
    productTitle,
    productDescription,
    basePrice,
    categoryID,
    subCategoryID,
  } = req.body;

  //validation:
  if (!productTitle || !productDescription || !basePrice || !categoryID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////
    const productID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: productID,
        type: sql.Char,
      },
      productTitle: {
        value: productTitle, //this is userID
        type: sql.NVarChar,
      },
      productDescription: {
        value: productDescription,
        type: sql.NVarChar,
      },
      basePrice: {
        value: basePrice,
        type: sql.Decimal,
      },
      categoryID: {
        value: categoryID,
        type: sql.Char,
      },
      subCategoryID: {
        value: subCategoryID,
        type: sql.Char,
      },
    };

    const tableName: string = 'Product';
    const query: string = INSERTQueryString(tableName, Object.keys(params));

    const messages: object = {
      errorMessage: `Error adding into ${tableName}`,
      successMessage: `Success Adding into ${tableName}`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { addBaseProduct };
