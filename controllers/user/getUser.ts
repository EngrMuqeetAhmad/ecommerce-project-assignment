import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

async function getUser(req: any, res: any) {
  const { email, ID } = req.user;
  console.log("get user req",req.user);

  //validation:
  if (!email || !ID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUser =
      "SELECT ID, userFirstName, userSecondName, userEmail, userPhoneNoID FROM userTable WHERE userEmail = @userEmail AND ID = @ID";

    const params = {
      userEmail: { value: email, type: sql.NVarChar },
      ID: { value: ID, type: sql.Char },
    };
    const resultQueryUserLogin: QueryResult = await queryInDatabase(
      queryGetUser,
      params,
      pool
    );

    if (resultQueryUserLogin.data.rowsAffected == 0) {
      res.status(404).json({ message: "Failed", data: undefined });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "OK", data: resultQueryUserLogin });
    await pool?.close();
    return;
  }
}

export { getUser };
