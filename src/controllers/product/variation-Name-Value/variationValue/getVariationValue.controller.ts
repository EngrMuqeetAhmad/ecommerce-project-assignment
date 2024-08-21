import sql from "mssql";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function getVariationTypeValue(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { variationTypeValueID } = req.body;

  //validation:
  if (!variationTypeValueID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const params = {
      ID: { value: variationTypeValueID, type: sql.Char },
    };
    const query =
      "SELECT ID, productVariationTypeValue, productVariationTypeID FROM ProductVariationTypeValue WHERE ID = @ID";

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
    return
  }
}

export { getVariationTypeValue };
