import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { Role } from "../../types/userTypes";

async function getUserPhoneInfo(req: any, res: any) {
  let { ID, role } = req.user;

  ////////
  if (role == Role.ADMIN) {
    const { userID } = req.body;
    if (!userID) {
      res.json({ message: "Admin error - no userID" });
    }
    ID = userID;
  }
  ////////
  //validation:
  if (!ID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUserPhoneNo =
      "SELECT ID, countryCode, phoneNumber FROM userPhoneNumber WHERE userID = @userID";

    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetUserPhoneNo: QueryResult = await queryInDatabase(
      queryGetUserPhoneNo,
      params,
      pool
    );

    if (resultQueryGetUserPhoneNo.data.rowsAffected == 0) {
      res.status(404).json({ message: "Failed", data: undefined });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "OK", data: resultQueryGetUserPhoneNo });
    await pool?.close();
    return;
  }
}

export { getUserPhoneInfo };
