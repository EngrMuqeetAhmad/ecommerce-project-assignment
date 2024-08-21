import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";

async function getOrder(req: any, res: any) {
  const { ID } = req.user; //user ID
  const { orderID } = req.body;

  //validation:
  if (!orderID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const query =
      "SELECT ID, userID, productIDs, shippingAddressID, paymentMethod ,paymentCardInfoID, timestamp  ,couponID, orderTotalPrice, paymentID, statusTableID FROM userOrderTable WHERE ID=@ID";

    const params = {
      ID: { value: orderID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getOrder };
