import { QueryResultLogin } from "../../types/userTypes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
async function queryLoginInDatabase(
  query: string,
  params: any | object,
  dbConnectionPool: any | undefined
): Promise<QueryResultLogin> {
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

   
    let token: string;

    try {
      let SECRET = "MuqeetAhmad";

      token = jwt.sign(
        {
          ID: queryResult?.recordset[0].ID,
          email: queryResult?.recordset[0].userEmail,
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

      console.log("result: ", result);

      return result;
    } catch (error) {
      console.log("error creating json web token", error);
    }
    return result;
  } catch (error) {
    console.log(`Error create query the database ${error}`);
    console.log("result: ", result);
    return result;
  }
}

export { queryLoginInDatabase, QueryResultLogin };
