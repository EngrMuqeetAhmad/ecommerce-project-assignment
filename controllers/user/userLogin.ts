import { connectToDatabase } from "../../config/dbConnection";
import { QueryResultLogin } from "../../types/userTypes";
import { hashString } from "../../utils/passwordHashednSalated";
import sql from "mssql";
import { queryLoginInDatabase } from "../../utils/userLoginQuery";

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
      "SELECT ID, userEmail, isVerified, role FROM userTable WHERE userEmail = @userEmail AND userPassword = @userPassword";

    const params = {
      userEmail: { value: email, type: sql.NVarChar },
      userPassword: { value: hashedPassword, type: sql.Char },
    };
    
    await queryLoginInDatabase(queryUserLogin, params, pool, res);

    await pool?.close();
    return;
  }
}

export default userLogin;
