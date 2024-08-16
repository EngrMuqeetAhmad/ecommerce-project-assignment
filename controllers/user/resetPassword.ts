import { connectToDatabase } from "../../config/dbConnection";

import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { hashString } from "../../utils/passwordHashednSalated";
import sql from "mssql";
import userExists from "./validations/userExists";

async function userPasswordUpdate(req: any, res: any) {
  const { email, newPassword } = req.body;

  //validation:
  if (!email || !newPassword) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    //validation for existing email
    const emailRegistered: QueryResult = await userExists(email);
    if (emailRegistered?.data.rowsAffected == 0 ? true : false) {
      res.json({ message: "USER with given email does not exist" });
      return;
    }
    /////

    const hashedPassword: string = hashString(newPassword);

    ///creating objects/query params

    const params: object = {
      userEmail: {
        value: email,
        type: sql.NVarChar,
      },

      //hashed and salted newPassword
      userPassword: {
        value: hashedPassword,
        type: sql.NVarChar,
      },
    };

    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryUpdatePassword = `UPDATE userTable SET userPassword=@userPassword WHERE userEmail=@userEmail`;

      const resultQueryUpdatePassword: QueryResult = await queryInDatabase(
        queryUpdatePassword,
        params,
        pool
      );

      if (resultQueryUpdatePassword?.data.rowsAffected == 0) {
        console.log("error updating password");
        res.json({ message: "error updating password - try again" });
        return;
      }

      console.log("password updated");
      res.json({ message: "password updated successfully" });
      return;
    } catch (error) {
      console.log("error updating password");
      res.json({ message: "error updating password" });
      return;
    }
  }
}

export default userPasswordUpdate;
