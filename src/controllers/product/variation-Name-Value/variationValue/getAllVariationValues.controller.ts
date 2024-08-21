import sql from "mssql";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function getAllVariationTypeValues(req: any, res: any) {
  let { ID, role } = req.user; //user ID
  

  //validation:
  if (role != "admin") {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const params = {
    
    };
    const query =
      "SELECT ID, productVariationTypeValue, productVariationTypeID FROM ProductVariationTypeValue";

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

export { getAllVariationTypeValues };
