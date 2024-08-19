import sql from "mssql";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function getVariationName(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  const { variationNameID } = req.body;

  //validation:
  if (!variationNameID) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const params = {
      ID: { value: variationNameID, type: sql.Char },
    };
    const queryGetVariationName =
      "SELECT ID, productVariationName FROM ProductVariationType WHERE ID = @ID";

    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(
      params,
      queryGetVariationName,
      messages,
      res
    );
  }
}

export { getVariationName };
