import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

async function getUserShippingAddress(req: any, res: any) {
  const { ID } = req.user; //user ID
  const { shippingInfoID } = req.body;

  //validation:
  if (!shippingInfoID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUserShippingAddress =
      "SELECT ID, userID, addressLine1, addressLine2, region, postalCode, country FROM userShippingAddress WHERE userID = @userID AND ID=@ID";

    const params = {
      ID: { value: shippingInfoID, type: sql.Char },
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetUserShippingAddress: QueryResult =
      await queryInDatabase(queryGetUserShippingAddress, params, pool);

    if (resultQueryGetUserShippingAddress.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    res
      .status(200)
      .json({ message: "OK", data: resultQueryGetUserShippingAddress });
    await pool?.close();
    return;
  }
}

export { getUserShippingAddress };
