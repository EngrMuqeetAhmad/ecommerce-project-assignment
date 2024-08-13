import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../config/dbConnection";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import sql from "mssql";
async function validateEmail(req: any, res: any) {
  const { token } = req.query;

  const decodedData: any = jwt.verify(token, "MuqeetAhmad", (err: any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
  });

  const pool: object | undefined | any = await connectToDatabase();

  const queryUserLogin =
    "SELECT userEmail FROM userTable WHERE userEmail = @userEmail";

  const params = {
    userEmail: { value: decodedData?.email, type: sql.NVarChar },
  };
  const resultQueryUserEmail: QueryResult = await queryInDatabase(
    queryUserLogin,
    params,
    pool
  );

  if (resultQueryUserEmail.data.rowsAffected == 0) {
    res.status(404).json({ message: "User Not Found" });
    await pool?.close();
    return;
  }

  res.status(200).json({ message: "Email verified Successfully" });
  //update isVerified flag in table (need to create it)
  await pool?.close();
  return;
}

export { validateEmail };
