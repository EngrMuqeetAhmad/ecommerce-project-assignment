import sql from 'mssql';
import { connectToDatabase } from '../config/dbConnection';
import { queryInDatabase, QueryResult } from '../utils/queryInDatabase';

async function userWishExists(
  userID: string,
  productID: string,
): Promise<QueryResult> {
  const pool: object | undefined | any = await connectToDatabase();

  const queryWishExists =
    'SELECT ID FROM userWishTable WHERE userID = @userID AND productID = @productID';

  const resultWishExists: QueryResult = await queryInDatabase(
    queryWishExists,
    {
      userID: { value: userID, type: sql.Char },
      productID: { value: productID, type: sql.Char },
    },
    pool,
  );
  await pool?.close();
  return resultWishExists;
}

export default userWishExists;
