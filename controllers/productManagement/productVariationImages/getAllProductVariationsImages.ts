import sql from "mssql";

import { Role } from "../../../types/userTypes";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function getAllProductVariationImages(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { productVariationDetailsID } = req.body;

  //validation:
  if (!productVariationDetailsID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const query =
      "SELECT ID, productVariationID, path FROM ProductVariationImages WHERE productVariationDetailsID = @productVariationDetailsID";

    const params = {
      productVariationDetailsID: { value: productVariationDetailsID, type: sql.Char },
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getAllProductVariationImages };
