import { connectToDatabase } from "../../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function addBaseProduct(req: any, res: any) {
  const { ID, role } = req.user;
  const {
    productTitle,
    productDescription,
    basePrice,
    categoryID,
    subCategoryID,
  } = req.body;

  //validation:
  if (!productTitle || !productDescription || !basePrice || !categoryID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////
    const productID = uuid();
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
      const queryAddBaseProduct = `INSERT INTO Product (ID, productTitle,productDescription,basePrice,categoryID,subCategoryID) VALUES (@ID, @productTitle, @productDescription,@basePrice,@categoryID,@subCategoryID)`;

      const resutlAddBaseProduct: QueryResult = await queryInDatabase(
        queryAddBaseProduct,
        params,
        pool
      );

      if (resutlAddBaseProduct.data.rowsAffected == 0) {
        res.json({ message: "error adding product " });
        return;
      }

      res.json({ message: "Success Adding product" });
      return;
    } catch (error) {
      res.json({ message: `creation failed` });
      await pool?.close();
      return;
    }
  }
}

export { addBaseProduct };
