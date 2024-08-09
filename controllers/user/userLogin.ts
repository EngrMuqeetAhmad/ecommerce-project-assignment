import { connectToDatabase } from "../../config/dbConnection";
import { hashString } from "../../utils/passwordHashednSalated";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import sql from "mssql";
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
      "SELECT ID, userFirstName, userSecondName, userEmail, userPhoneNoID FROM userTable WHERE userEmail = @userEmail AND userPassword = @userPassword";

    const params = {
      userEmail: { value: email, type: sql.NVarChar },
      userPassword: { value: hashedPassword, type: sql.Char },
    };
    const resultQueryUserLogin: QueryResult = await queryInDatabase(
      queryUserLogin,
      params,
      pool
    );

    if (resultQueryUserLogin.success == false) {
      res.status(404).json({ message: "Failed", data: undefined });
      await pool?.close();
      return;
    }

    res.status(200).json({ message: "OK", data: resultQueryUserLogin });
    await pool?.close();
    return;
  }
}

export default userLogin;
