import sql from "mssql";
import { connectToDatabase } from "../config/dbConnection";
import { queryInDatabase, QueryResult } from "../utils/queryInDatabase";

async function userExists(email: string): Promise<QueryResult> {
  const pool: object | undefined | any = await connectToDatabase();

  const queryReadEmail =
    "SELECT userEmail FROM userTable WHERE userEmail = @userEmail";

  const emailExistsResult: QueryResult = await queryInDatabase(
    queryReadEmail,
    { userEmail: { value: email, type: sql.NVarChar } },
    pool
  );
  await pool?.close()
  return emailExistsResult;
}

export default userExists;
