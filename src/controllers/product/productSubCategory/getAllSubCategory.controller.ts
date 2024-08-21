import sql from "mssql";

import { Role } from "../../../types/userTypes";
import { ControllerFunctionTemplate } from "../../../utils/controllerFunctionTemplate";

async function getAllSubCategory(req: any, res: any) {
  let { ID, role } = req.user; //user ID


  //validation:
  if (role != "admin") {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const query =
      "SELECT ID, subCategoryName FROM SubCategory";

    const params = {
      
    };
    const messages: object = {
      errorMessage: `Not Found`,
      successMessage: `OK`,
    };
    await ControllerFunctionTemplate(params, query, messages, res);
    return;
  }
}

export { getAllSubCategory };
