import sql from 'mssql';
import { connectToDatabase } from '../../config/dbConnection';

import { Role } from '../../types/userTypes';
import { ControllerFunctionTemplate } from '../../utils/controllerFunctionTemplate';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function getAllCartProducts(req: any, res: any) {
  let { ID, role } = req.user; //user ID

  ////////
  if (role == Role.ADMIN) {
    const { userID } = req.body;
    if (!userID) {
      res.json({ message: 'Admin error - no userID' });
    }
    ID = userID;
  }
  ////////

  //validation:
  if (!ID) {
    res.status(400);
    res.json({ message: 'BAD request' });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetAllCartProducts =
      'SELECT ID, userID, productID FROM userCartTable WHERE userID = @userID';

    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      queryGetAllCartProducts,
      messages,
      res,
    );
    return;
  }
}

export { getAllCartProducts };
