import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { extractSensitiveData } from "../../utils/extractSensitiveData";
import { Role } from "../../types/userTypes";

async function getUserPaymentCardInfo(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { paymentCardID } = req.params;

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
  if (!paymentCardID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUserPaymentCardInfo =
      "SELECT ID, userID, fullNameOnPaymentCard, paymentCardNumber, cardProvider FROM userPaymentCardInfo WHERE userID = @userID AND ID=@ID";

    const params = {
      ID: { value: paymentCardID, type: sql.Char },
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetPaymentCardInfo: QueryResult = await queryInDatabase(
      queryGetUserPaymentCardInfo,
      params,
      pool
    );

    if (resultQueryGetPaymentCardInfo.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    resultQueryGetPaymentCardInfo.data.recordSet = extractSensitiveData(
      resultQueryGetPaymentCardInfo.data.recordSet,
      "paymentCardNumber"
    );

    res.status(200).json({
      message: "OK",
      data: resultQueryGetPaymentCardInfo,
    });
    await pool?.close();
    return;
  }
}

export { getUserPaymentCardInfo };
