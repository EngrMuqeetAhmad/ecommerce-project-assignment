import { connectToDatabase } from "../../config/dbConnection";
import { QueryResultLogin } from "../../types/userTypes";
import { hashString } from "../../utils/passwordHashednSalated";
import sql from "mssql";
import { queryLoginInDatabase } from "../../worker/user/userLoginQuery";

async function userLogin(req: any, res: any) {
  const { email, password } = req.body;

  //validation:
  if (!email || !password) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    const pool: object | undefined | any = await connectToDatabase();

    const hashedPassword: string = hashString(password);
    const queryUserLogin =
      "SELECT ID, userEmail, isVerified FROM userTable WHERE userEmail = @userEmail AND userPassword = @userPassword";

    const params = {
      userEmail: { value: email, type: sql.NVarChar },
      userPassword: { value: hashedPassword, type: sql.Char },
    };
    const resultQueryUserLogin: QueryResultLogin = await queryLoginInDatabase(
      queryUserLogin,
      params,
      pool
    );

    if (resultQueryUserLogin.data.rowsAffected == 0) {
      res.status(404).json({ message: "Failed", data: undefined });
      await pool?.close();
      return;
    }

    if (resultQueryUserLogin.data.recordSet?.isVerified == "0") {
      res.json({ message: "Please, verify your email to continue" });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "OK", data: resultQueryUserLogin });
    await pool?.close();
    return;
  }
}

export default userLogin;
