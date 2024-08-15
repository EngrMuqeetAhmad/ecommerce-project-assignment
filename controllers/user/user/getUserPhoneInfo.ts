import sql from "mssql";
import { connectToDatabase } from "../../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

async function getUserPhoneInfo(req: any, res: any) {
  const { email, ID } = req.user;
  console.log("get user req", req.user);

  //validation:
  if (!email || !ID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUserPhoneNo =
      "SELECT ID, countryCode, phoneNumber FROM userPhoneNumber WHERE userID = @userID";

    const params = {
      userEmail: { value: email, type: sql.NVarChar },
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
