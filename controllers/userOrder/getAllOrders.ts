import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { Role } from "../../types/userTypes";

async function getAllOrders(req: any, res: any) {
  let { ID, email, role } = req.user; //user ID

  /// admin to read the order of a specific user (role = "user") :) :D
  if (role == Role.ADMIN) {
    const { userID } = req.body;
    if (!userID) {
      res.json({ message: "Admin error - no userID" });
    }
    ID = userID;
  }

  //validation:
  if (!ID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetAllOrders =
      "SELECT ID, userID, productIDs, shippingAddressID, paymentMethod ,paymentCardInfoID, timestamp  ,couponID, orderTotalPrice, paymentID, statusTableID FROM userOrderTable WHERE userID = @userID";

    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetAllOrders: QueryResult = await queryInDatabase(
      queryGetAllOrders,
      params,
      pool
    );

    if (resultQueryGetAllOrders.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "OK", data: resultQueryGetAllOrders });
    await pool?.close();
    return;
  }
}

export { getAllOrders };
