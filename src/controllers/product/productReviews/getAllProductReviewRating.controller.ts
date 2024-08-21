import sql from "mssql";
import { connectToDatabase } from "../../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import { Role } from "../../../types/userTypes";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function getAllProductReviewRating(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { productVariationID } = req.body;
  //validation:
  if (productVariationID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const queryGetBaseProduct =
      "SELECT ID, productTitle, productDescription, basePrice, categoryID, subCategoryID FROM ProductUserReviewRating WHERE productVariationID = @productVariationID";

    const params = {
      productVariationID: {
        value: productVariationID,
        type: sql.Char,
      },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      queryGetBaseProduct,
      messages,
      res
    );
    return;
  }
}

export { getAllProductReviewRating };
