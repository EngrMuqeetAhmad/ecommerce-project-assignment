import sql from "mssql";
import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { extractSensitiveData } from "../../utils/extractSensitiveData";

async function getUserAllPaymentCardInfo(req: any, res: any) {
  const { ID } = req.user; //user ID

  //validation:
  if (!ID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetUserAllPaymentCardInfo =
      "SELECT ID, userID, fullNameOnPaymentCard, paymentCardNumber, cardProvider FROM userPaymentCardInfo WHERE userID = @userID";

    const params = {
      userID: { value: ID, type: sql.Char },
    };
    const resultQueryGetAllPaymentCardInfo: QueryResult = await queryInDatabase(
      queryGetUserAllPaymentCardInfo,
      params,
      pool
    );

    if (resultQueryGetAllPaymentCardInfo.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    // console.log(
    //   extractSensitiveData(
    //     resultQueryGetAllPaymentCardInfo.data.recordSet,
    //     "paymentCardInfo"
    //   )
    // );
    const finalResult: QueryResult = {
      success: resultQueryGetAllPaymentCardInfo.success,
      data: {
        rowsAffected: resultQueryGetAllPaymentCardInfo.data.rowsAffected,
        recordSet: extractSensitiveData(
          resultQueryGetAllPaymentCardInfo.data.recordSet,
          "paymentCardNumber"
        ),
      },
    };
    console.log(finalResult);
    res.status(200).json({ message: "OK", data: finalResult });
    await pool?.close();
    return;
  }
}

export { getUserAllPaymentCardInfo };
