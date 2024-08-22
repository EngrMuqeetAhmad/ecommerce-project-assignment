import sql from 'mssql';
import { connectToDatabase } from '../../config/dbConnection';

import { Role } from '../../types/userTypes';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function getUser(req: any, res: any) {
  let { ID, role } = req.user;

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

    const queryGetUser =
      'SELECT ID, userFirstName, userSecondName, userEmail, userPhoneNoID, isVerified, role FROM userTable WHERE ID = @ID';

    const params = {
      ID: { value: ID, type: sql.Char },
    };
    const resultQueryUser: QueryResult = await queryInDatabase(
      queryGetUser,
      params,
      pool,
    );

    if (resultQueryUser.data.rowsAffected == 0) {
      res.status(404).json({ message: 'Failed', data: undefined });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: 'OK', data: resultQueryUser });
    await pool?.close();
    return;
  }
}

export { getUser };
