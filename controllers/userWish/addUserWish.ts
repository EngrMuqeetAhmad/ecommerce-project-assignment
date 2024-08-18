import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";

import sql from "mssql";
import userWishExists from "./validations/wishExists";

async function addWishProduct(req: any, res: any) {
  const { ID } = req.user; //userID
  const { productID } = req.params;

  //validation:
  if (!productID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /// check wish already exists

    const isWishExists: QueryResult = await userWishExists(ID, productID);

    if (isWishExists.data.rowsAffected != 0) {
      res.json({ message: "user wish already exists" });
      return;
    }

    /////
    const wishID = uuid();
    ///creating objects/query params

    const params: object = {
      ID: {
        value: wishID,
        type: sql.Char,
      },
      userID: {
        value: ID, //this is userID
        type: sql.Char,
      },
      productID: {
        value: productID,
        type: sql.Char,
      },
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryAddWishProduct = `INSERT INTO userWishTable (ID, userID, productID) VALUES (@ID, @userID, @productID)`;

      const resultAddWishProduct: QueryResult = await queryInDatabase(
        queryAddWishProduct,
        params,
        pool
      );

      if (resultAddWishProduct.data.rowsAffected == 0) {
        res.json({ message: "error adding wish product" });
        await pool?.close();
        return;
      }

      res.json({ message: "Success Adding wish product" });
      await pool?.close();
      return;
    } catch (error) {
      res.json({ message: `creation failed` });
      await pool?.close();
      return;
    }
  }
}

export { addWishProduct };
