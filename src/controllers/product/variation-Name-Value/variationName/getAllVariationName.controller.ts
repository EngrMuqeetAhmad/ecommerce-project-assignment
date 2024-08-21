import sql from "mssql";
import { ControllerFunctionTemplate } from "../../../../utils/controllerFunctionTemplate";

async function getAllVariationName(req: any, res: any) {
  let { ID, role } = req.user; //user ID

  //validation:
  if (role != "admin") {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const params = {};
    const query =
      "SELECT ID, productVariationName FROM ProductVariationType";

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

export { getAllVariationName };
