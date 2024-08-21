import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";
import { INSERTQueryString } from "../../utils/buildSQLqueryString";
import { ControllerFunctionTemplate } from "../../utils/controllerFunctionTemplate";

async function addOrder(req: any, res: any) {
  const { ID, userEmail } = req.user; //userID
  const {
    encryptedProductIDs,
    shippingAddressID,
    paymentMethod,
    paymentCardInfoID, //can be null
    timestamp,
    couponID, //can be null
    orderTotalPrice,
    paymentID,
  } = req.body;

  //validation:
  if (
    !encryptedProductIDs ||
    !shippingAddressID ||
    !paymentMethod ||
    !timestamp ||
    !orderTotalPrice ||
    !paymentCardInfoID ||
    !couponID ||
    !paymentID
  ) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const userOrderID = uuid();
    const orderStatusTableID = uuid();
    ///

    ////// important: To get productIDs, decrypt it with jwt.verify()
    ///creating objects/query params

    const orderStatusTableParams: object = {
      ID: {
        value: orderStatusTableID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      orderID: {
        value: userOrderID,
        type: sql.Char,
      },
      orderStatus: {
        value: "pending",
        type: sql.NVarChar,
      },
    };

    const userOrderTableParams: object = {
      ID: {
        value: userOrderID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      productIDs: {
        value: encryptedProductIDs,
        type: sql.NVarChar,
      },
      shippingAddressID: {
        value: shippingAddressID,
        type: sql.NVarChar,
      },
      paymentMethod: {
        value: paymentMethod,
        type: sql.VarChar,
      },
      paymentCardInfoID: {
        value: paymentCardInfoID.toString(),
        type: sql.VarChar,
      },

      timestamp: {
        value: timestamp,
        type: sql.SmallDateTime,
      },
      couponID: {
        value: couponID.toString(),
        type: sql.Char,
      },
      orderTotalPrice: {
        value: orderTotalPrice,
        type: sql.Int,
      },
      paymentID: {
        value: paymentID.toString(),
        type: sql.Char,
      },
      statusTableID: {
        value: orderStatusTableID,
        type: sql.Char,
      },
    };

    const tableName1: string = "userOrderTable";

    const query1: string = INSERTQueryString(
      tableName1,
      Object.keys(userOrderTableParams)
    );

    const messages1: object = {
      errorMessage: `Error adding into ${tableName1}`,
      successMessage: `Success Adding into ${tableName1}`,
    };

    await ControllerFunctionTemplate(
      userOrderTableParams,
      query1,
      messages1,
      res
    );

    const tableName2: string = "orderStatusTable";

    const query: string = INSERTQueryString(
      tableName2,
      Object.keys(orderStatusTableParams)
    );

    const messages2: object = {
      errorMessage: `Error adding into ${tableName2}`,
      successMessage: `Success Adding into ${tableName2}`,
    };

    await ControllerFunctionTemplate(
      orderStatusTableParams,
      query,
      messages2,
      res
    );

    return;
  }
}

export { addOrder };
