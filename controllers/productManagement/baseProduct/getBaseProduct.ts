import sql from "mssql";
import { connectToDatabase } from "../../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import { Role } from "../../../types/userTypes";

async function getBaseProduct(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { productID } = req.body;

  //validation:
  if (!productID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const queryGetBaseProduct =
      "SELECT ID, productTitle, productDescription, basePrice, categoryID, subCategoryID FROM Product WHERE ID=@ID";

    const params = {
      ID: { value: productID, type: sql.Char },
    };
    const resultQueryGetBaseProduct: QueryResult = await queryInDatabase(
      queryGetBaseProduct,
      params,
      pool
    );

    if (resultQueryGetBaseProduct.data.rowsAffected == 0) {
      res.status(404).json({ message: "Not Found", data: undefined });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "OK", data: resultQueryGetBaseProduct });
    await pool?.close();
    return;
  }
}

export { getBaseProduct };
