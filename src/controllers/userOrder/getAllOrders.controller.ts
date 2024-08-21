import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { Role } from "../../types/userTypes";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";

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
    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const query =
      "SELECT ID, userID, productIDs, shippingAddressID, paymentMethod ,paymentCardInfoID, timestamp  ,couponID, orderTotalPrice, paymentID, statusTableID FROM userOrderTable WHERE userID = @userID";

    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getAllOrders };
