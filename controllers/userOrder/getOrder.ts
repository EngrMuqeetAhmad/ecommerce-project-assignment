import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

async function getOrder(req: any, res: any) {
  const { ID } = req.user; //user ID
  const { orderID } = req.body;

  //validation:
  if (!orderID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUserOrder =
      "SELECT ID, userID, productIDs, shippingAddressID, paymentMethod ,paymentCardInfoID, timestamp  ,couponID, orderTotalPrice, paymentID, statusTableID FROM userOrderTable WHERE ID=@ID";

    const params = {
      ID: { value: orderID, type: sql.Char },
     
    };
    const resultQueryGetUserOrder: QueryResult =
      await queryInDatabase(queryGetUserOrder, params, pool);

    if (resultQueryGetUserOrder.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    res
      .status(200)
      .json({ message: "OK", data: resultQueryGetUserOrder });
    await pool?.close();
    return;
  }
}

export { getOrder };
