import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/queryInDatabase";
import { hashString } from "../../utils/passwordHashednSalated";
import sql from "mssql";
import userExists from "./validations/userExists";
import { Parameter, User, UserPhoneNO } from "../../types/userTypes";

async function userRegister(req: any, res: any, next: any) {
  const { firstName, secondName, email, countryCode, phoneNo, password } =
    req.body;

  //validation:
  if (
    !firstName ||
    !secondName ||
    !email ||
    !countryCode ||
    !phoneNo ||
    !password
  ) {
    res.status(400);
    res.json({ message: "BAD request" });
  } else {
    //validation for existing email
    const emailRegistered: QueryResult = await userExists(email);
    if (emailRegistered?.data.rowsAffected != 0 ? true : false) {
      res.json({ message: "user already exists with given email ID" });
      return;
    }
    /////
    const UserID: string = uuid();
    const UserPhoneNoID: string = uuid();
    const hashedPassword: string = hashString(password);

    ///creating objects/query params
    const userPhoneNo: UserPhoneNO = {
      ID: {
        value: UserPhoneNoID,
        type: sql.Char,
      },
      userID: {
        value: UserID,
        type: sql.Char,
      },
      countryCode: {
        value: countryCode,
        type: sql.Char,
      },
      phoneNo: {
        value: phoneNo,
        type: sql.VarChar,
      },
    };

    const user: User = {
      ID: {
        value: UserID,
        type: sql.Char,
      },
      userFirstName: {
        value: firstName,
        type: sql.NVarChar,
      },
      userSecondName: {
        value: secondName,
        type: sql.NVarChar,
      },
      userEmail: {
        value: email,
        type: sql.NVarChar,
      },
      userPhoneNoID: {
        value: UserPhoneNoID,
        type: sql.Char,
      },
      isVerified: {
        value: "0",
        type: sql.Char,
      },
      role: {
        value: "admin",
        type: sql.NVarChar,
      },
      //hashed and salted password
      userPassword: {
        value: hashedPassword,
        type: sql.NVarChar,
      },
    };

    /*
  first it will create in database the given phoneNumber of user then creates the user table - it is because user has separate table to store it phone Number details
  if there is an error in creation of user information table in DB then it will remove the phone Number created so No data redundancy remains in DB
*/
    const pool: object | undefined | any = await connectToDatabase();

    try {
      const queryUser = `INSERT INTO userTable (ID, userFirstName, userSecondName, userEmail, userPhoneNoID, isVerified, role, userPassword) VALUES (@ID, @userFirstName, @userSecondName, @userEmail, @userPhoneNoID, @isVerified, @role, @userPassword)`;

      const createUserResult: QueryResult = await queryInDatabase(
        queryUser,
        user,
        pool
      );

      if (createUserResult.data.rowsAffected == 0) {
        res.json({
          message: `user is not created`,
        });
        await pool?.close();
        return;
      }

      const queryCreatePhoneNo = `INSERT INTO userPhoneNumber (ID, userID, countryCode, phoneNumber) VALUES (@ID, @userID, @countryCode, @phoneNo)`;

      const createUserPhoneNoResult: QueryResult = await queryInDatabase(
        queryCreatePhoneNo,
        userPhoneNo,
        pool
      );


      res.json({
        message: `user created with email ${email}`,
      });
      await pool?.close();
      next();
      return;
    } catch (error) {
      res.json({ message: `creation failed` });
      console.log(error);
      await pool?.close();
      return;
    }
  }
}

export default userRegister;
