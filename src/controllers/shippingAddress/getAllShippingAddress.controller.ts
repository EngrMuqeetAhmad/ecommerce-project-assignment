import sql from 'mssql';
import { connectToDatabase } from '../../config/dbConnection';

import { Role } from '../../types/userTypes';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function getUserAllShippingAddress(req: any, res: any) {
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

    const queryGetUserAllShippingAddress =
      'SELECT ID, userID, addressLine1, addressLine2, region, postalCode, country FROM userShippingAddress WHERE userID = @userID';

    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetUserAllShippingAddress: QueryResult =
      await queryInDatabase(queryGetUserAllShippingAddress, params, pool);

    if (resultQueryGetUserAllShippingAddress.data.rowsAffected == 0) {
      res.status(404).json({ message: 'Not Found', data: undefined });
      await pool?.close();
      return;
    }

    res
      .status(200)
      .json({ message: 'OK', data: resultQueryGetUserAllShippingAddress });
    await pool?.close();
    return;
  }
}

export { getUserAllShippingAddress };
