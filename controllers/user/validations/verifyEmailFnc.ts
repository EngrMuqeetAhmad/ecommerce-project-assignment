import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../config/dbConnection";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import sql from "mssql";
async function validateEmail(req: any, res: any) {
  const { token } = req.query;

  console.log("valida email API token", token);

  const pool: object | undefined | any = await connectToDatabase();

  const queryUserLogin =
    "SELECT userEmail FROM userTable WHERE userEmail = @userEmail";

  jwt.verify(token, "MuqeetAhmad", async (err: any, decodedData: any) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const params = {
      userEmail: { value: decodedData?.email, type: sql.NVarChar },
    };
    const resultQueryUserEmail: QueryResult = await queryInDatabase(
      queryUserLogin,
      params,
      pool
    );

    if (resultQueryUserEmail.data.rowsAffected == 0) {
      res
        .status(404)
        .json({ message: "User Not Found - email verification failed" });
      await pool?.close();
      return;
    }
    //// update isVerified flag
    const param2 = {
      isVerified: { value: "1", type: sql.Char },
    };
    const newParams = { ...params, ...param2 };
    const queryUpdateIsVerified =
      "UPDATE userTable SET isVerified = @isVerified WHERE userEmail = @userEmail";

    const resultQueryUpdateIsVerified: QueryResult = await queryInDatabase(
      queryUpdateIsVerified,
      newParams,
      pool
    );

    if (resultQueryUpdateIsVerified.data.rowsAffected == 0) {
      res
        .status(404)
        .json({ message: "failed - updating user verification status" });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "Email verified Successfully" });
    //update isVerified flag in table (need to create it)
    await pool?.close();
    return;
  });
}

export { validateEmail };
