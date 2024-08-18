import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { Role } from "../../types/userTypes";

async function getAllWishProducts(req: any, res: any) {
  let { ID, role } = req.user; //user ID

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

    const queryGetAllWishProducts =
      "SELECT ID, userID, productID FROM userWishTable WHERE userID = @userID";

    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetAllWishProducts: QueryResult = await queryInDatabase(
      queryGetAllWishProducts,
      params,
      pool
    );

    if (resultQueryGetAllWishProducts.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    res
      .status(200)
      .json({ message: "OK", data: resultQueryGetAllWishProducts });
    await pool?.close();
    return;
  }
}

export { getAllWishProducts };
