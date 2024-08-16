import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";

async function deleteWishProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { wishID } = req.params;

  //validation:
  if (!wishID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: wishID,
        type: sql.Char,
      },
      userID : {
        value: ID,
        type: sql.Char
      }
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryDeleteUserWish = `DELETE FROM userWishTable WHERE ID = @ID AND userID = @userID`;

      const resultDeleteUserWish: QueryResult = await queryInDatabase(
        queryDeleteUserWish,
        params,
        pool
      );

      if (resultDeleteUserWish.data.rowsAffected == 0) {
        res.json({ message: "error deleting wish product" });
        return;
      }

      res.json({ message: "Success deleting deleting wish product" });
      return;
    } catch (error) {
      res.json({ message: `deletion failed` });
      await pool?.close();
      return;
    }
  }
}

export { deleteWishProduct };
