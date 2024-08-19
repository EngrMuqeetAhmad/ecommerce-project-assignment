import sql from "mssql";

import { Role } from "../../../types/userTypes";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function getAllProductVariationDetails(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { productVariationID } = req.body;

  //validation:
  if (!productVariationID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const query =
      "SELECT ID, productVariationID, productVariationTypeValueID FROM ProductVariationDetails WHERE productVariationID=@productVariationID";

    const params = {
      productVariationID: { value: productVariationID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getAllProductVariationDetails };
