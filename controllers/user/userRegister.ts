import { connectToDatabase } from "../../config/dbConnection";
import { v4 as uuid } from "uuid";
import { queryInDatabase, QueryResult } from "../../utils/userFunctions";
import { hashString } from "../../utils/passwordHashednSalated";
import sql from "mssql";
import userExists from "./validations/userExists";

///defining types for incoming data
type Parameter = {
  value: string | number | boolean;
  type: any;
};
type User = {
  ID: Parameter;
  userFirstName: Parameter;
  userSecondName: Parameter;
  userEmail: Parameter;
  userPhoneNoID: Parameter;
  userPassword: Parameter;
};

type UserPhoneNO = {
  ID: Parameter;
  userID: Parameter;
  countryCode: Parameter;
  phoneNo: Parameter;
};

async function userRegister(req: any, res: any) {
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
      return
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

    try {
      const pool: object | undefined = await connectToDatabase();

      const queryCreatePhoneNo = `INSERT INTO userPhoneNumber (ID, userID, countryCode, phoneNumber) VALUES (@ID, @userID, @countryCode, @phoneNo)`;

      const createUserPhoneNoResult: QueryResult = await queryInDatabase(
        queryCreatePhoneNo,
        userPhoneNo,
        pool
      );

      if (createUserPhoneNoResult.success) {
        try {
          const queryUser = `INSERT INTO userTable (ID, userFirstName, userSecondName, userEmail, userPhoneNoID, userPassword) VALUES (@ID, @userFirstName, @userSecondName, @userEmail, @userPhoneNoID, @userPassword)`;

          const createUserResult: QueryResult = await queryInDatabase(
            queryUser,
            user,
            pool
          );

          if (createUserResult.success == false) {
            res.json({
              message: `user creation failed`,
            });
            return
          }

          res.json({
            message: `user created with email ${createUserPhoneNoResult}`,
          });
          return
        } catch (error) {
          res.json({ message: `user creation failed` });
          return
        }
      } else {
        try {
          type deleteUserPhoneNo = {
            ID: Parameter;
            userID: Parameter;
          };

          const params: deleteUserPhoneNo = {
            ID: {
              value: UserPhoneNoID,
              type: sql.Char,
            },
            userID: {
              value: UserID,
              type: sql.Char,
            },
          };

          const queryDeletePhoneNo = `DELETE FROM userPhoneNumber WHERE ID = @ID AND userID = @UserID`;

          const deletePhoneNoResult: QueryResult = await queryInDatabase(
            queryDeletePhoneNo,
            params,
            pool
          );

          if (deletePhoneNoResult.success == false) {
            res.json({
              message: `phoneNumber deletion failed`,
            });
            return
          }

          res.json({
            message: `phoneNumber delted ${deletePhoneNoResult}`,
          });
          return
        } catch (error) {
          res.json({ message: `phoneNumber deletion failed` });
          return
        }
      }
    } catch (error) {
      res.json({ message: `userPhoneNumber creation failed` });
      return
    }
  }
}

export default userRegister;
