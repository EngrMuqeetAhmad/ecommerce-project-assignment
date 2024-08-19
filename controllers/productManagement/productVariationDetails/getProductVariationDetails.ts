import sql from "mssql";
import { connectToDatabase } from "../../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../../utils/queryInDatabase";
import { Role } from "../../../types/userTypes";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function getProductVariationDetials(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { productVariationDetailsID } = req.body;

  //validation:
  if (!productVariationDetailsID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {


    const query =
      "SELECT ID, productVariationID, productVariationTypeValueID FROM ProductVariationDetails WHERE ID=@ID";

    const params = {
      ID: { value: productVariationDetailsID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      query,
      messages,
      res
    );
    return;
  }
}

export { getProductVariationDetials };
