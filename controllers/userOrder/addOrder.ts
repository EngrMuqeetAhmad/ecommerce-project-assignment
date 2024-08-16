import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";

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

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryAddOrder = `INSERT INTO userOrderTable (ID, userID, productIDs, shippingAddressID, paymentMethod ,paymentCardInfoID, timestamp  ,couponID, orderTotalPrice, paymentID, statusTableID ) VALUES (@ID, @userID, @productIDs, @shippingAddressID, @paymentMethod , @paymentCardInfoID, @timestamp  , @couponID, @orderTotalPrice, @paymentID, @statusTableID)`;

      const resutlQueryAddOrder: QueryResult = await queryInDatabase(
        queryAddOrder,
        userOrderTableParams,
        pool
      );

      if (resutlQueryAddOrder.data.rowsAffected == 0) {
        res.json({ message: "error adding order" });
        return;
      }

      const queryAddIntoOrderStatusTable = `INSERT INTO orderStatusTable (ID, userID, orderID, orderStatus ) VALUES (@ID, @userID, @orderID, @orderStatus)`;

      const resultQueryAddToOrderStatusTable: QueryResult =
        await queryInDatabase(
          queryAddIntoOrderStatusTable,
          orderStatusTableParams,
          pool
        );

      if (resultQueryAddToOrderStatusTable.data.rowsAffected == 0) {
        res.json({ message: "error adding order status" });
        return;
      }

      res.json({ message: "Success Adding Order" });
      return;
    } catch (error) {
      res.json({ message: `creation failed` });
      await pool?.close();
      return;
    }
  }
}

export { addOrder };
