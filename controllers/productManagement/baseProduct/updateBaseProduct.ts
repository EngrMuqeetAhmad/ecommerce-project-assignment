import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function updateBaseProduct(req: any, res: any) {
  const { ID, userEmail } = req.user;
  const {
    productID,
    productTitle,
    productDescription,
    basePrice,
    categoryID,
    subCategoryID,
  } = req.body;

  //validation:
  if (
    !productID ||
    !productTitle ||
    !productDescription ||
    !basePrice ||
    !categoryID
  ) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: productID,
        type: sql.Char,
      },
      productTitle: {
        value: productTitle, //this is userID
        type: sql.NVarChar,
      },
      productDescription: {
        value: productDescription,
        type: sql.NVarChar,
      },
      basePrice: {
        value: basePrice,
        type: sql.Decimal,
      },
      categoryID: {
        value: categoryID,
        type: sql.Char,
      },
      subCategoryID: {
        value: subCategoryID,
        type: sql.Char,
      },
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryUpdateBaseProduct = `UPDATE Product SET productTitle = @productTitle, productDescription = @productDescription, basePrice = @basePrice, categoryID = @categoryID, subCategoryID = @subCategoryID WHERE ID = @ID`;

      const resultUpdateBaeProduct: QueryResult = await queryInDatabase(
        queryUpdateBaseProduct,
        params,
        pool
      );

      if (resultUpdateBaeProduct.data.rowsAffected == 0) {
        res.json({ message: "error updating base product" });
        return;
      }

      res.json({ message: "Success- updating bbase product" });
      return;
    } catch (error) {
      res.json({ message: `updating failed` });
      await pool?.close();
      return;
    }
  }
}

export { updateBaseProduct };
