import { QueryResultLogin } from "../types/userTypes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
async function queryLoginInDatabase(
  query: string,
  params: any | object,
  dbConnectionPool: any | undefined,
  res: any
) {
  dotenv.config();

  let result: QueryResultLogin = {
    success: undefined,
    data: {
      rowsAffected: undefined,
      recordSet: undefined,
      token: undefined,
    },
  };
  try {
    const request: any = await dbConnectionPool?.request();

    for (const param in params) {
      const { value, type } = params[param];
      request.input(param, type, value);
    }

    const queryResult: any = await request?.query(query);

    if (queryResult?.recordSet?.rowsAffected == 0) {
      res.status(404).json({ message: "No user found", data: undefined });
    }

    if (queryResult?.recordSet?.isVerified == "0") {
      res.json({
        message: "Please, verify your email to continue",
        data: undefined,
      });
      return;
    }

    let token: string;

    try {
      let SECRET = "MuqeetAhmad";

      token = jwt.sign(
        {
          ID: queryResult?.recordset[0].ID,
          email: queryResult?.recordset[0].userEmail,
          role: queryResult?.recordSet[0].role,
        },
        SECRET
      );

      result = {
        success: true,
        data: {
          rowsAffected: queryResult?.rowsAffected,
          recordSet: queryResult?.recordset,
          token: token,
        },
      };

      res.status(200).json({ message: "OK", data: result });
      return;
    } catch (error) {
      res.json({ message: "An error occured - try again", data: result });
      console.log("error creating json web token", error);
    }
    return;
  } catch (error) {
    res.json({ message: "An error occured - try again", data: result });
    console.log(`Error create query the database ${error}`);
    return;
  }
}

export { queryLoginInDatabase, QueryResultLogin };
