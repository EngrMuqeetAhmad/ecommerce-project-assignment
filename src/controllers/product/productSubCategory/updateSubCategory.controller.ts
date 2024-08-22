import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../../config/dbConnection';
import { UPDATEQueryString } from '../../../utils/buildSQLqueryString';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function updateSubCategory(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const { subCategoryID, subCategoryName } = req.body;

  //validation:
  if (!subCategoryID || subCategoryName) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: subCategoryID,
        type: sql.Char,
      },
      subCategoryName: {
        value: subCategoryName, //this is userID
        type: sql.Char,
      },
    };

    const tableName: string = 'SubCategory';

    const query: string =
      UPDATEQueryString(tableName, Object.keys(params)) + 'WHERE ID = @ID';

    const messages: object = {
      errorMessage: `Error updating into ${tableName}`,
      successMessage: `Success updating into ${tableName}`,
    };

    await ControllerFunctionTemplate(params, query, messages, res);
  }
}

export { updateSubCategory };
