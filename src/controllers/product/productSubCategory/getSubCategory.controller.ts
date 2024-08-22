import sql from 'mssql';
import { connectToDatabase } from '../../../config/dbConnection';

import { Role } from '../../../types/userTypes';
import { ControllerFunctionTemplate } from '../../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../../utils/queryInDatabase';

async function getSubCategory(req: any, res: any) {
  const { ID, role } = req.user; //user ID
  const { subCategoryID } = req.body;

  //validation:
  if (!subCategoryID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const query = 'SELECT ID, subCategoryName FROM SubCategory WHERE ID=@ID';

    const params = {
      ID: { value: subCategoryID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getSubCategory };
