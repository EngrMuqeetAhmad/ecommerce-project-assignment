import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { UPDATEQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function updateProductVariationDetails(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const {
    productVariationDetailsID,
    productVariationID,
    productVariationTypeValueID,
  } = req.body;

  //validation:
  if (
    !productVariationDetailsID ||
    productVariationID ||
    productVariationTypeValueID
  ) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: productVariationDetailsID,
        type: sql.Char,
      },
      productVariationID: {
        value: productVariationID, //this is userID
        type: sql.Char,
      },
      productVariationTypeValueID: {
        value: productVariationTypeValueID,
        type: sql.Decimal,
      },
    };

    const tableName: string = 'ProductVariationDetails';

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + 'WHERE ID = @ID';

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { updateProductVariationDetails };
