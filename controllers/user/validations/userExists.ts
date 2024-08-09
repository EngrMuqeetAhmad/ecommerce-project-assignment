import { NVarChar } from "mssql";
import { connectToDatabase } from "../../../config/dbConnection";
import { queryInDatabase, QueryResult } from "../../../utils/userFunctions";

async function userExists(email: string): Promise<QueryResult> {
  const pool: object | undefined = await connectToDatabase();

  const queryReadEmail =
    "SELECT userEmail FROM userTable WHERE userEmail = @userEmail";

  const emailExistsResult: QueryResult = await queryInDatabase(
    queryReadEmail,
    { userEmail: { value: email, type: NVarChar } },
    pool
  );

  return emailExistsResult;
}

export default userExists;
