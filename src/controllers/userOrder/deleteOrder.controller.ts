import sql from 'mssql';
import { v4 as uuid } from 'uuid';
import { connectToDatabase } from '../../config/dbConnection';
import { queryInDatabase, QueryResult } from '../../utils/queryInDatabase';

async function deleteOrder(req: any, res: any) {
  const { ID, userEmail } = req.user; //userID
  const { orderID, statusID } = req.body;

  //validation:
  if (!orderID || !statusID) {
    res.status(400).json({ message: 'BAD request' });
  } else {
    /////////// cancel order - also perform some operations - like adding products back to stock, returning payment if done,

    ///creating objects/query params

    const cancelOrderParams: object = {
      ID: {
        value: orderID,
        type: sql.Char,
      },
    };

    const statusTableParams: object = {
      ID: {
        value: statusID,
        type: sql.Char,
      },
    };

    ///checking if the order is cancelable?????????? only IF status == pending || processing

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryOrderStatus = `SELECT orderStatus FROM orderStatusTable WHERE ID = @ID`;

      const resutlQueryOrderStatus: QueryResult = await queryInDatabase(
        queryOrderStatus,
        statusTableParams,
        pool,
      );

      if (resutlQueryOrderStatus.data.rowsAffected == 0) {
        res.json({ message: 'error query staus - try again' });
        return;
      }

      if (
        resutlQueryOrderStatus.data.recordSet?.orderStatus == 'pending' ||
        resutlQueryOrderStatus.data.recordSet?.orderStatus == 'processing'
      ) {
        const queryDeleteOrder = `DELETE FROM userOrderTable WHERE ID = @ID`;

        const resultDeleteOrder: QueryResult = await queryInDatabase(
          queryDeleteOrder,
          cancelOrderParams,
          pool,
        );
        if (resultDeleteOrder.data.rowsAffected == 0) {
          res.json({ message: 'error deleting order' });
          return;
        }
        const queryDeleteOrderStatus = `DELETE FROM orderStatusTable WHERE ID = @ID`;

        const resultDeleteOrderStatus: QueryResult = await queryInDatabase(
          queryDeleteOrderStatus,
          statusTableParams,
          pool,
        );
        if (resultDeleteOrderStatus.data.rowsAffected == 0) {
          res.json({ message: 'error deleting order - status' });
          return;
        }

        res.json({ message: 'Success cancellig Order' });
        return;
      } else {
        res.json({ message: "Order Has been dispatched - can't be cancelled" });
        return;
      }
    } catch (error) {
      res.json({ message: `creation failed` });
      await pool?.close();
      return;
    }
  }
}

export { deleteOrder };
