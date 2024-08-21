import { connectToDatabase } from "../../../config/dbConnection";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";

import sql from "mssql";

async function deleteProductReviewRating(req: any, res: any) {
  const { ID, role } = req.user;
  const { reviewID } = req.body;

  //validation:
  if (!reviewID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: reviewID,
        type: sql.Char,
      },
    };
    const queryDeleteBaseProduct = `DELETE FROM ProductUserReviewRating WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting Base Product`,
      successMessage: `success deleting base product`,
    };
    await ControllerFunctionTemplate(
      params,
      queryDeleteBaseProduct,
      messages,
      res
    );

    return;
  }
}

export { deleteProductReviewRating };
