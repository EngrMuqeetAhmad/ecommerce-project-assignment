import sql from "mssql";
import { connectToDatabase } from "../config/dbConnection";
import { queryInDatabase, QueryResult } from "../utils/queryInDatabase";

async function userCartProductExists(
  userID: string,
  productID: string
): Promise<QueryResult> {
  const pool: object | undefined | any = await connectToDatabase();

  const query =
    "SELECT ID FROM userCartTable WHERE userID = @userID AND productID = @productID";

  const resultCartProductExists: QueryResult = await queryInDatabase(
    query,
    {
      userID: { value: userID, type: sql.Char },
      productID: { value: productID, type: sql.Char },
    },
    pool
  );
  await pool?.close();
  return resultCartProductExists;
}

export default userCartProductExists;
