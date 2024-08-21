


import sql from "mssql";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function deleteVariationValue(req: any, res: any) {
  const { ID, role } = req.user;
  const { variationTypeValueID } = req.body;

  //validation:
  if (!variationTypeValueID) {
    res.status(400).json({ message: "BAD request" });
  } else {
    /////

    ///creating objects/query params

    const params: object = {
      ID: {
        value: variationTypeValueID,
        type: sql.Char,
      },
    };
    const query = `DELETE FROM ProductVariationTypeValue WHERE ID = @ID`;

    const messages: object = {
      errorMessage: `Failed deleting Base Product variation Type Value`,
      successMessage: `success deleting base product variation Type Value `,
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

export { deleteVariationValue };
